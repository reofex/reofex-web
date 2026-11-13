/**
 * Single source of truth for Reofex products.
 * Cards, the navigation mega menu, the footer and every product page read from here.
 *
 * Content rules (see brief §25):
 *  - Respondly copy mirrors https://therespondly.com and Fynex copy mirrors
 *    https://gofynex.com (both inspected 2026-10-07); Sync copy mirrors
 *    https://sync.reofex.com (inspected 2026-11-12).
 *  - Reofex Growth: AI never spends money on its own — human approval is always explicit.
 *  - No invented customers, metrics, partnerships or performance numbers.
 */
import type { ImageMetadata } from "astro";
import type { IconName } from "../components/ui/icons";
import respondlyShot from "../assets/products/respondly-site.png";
import fynexShot from "../assets/products/fynex.png";
import growthDashShot from "../assets/products/growth-dash.png";
import growthApprovalShot from "../assets/products/growth-approval.png";
import syncShot from "../assets/products/sync-dashboard.jpg";

export type ProductSlug = "respondly" | "reofex-sync" | "reofex-growth" | "fynex";

export interface Feature {
  icon: IconName;
  title: string;
  body: string;
}

/**
 * Real product screenshots. Crops must never include personal data
 * (emails, user names, client workspace names).
 */
export interface Screenshot {
  src: ImageMetadata;
  alt: string;
  /** Neutral label shown in the frame's title bar */
  frameLabel: string;
  /**
   * Phones show a closer portrait crop instead of the whole desktop screen.
   * CSS object-position for that crop, e.g. "0% 50%" = left edge.
   */
  mobileFocus?: string;
  /**
   * Product-page hero only: zoom into the part of the screen that shows the
   * product working (e.g. skip a marketing headline that would repeat ours).
   * `origin` is the CSS transform-origin the zoom is anchored to.
   */
  heroZoom?: { scale: number; origin: string };
}

export interface Product {
  slug: ProductSlug;
  name: string;
  /** Short line used in cards & menus */
  tagline: string;
  category: string;
  /** One-paragraph explanation */
  description: string;
  icon: IconName;
  /**
   * Official product mark (copied from the product's own repo). When set it
   * replaces the generic icon badge; `tile` sits it on a white tile for
   * marks that have no background of their own.
   */
  logo?: { src: string; tile?: boolean };
  /** CSS custom property name for the product's secondary accent */
  accent: string;
  accentVar: string;
  externalUrl?: string;
  hero: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    body: string;
    primaryCta: { label: string; href: string };
    note?: string;
  };
  problem: { title: string; points: string[] };
  explanation: { title: string; body: string };
  workflow: { title: string; body?: string; steps: { label: string; detail?: string }[] };
  features: Feature[];
  integrations?: { title: string; body: string; items: string[] };
  benefits: string[];
  highlight?: { title: string; body: string; image?: Screenshot };
  /** Primary real screenshot; product falls back to the illustrated UI when absent */
  screenshot?: Screenshot;
  seo: { title: string; description: string };
}

export const products: Product[] = [
  {
    slug: "respondly",
    name: "Respondly",
    tagline: "AI that answers your customers and sells for you.",
    category: "Customer Communication",
    description:
      "Your own AI assistant for WhatsApp, Instagram and your website. It answers from your real products, prices and policies, takes orders and payments in the chat, and hands ready customers to your team, day and night.",
    icon: "chat",
    logo: { src: "/brand/products/respondly.svg", tile: true },
    accent: "#1f9d6b",
    accentVar: "--accent-respondly",
    externalUrl: "https://therespondly.com/",
    screenshot: {
      src: respondlyShot,
      alt: "Respondly website: 'AI that answers your customers and sells for you', with a WhatsApp chat on a phone where the assistant finds boots in stock from the catalogue, takes the order and collects payment.",
      frameLabel: "therespondly.com",
      mobileFocus: "78% 45%",
    },
    hero: {
      eyebrow: "AI WhatsApp & Instagram lead automation",
      title: "AI that answers your customers",
      titleAccent: "and sells for you.",
      body: "Your own AI assistant for WhatsApp, Instagram and your website. It answers from your real products, prices and policies, takes orders and payments in the chat, and hands ready customers to your team, day and night.",
      primaryCta: { label: "Visit therespondly.com", href: "https://therespondly.com/" },
      note: "7-day free trial · No card needed · Setup in 10 minutes",
    },
    problem: {
      title: "Customer messages arrive faster than teams can answer them.",
      points: [
        "Enquiries land across WhatsApp, Instagram DMs and website chat — at all hours.",
        "Generic auto-replies don't answer the actual question, so leads go cold.",
        "Prices, services and availability live in spreadsheets the inbox can't see.",
      ],
    },
    explanation: {
      title: "Replies grounded in your own business data.",
      body: "You decide what the AI does and upload your data. Respondly then answers customers across your connected channels using that information, collects only the details you need, and alerts your team the moment a human should step in.",
    },
    workflow: {
      title: "Up and running in four steps.",
      steps: [
        { label: "Sign up & decide what AI does" },
        { label: "Upload your data", detail: "Products, prices, services, hours" },
        { label: "Connect channels", detail: "WhatsApp, Instagram & website" },
        { label: "Get notified & step in", detail: "Instant alerts & handover" },
      ],
    },
    features: [
      { icon: "clock", title: "24/7 AI responses", body: "Customers get accurate answers at any hour, not a 'we'll get back to you'." },
      { icon: "instagram", title: "Instagram DMs & auto-import", body: "Handle Instagram conversations alongside WhatsApp in one place." },
      { icon: "filter", title: "Collect only what you need", body: "Gather the exact lead details your team asked for — nothing more." },
      { icon: "bell", title: "Instant alerts & handover", body: "Get notified and take over the conversation whenever you choose." },
      { icon: "card", title: "Orders & payments in chat", body: "Take orders and collect payments without leaving the conversation." },
      { icon: "globe", title: "Multi-language replies", body: "Respond to customers in the language they write in." },
      { icon: "chart", title: "Performance dashboard", body: "See conversations and leads at a glance." },
      { icon: "layers", title: "Multi-client support", body: "Manage multiple businesses from a single account." },
    ],
    integrations: {
      title: "Works with the tools you already use.",
      body: "Respondly syncs conversations and leads with your existing systems.",
      items: ["WhatsApp", "Instagram", "Website chat widget", "Zoho CRM", "Razorpay", "Google Sheets", "CSV import"],
    },
    benefits: [
      "Never miss an enquiry, day or night",
      "Answers based on your real products and prices",
      "Your team steps in only when it matters",
      "Leads flow straight into your CRM or sheets",
    ],
    seo: {
      title: "Respondly — AI replies for WhatsApp & Instagram | Reofex",
      description:
        "Respondly by Reofex Technologies answers customer queries on WhatsApp, Instagram and your website with your real business data, 24/7, with instant human handover.",
    },
  },
  {
    slug: "reofex-sync",
    name: "Reofex Sync",
    tagline: "Purchase invoices that enter themselves.",
    category: "Finance & Accounting",
    description:
      "Purchase invoice automation for Zoho Books and Tally. Vendors send bills on WhatsApp and email — Reofex Sync reads them, checks the tax, catches duplicates, gets approval on the phone and posts the bill to Zoho Books or Tally.",
    icon: "invoice",
    logo: { src: "/brand/products/reofex-sync.svg" },
    accent: "#2563eb",
    accentVar: "--accent-sync",
    externalUrl: "https://sync.reofex.com/",
    screenshot: {
      src: syncShot,
      alt: "Reofex Sync home screen: invoices waiting for approval or review, a new vendor to confirm, Gmail, WhatsApp, Zoho Books and AI provider connections, and this month's posted amount, GST on posted bills and time saved.",
      frameLabel: "sync.reofex.com",
      mobileFocus: "0% 0%",
    },
    hero: {
      eyebrow: "For businesses on Zoho Books & Tally",
      title: "Purchase invoices that",
      titleAccent: "enter themselves.",
      body: "Vendors send bills on WhatsApp and email. Reofex Sync reads them, checks the tax, catches duplicates, asks the right person to approve on their phone, and posts the bill to Zoho Books or Tally.",
      primaryCta: { label: "Visit sync.reofex.com", href: "https://sync.reofex.com/" },
      note: "14-day free trial · Runs on your own computer · No signup for the demo",
    },
    problem: {
      title: "Purchase invoices are still mostly copy and paste.",
      points: [
        "Bills arrive as Gmail attachments and WhatsApp photos — someone has to download and forward them.",
        "Vendor, GSTIN, line items and the CGST/SGST/IGST split get retyped into Zoho Books or Tally by hand.",
        "Wrong tax rates, totals that don't add up and duplicate bills slip through to the books.",
      ],
    },
    explanation: {
      title: "Invoice in, bill out.",
      body: "Reofex Sync extracts the vendor, GSTIN, invoice number, line items with HSN/SAC and the tax split, then checks everything before anything posts. Routine bills post automatically; anything over your limit, from a new vendor or a possible duplicate waits for a manager's one-tap approval.",
    },
    workflow: {
      title: "Live in four steps — set up in an afternoon.",
      steps: [
        { label: "Install", detail: "One command on Windows, Mac or Linux — or we do it with you on a 2-hour call" },
        { label: "Connect", detail: "Sign in to Gmail, add your WhatsApp number, connect Zoho Books or Tally, paste your AI key" },
        { label: "Set your rules", detail: "Pick an approval limit and who approves" },
        { label: "Forget the data entry", detail: "You only see the invoices that need you" },
      ],
    },
    features: [
      { icon: "mail", title: "Invoices arrive on their own", body: "Gmail attachments and photos sent to your WhatsApp Business number land in one inbox — no downloading or forwarding." },
      { icon: "scan", title: "Invoice in, bill out", body: "Reads vendor, GSTIN, invoice number, line items with HSN/SAC and the CGST/SGST/IGST split." },
      { icon: "shieldCheck", title: "Tax & total checks", body: "Validates tax IDs (GSTIN, TRN, VAT), tax rates and that totals add up — before anything posts." },
      { icon: "link", title: "Duplicates & new vendors", body: "Catches duplicates across email and WhatsApp, and confirms new vendors once." },
      { icon: "userCheck", title: "Approve from anywhere", body: "Bills over your limit (say ₹25,000), from a new vendor or possible duplicates wait for a manager — one tap in the app or from the email link. Everything else posts by itself." },
      { icon: "file", title: "Every step on record", body: "A full history per invoice: arrival, checks, who edited or approved, and where it was posted." },
      { icon: "chart", title: "The month at a glance", body: "Posted amount, waiting items, GST on posted bills, duplicates caught and time saved." },
      { icon: "globe", title: "Tax rules built in", body: "India, UAE, Saudi Arabia, Oman, Bahrain, Qatar, Kuwait, the UK and the US. Anywhere else, taxes are read as printed and totals checked." },
      { icon: "database", title: "Zoho Books or Tally", body: "Bills are created in Zoho Books through Zoho's API, or in TallyPrime through Tally's built-in HTTP connector on your own network." },
      { icon: "server", title: "Not another cloud service", body: "Runs on your own Windows, Mac or Linux machine — the Tally PC works. Passwords and API keys are stored encrypted on your machine." },
      { icon: "sparkles", title: "Your AI, your key", body: "Choose Claude or OpenAI and pay the provider directly — about ₹0.07 per invoice on Claude Haiku. Larger models read poor scans better." },
      { icon: "shield", title: "Backups & safe updates", body: "Nightly backups to a folder you control. Updates are one command, and you can go back a version." },
    ],
    integrations: {
      title: "Fits between your inbox and your ledger.",
      body: "Reofex Sync connects to your own Gmail, WhatsApp, Zoho Books or Tally, and your own AI provider account — with no Reofex servers in between.",
      items: ["Gmail", "WhatsApp Business", "Zoho Books", "TallyPrime", "Claude", "OpenAI"],
    },
    highlight: {
      title: "Your invoices never leave your machine.",
      body: "Reofex Sync runs on your own computer or server (the Tally PC works). Invoices go only to the AI provider you choose, under your own account; passwords and API keys are stored encrypted on your machine; nightly backups go to a folder you control. No Reofex servers in between — Reofex never receives your invoices, passwords or keys.",
    },
    benefits: [
      "No more retyping purchase bills",
      "Tax and totals checked before posting",
      "Duplicates caught across email and WhatsApp",
      "Approvals from your phone, routine bills post automatically",
      "Posts straight to Zoho Books or Tally",
      "Unlimited users and channels on every plan",
      "14-day free trial — try the live demo with no signup",
    ],
    seo: {
      title: "Reofex Sync — Purchase invoice automation for Zoho Books & Tally",
      description:
        "Reofex Sync reads purchase invoices from WhatsApp and email, checks GST/VAT, catches duplicates, gets phone approvals and posts bills to Zoho Books or Tally. Runs on your own computer.",
    },
  },
  {
    slug: "reofex-growth",
    name: "Reofex Growth",
    tagline: "AI campaigns. Real customers. You stay in control.",
    category: "Advertising & Marketing",
    description:
      "An AI-assisted Meta advertising platform for small businesses. Run Facebook and Instagram ads where every ad opens a WhatsApp conversation with your business — and nothing goes live or changes budget without your approval.",
    icon: "megaphone",
    logo: { src: "/brand/products/reofex-growth.svg", tile: true },
    accent: "#f78d20",
    accentVar: "--accent-growth",
    screenshot: {
      src: growthDashShot,
      alt: "Reofex Growth dashboard: AI Growth Overview with campaign metrics, AI Insights and an Approval Policy panel where every launch and spend change requires approval.",
      frameLabel: "Reofex Growth · AI Growth Overview",
      mobileFocus: "0% 50%",
    },
    hero: {
      eyebrow: "AI-assisted Meta advertising",
      title: "AI does the work.",
      titleAccent: "You stay in control.",
      body: "Reofex Growth helps small businesses run Facebook and Instagram ads that open straight into a WhatsApp conversation. AI drafts campaigns and suggests improvements — you approve every launch and every budget change.",
      primaryCta: { label: "Request early access", href: "/contact?topic=reofex-growth" },
    },
    problem: {
      title: "Advertising is hard to get right for a small business.",
      points: [
        "Ads managers are complex, and setting up a campaign properly takes expertise.",
        "Clicks that land on a website often never turn into a real conversation.",
        "Handing spend to an opaque automated tool feels like losing control of your budget.",
      ],
    },
    explanation: {
      title: "An assistant for your ads — not an autopilot for your wallet.",
      body: "AI drafts Facebook and Instagram campaigns, suggests changes and helps you optimise. Every ad is built to open a WhatsApp chat with your business, so interest turns into a conversation. Spending money is always a human decision.",
    },
    workflow: {
      title: "From draft to conversation — with approval at every money step.",
      steps: [
        { label: "AI drafts campaign", detail: "Audience, creative & copy" },
        { label: "You review & approve", detail: "Required before launch" },
        { label: "Ads run on Meta", detail: "Facebook & Instagram" },
        { label: "Customer taps ad", detail: "Opens WhatsApp chat" },
        { label: "AI suggests changes", detail: "You approve any budget change" },
      ],
    },
    features: [
      { icon: "sparkles", title: "AI campaign drafts", body: "Get a ready-to-review campaign instead of a blank ads manager." },
      { icon: "whatsapp", title: "Click-to-WhatsApp ads", body: "Every ad opens a WhatsApp conversation with your business." },
      { icon: "facebook", title: "Facebook & Instagram", body: "Run campaigns across Meta's two biggest platforms." },
      { icon: "lightbulb", title: "Optimisation suggestions", body: "AI recommends changes — you decide what to apply." },
      { icon: "userCheck", title: "Human approval, always", body: "Every launch and every budget change needs your explicit approval." },
      { icon: "clock", title: "Campaigns start paused", body: "New campaigns are created paused, verified, then switched on — and approval requests expire after 72 hours." },
      { icon: "eye", title: "Clear visibility", body: "See what's running, what it's costing and what AI is proposing." },
    ],
    highlight: {
      title: "AI cannot spend money autonomously.",
      body: "Reofex Growth is designed so that a human must approve every campaign launch and every budget change. New campaigns start paused. AI prepares and recommends; you decide.",
      image: {
        src: growthApprovalShot,
        alt: "Reofex Growth Approval Policy panel: approval mode always on, new campaigns start paused, requests expire after 72 hours.",
        frameLabel: "Approval Policy",
      },
    },
    benefits: [
      "Launch professional campaigns without ads-manager expertise",
      "Turn ad interest into real WhatsApp conversations",
      "Stay in full control of every rupee, dirham or dollar",
      "Spend less time on setup, more time with customers",
    ],
    seo: {
      title: "Reofex Growth — AI-assisted Meta ads, human-approved",
      description:
        "Reofex Growth helps small businesses run Meta ads that open WhatsApp conversations. AI drafts and suggests; a human approves every launch and budget change.",
    },
  },
  {
    slug: "fynex",
    name: "Fynex",
    tagline: "Self-hosted case management for UAE & GCC service firms.",
    category: "Workflow Management",
    description:
      "Every visa, license and PRO case — run on your own servers. Fynex replaces spreadsheets and shared inboxes with configurable intake forms, step-list approval workflows, wallet-based billing and expiry tracking.",
    icon: "workflow",
    logo: { src: "/brand/products/fynex.svg" },
    accent: "#7357d6",
    accentVar: "--accent-fynex",
    externalUrl: "https://gofynex.com/",
    screenshot: {
      src: fynexShot,
      alt: "Fynex: an Employment Visa Renewal case moving through submission, PRO review, signature, payment and approval, with expiry tracking and wallet balance.",
      frameLabel: "gofynex.com",
      mobileFocus: "100% 50%",
      // the case card, not the site's own headline
      heroZoom: { scale: 1.9, origin: "100% 50%" },
    },
    hero: {
      eyebrow: "Self-hosted · Built for UAE/GCC service workflows",
      title: "Self-hosted case management",
      titleAccent: "for GCC service firms.",
      body: "Every visa, license and PRO case — run on your own servers. Fynex replaces spreadsheets and shared inboxes with configurable intake forms, step-list approval workflows, wallet-based billing and expiry tracking.",
      primaryCta: { label: "Visit gofynex.com", href: "https://gofynex.com/" },
      note: "Deployed inside your own environment — not a shared multi-tenant cloud",
    },
    problem: {
      title: "Service firms still run cases on spreadsheets and shared inboxes.",
      points: [
        "Visa, licensing and PRO requests each need different forms, documents and approvals.",
        "Handoffs between HR, PRO and finance happen over email and get lost.",
        "Document expiries are tracked by memory — until one is missed.",
        "Client data is sensitive, and many firms need it on their own infrastructure.",
      ],
    },
    explanation: {
      title: "Define a service once. Run every request the same way.",
      body: "Build the intake form for each service with its price and VAT. Any permitted team member submits a request, and the task chain routes it — HR to PRO to Finance — automatically. Submissions debit a prepaid company wallet, and compliance alerts make sure nothing expires unnoticed.",
    },
    workflow: {
      title: "A typical Fynex request.",
      body: "A friendly step-list for approvals and handoffs — not a BPMN canvas. Rejections loop back with a reason.",
      steps: [
        { label: "Request", detail: "Submitted by any permitted team member" },
        { label: "Form", detail: "Intake with conditional fields" },
        { label: "Task creation", detail: "Task chain starts automatically" },
        { label: "Assignment", detail: "Routed HR → PRO → Finance" },
        { label: "Documents", detail: "Uploads & e-signature" },
        { label: "Approval", detail: "Rejections loop back with a reason" },
        { label: "Completion", detail: "VAT-ready invoice on every charge" },
      ],
    },
    features: [
      { icon: "form", title: "Service builder", body: "Drag-and-drop intake forms — text, uploads, e-signature, conditional fields." },
      { icon: "workflow", title: "Task workflows", body: "A friendly step-list for approvals and handoffs. Rejections loop back with a reason." },
      { icon: "wallet", title: "Wallet & billing", body: "Requests debit a prepaid company wallet, with top-ups via Tap or Nomod." },
      { icon: "bell", title: "Compliance alerts", body: "Expiries tracked with a configurable lead time and routed to the right role." },
      { icon: "users", title: "Team & roles", body: "A read/write permission matrix per module." },
      { icon: "globe", title: "English & Arabic", body: "Bilingual as a first-class citizen, with full right-to-left layout mirroring." },
      { icon: "invoice", title: "VAT invoicing", body: "A VAT-ready tax invoice on every charge." },
      { icon: "server", title: "Self-hosted", body: "Deployed inside your own environment — not a shared multi-tenant cloud." },
    ],
    integrations: {
      title: "Built in, not bolted on.",
      body: "Six modules in one system, deployed on your own servers, with payment gateways for wallet top-ups.",
      items: ["Service builder", "Task workflows", "Wallet & billing", "Compliance alerts", "Team & roles", "Bilingual RTL interface", "Tap Payments", "Nomod"],
    },
    highlight: {
      title: "Built for UAE/GCC service workflows.",
      body: "Designed for visa agencies, PRO & typing centres, licensing consultancies, HR & immigration teams, document clearing services and business setup advisors. No per-module upsells, no shared tenants, Arabic from day one.",
    },
    benefits: [
      "Replace spreadsheets and shared inboxes with one system",
      "Change forms and workflows without developers",
      "Never miss a document expiry",
      "Client data stays on your own servers",
    ],
    seo: {
      title: "Fynex — Self-hosted case management for GCC firms | Reofex",
      description:
        "Fynex runs every visa, license and PRO case on your own servers: no-code intake forms, step-list approval workflows, wallet billing, compliance alerts and Arabic/English RTL.",
    },
  },
];

export const getProduct = (slug: ProductSlug) => products.find((p) => p.slug === slug)!;
export const productHref = (slug: ProductSlug) => `/products/${slug}`;
