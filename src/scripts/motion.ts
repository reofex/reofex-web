/**
 * Site-wide motion, all progressive enhancement:
 *
 *  [data-depth]  Sections that expose --mx/--my (pointer, -1…1) and --sy
 *                (0 → 1 as the section scrolls away) for CSS to use.
 *
 * Pointer effects need a fine hover-capable pointer. Everything is off for
 * prefers-reduced-motion.
 */
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
const clamp = (v: number, a = -1, b = 1) => Math.max(a, Math.min(b, v));

function initDepth() {
  const areas = Array.from(document.querySelectorAll<HTMLElement>("[data-depth]"));
  if (!areas.length) return;

  type State = { el: HTMLElement; tx: number; ty: number; x: number; y: number; s: number; ts: number; inView: boolean };
  const states: State[] = areas.map((el) => ({ el, tx: 0, ty: 0, x: 0, y: 0, s: 0, ts: 0, inView: true }));
  let raf = 0;

  const frame = () => {
    raf = 0;
    let moving = false;
    for (const st of states) {
      if (!st.inView) continue;
      st.x += (st.tx - st.x) * 0.08;
      st.y += (st.ty - st.y) * 0.08;
      st.s += (st.ts - st.s) * 0.2;
      st.el.style.setProperty("--mx", st.x.toFixed(4));
      st.el.style.setProperty("--my", st.y.toFixed(4));
      st.el.style.setProperty("--sy", st.s.toFixed(4));
      if (Math.abs(st.tx - st.x) + Math.abs(st.ty - st.y) + Math.abs(st.ts - st.s) > 0.002) moving = true;
    }
    if (moving) raf = requestAnimationFrame(frame);
  };
  const kick = () => {
    if (!raf) raf = requestAnimationFrame(frame);
  };

  const io = new IntersectionObserver((entries) =>
    entries.forEach((e) => {
      const st = states.find((s) => s.el === e.target);
      if (st) st.inView = e.isIntersecting;
    }),
  );

  for (const st of states) {
    io.observe(st.el);
    if (finePointer) {
      st.el.addEventListener("pointermove", (e) => {
        const r = st.el.getBoundingClientRect();
        st.tx = clamp(((e.clientX - r.left) / r.width) * 2 - 1);
        st.ty = clamp(((e.clientY - r.top) / r.height) * 2 - 1);
        kick();
      });
      st.el.addEventListener("pointerleave", () => {
        st.tx = st.ty = 0;
        kick();
      });
    }
  }

  const onScroll = () => {
    for (const st of states) {
      if (!st.inView) continue;
      const r = st.el.getBoundingClientRect();
      st.ts = clamp(-r.top / (r.height * 0.8), 0, 1);
    }
    kick();
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

if (!reduce) initDepth();
