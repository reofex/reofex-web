/**
 * Home hero deck in WebGL (three.js), desktop only.
 *
 * The CSS deck in HomeHero stays the source of truth: its scroll script
 * computes every card's pose (translate %, depth, rotation, opacity, haze,
 * stacking order) and shares them on the section element. This module draws
 * those same poses with a real camera, so cards gain true perspective, a soft
 * contact shadow and a slow light sweep across the glass, while the
 * choreography, timing and fallbacks are unchanged. If anything fails, the CSS
 * deck simply stays visible.
 */
import {
  CanvasTexture,
  Color,
  Group,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  SRGBColorSpace,
  WebGLRenderer,
} from "three";

type Pose = { x: number; y: number; z: number; ry: number; rx: number; o: number; haze: number; zi: number };
const PERSPECTIVE = 2200; // same as the CSS deck
const DEG = Math.PI / 180;

const vert = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
const frag = /* glsl */ `
  uniform sampler2D map;
  uniform float opacity;
  uniform float haze;
  uniform float sweep;
  uniform vec3 dark;
  varying vec2 vUv;
  void main() {
    vec4 c = texture2D(map, vUv);
    // cards further back sink into the hero's darkness
    c.rgb = mix(c.rgb, dark, haze);
    // a soft band of light drifting across the glass
    float d = (vUv.x - vUv.y * 0.55) - sweep;
    float band = exp(-d * d * 60.0) * 0.07;
    c.rgb += band * c.a;
    gl_FragColor = vec4(c.rgb, c.a * opacity);
    #include <colorspace_fragment>
  }
`;

const loadImage = (src: string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.decoding = "async";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });

const roundRect = (ctx: CanvasRenderingContext2D, w: number, h: number, r: number) => {
  ctx.beginPath();
  ctx.moveTo(r, 0);
  ctx.arcTo(w, 0, w, h, r);
  ctx.arcTo(w, h, 0, h, r);
  ctx.arcTo(0, h, 0, 0, r);
  ctx.arcTo(0, 0, w, 0, r);
  ctx.closePath();
};

/** The card as one texture: window bar + label + screenshot (cover, top-left), rounded. */
async function cardTexture(card: HTMLElement, scale: number) {
  const imgEl = card.querySelector("img")!;
  if (!imgEl.complete) await new Promise((r) => imgEl.addEventListener("load", r, { once: true }));
  const img = await loadImage(imgEl.currentSrc || imgEl.src);
  const bar = card.querySelector<HTMLElement>(".sf__bar")!;
  const label = card.querySelector(".sf__bar em")?.textContent ?? "";
  const W = Math.round(card.offsetWidth * scale);
  const H = Math.round(card.offsetHeight * scale);
  const barH = Math.round(bar.offsetHeight * scale);
  const c = document.createElement("canvas");
  c.width = W;
  c.height = H;
  const ctx = c.getContext("2d")!;
  roundRect(ctx, W, H, 14 * scale);
  ctx.clip();
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, W, H);
  // title bar
  ctx.fillStyle = "#f6f5f1";
  ctx.fillRect(0, 0, W, barH);
  ctx.fillStyle = "rgba(18,40,47,0.15)";
  [0, 1, 2].forEach((i) => {
    ctx.beginPath();
    ctx.arc((18 + i * 15) * scale, barH / 2, 4.5 * scale, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.font = `500 ${12 * scale}px "Manrope Variable", Manrope, system-ui, sans-serif`;
  const tw = ctx.measureText(label).width;
  const pw = tw + 28 * scale;
  const ph = barH * 0.62;
  ctx.save();
  ctx.translate((W - pw) / 2, (barH - ph) / 2);
  roundRect(ctx, pw, ph, ph / 2);
  ctx.fillStyle = "#ffffff";
  ctx.fill();
  ctx.strokeStyle = "rgba(18,40,47,0.07)";
  ctx.stroke();
  ctx.restore();
  ctx.fillStyle = "rgba(18,40,47,0.6)";
  ctx.textBaseline = "middle";
  ctx.fillText(label, (W - tw) / 2, barH / 2 + scale);
  ctx.fillStyle = "rgba(18,40,47,0.07)";
  ctx.fillRect(0, barH - scale, W, scale);
  // screenshot: cover the remaining area, anchored top-left (object-position 0 0)
  const aw = W;
  const ah = H - barH;
  const s = Math.max(aw / img.naturalWidth, ah / img.naturalHeight);
  ctx.drawImage(img, 0, 0, aw / s, ah / s, 0, barH, aw, ah);
  const tex = new CanvasTexture(c);
  tex.colorSpace = SRGBColorSpace;
  return tex;
}

/** One blurred rounded rectangle, shared by every card's contact shadow. */
function shadowTexture() {
  const c = document.createElement("canvas");
  c.width = 512;
  c.height = 384;
  const ctx = c.getContext("2d")!;
  ctx.filter = "blur(28px)";
  ctx.fillStyle = "rgba(0,0,0,0.85)";
  ctx.translate(70, 70);
  roundRect(ctx, 372, 244, 24);
  ctx.fill();
  return new CanvasTexture(c);
}

export async function mount(root: HTMLElement) {
  const stage = root.querySelector<HTMLElement>(".hh__stage");
  const cardEls = Array.from(root.querySelectorAll<HTMLElement>("[data-hh-card]"));
  if (!stage || !cardEls.length) return;

  const canvas = document.createElement("canvas");
  canvas.className = "hh__gl";
  canvas.setAttribute("aria-hidden", "true");
  let renderer: WebGLRenderer;
  try {
    renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
  } catch {
    return;
  }
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  renderer.setPixelRatio(dpr);
  renderer.setClearColor(0x000000, 0);

  const scene = new Scene();
  const camera = new PerspectiveCamera(30, 1, 10, 10000);
  const deck = new Group();
  scene.add(deck);

  const dark = new Color("#0b1c21");
  const shadowTex = shadowTexture();
  const scale = Math.min(2, dpr) * 1.25;

  const cards = await Promise.all(
    cardEls.map(async (el) => {
      const map = await cardTexture(el, scale);
      map.anisotropy = renderer.capabilities.getMaxAnisotropy();
      const mat = new ShaderMaterial({
        uniforms: { map: { value: map }, opacity: { value: 1 }, haze: { value: 0 }, sweep: { value: -1 }, dark: { value: dark } },
        vertexShader: vert,
        fragmentShader: frag,
        transparent: true,
        depthTest: false,
        depthWrite: false,
      });
      const plane = new Mesh(new PlaneGeometry(1, 1), mat);
      const shadowMat = new MeshBasicMaterial({ map: shadowTex, transparent: true, depthTest: false, depthWrite: false, opacity: 0.5 });
      const shadow = new Mesh(new PlaneGeometry(1, 1), shadowMat);
      const group = new Group();
      group.add(shadow, plane);
      deck.add(group);
      return { el, group, plane, shadow, mat, shadowMat };
    }),
  );

  // layout in CSS px: world units == CSS px at z = 0, like the CSS perspective
  let SW = 0;
  let SH = 0;
  const layout = () => {
    SW = stage.clientWidth;
    SH = stage.clientHeight;
    const CW = SW * 1.4;
    const CH = SH * 1.5;
    renderer.setSize(CW, CH, false);
    camera.aspect = CW / CH;
    camera.fov = (2 * Math.atan(CH / 2 / PERSPECTIVE)) / DEG;
    camera.position.set(0, 0, PERSPECTIVE);
    camera.updateProjectionMatrix();
    for (const c of cards) {
      const w = c.el.offsetWidth;
      const h = c.el.offsetHeight;
      // pivot at the card's bottom centre, like the CSS transform-origin (50% 100%)
      c.plane.scale.set(w, h, 1);
      c.plane.position.set(0, h / 2, 0);
      c.shadow.scale.set(w * 1.38, h * 1.57, 1);
      c.shadow.position.set(0, h / 2 - h * 0.06, -1);
    }
  };
  layout();
  stage.appendChild(canvas);

  const start = performance.now();
  let raf = 0;
  let running = false;
  const frame = (now: number) => {
    raf = 0;
    const poses: Pose[] | undefined = (root as any).__poses;
    const q: number = (root as any).__q ?? 0;
    if (poses) {
      const t = (now - start) / 1000;
      const mx = parseFloat(root.style.getPropertyValue("--mx")) || 0;
      const my = parseFloat(root.style.getPropertyValue("--my")) || 0;
      // the whole deck leans to the pointer and breathes slowly; camera eases in as the products take over
      deck.rotation.set(my * 3 * DEG, mx * 4 * DEG, 0);
      deck.position.y = Math.sin(t * 0.6) * 3;
      camera.position.z = PERSPECTIVE - q * 120;
      const sweep = ((t * 0.08) % 1.6) - 0.3 + mx * 0.08;
      cards.forEach((c, k) => {
        const p = poses[k];
        if (!p) return;
        const L = c.el.offsetLeft;
        const T = c.el.offsetTop;
        const w = c.el.offsetWidth;
        const h = c.el.offsetHeight;
        const X = L + w / 2 + (p.x / 100) * w - SW / 2;
        const Y = -(T + h + (p.y / 100) * h - SH / 2);
        c.group.position.set(X, Y, p.z);
        // CSS rotateY(a) rotateX(b) with y pointing down → three Euler YXZ with x negated
        c.group.rotation.set(-p.rx * DEG, p.ry * DEG, 0, "YXZ");
        c.mat.uniforms.opacity.value = p.o;
        // mixing happens in linear light, which reads weaker than the CSS overlay; compensate
        c.mat.uniforms.haze.value = Math.min(0.92, Math.pow(p.haze, 0.55) * 1.05);
        c.mat.uniforms.sweep.value = sweep - k * 0.12;
        c.shadowMat.opacity = 0.42 * p.o;
        c.plane.renderOrder = p.zi * 2 + 1;
        c.shadow.renderOrder = p.zi * 2;
      });
      renderer.render(scene, camera);
    }
    if (running) raf = requestAnimationFrame(frame);
  };
  const play = () => {
    if (!running) {
      running = true;
      raf = requestAnimationFrame(frame);
    }
  };
  const pause = () => {
    running = false;
    cancelAnimationFrame(raf);
    raf = 0;
  };

  new IntersectionObserver(([e]) => (e.isIntersecting ? play() : pause())).observe(root);
  window.addEventListener("resize", () => {
    if (!window.matchMedia("(min-width: 900px)").matches) {
      // phones/tablets use the plain layout: hand back to the CSS deck
      canvas.classList.remove("is-on");
      root.classList.remove("hh--webgl");
      return;
    }
    layout();
    canvas.classList.add("is-on");
    root.classList.add("hh--webgl");
  });
  canvas.addEventListener("webglcontextlost", () => {
    pause();
    canvas.remove();
    root.classList.remove("hh--webgl");
  });

  // first frame, then crossfade from the CSS deck
  frame(performance.now());
  play();
  requestAnimationFrame(() => {
    canvas.classList.add("is-on");
    window.setTimeout(() => root.classList.add("hh--webgl"), 750);
  });
}
