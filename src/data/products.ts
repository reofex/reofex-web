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
/** A rectangle in % of an image, drawn around one complete UI element */
export interface Crop {
  x: number;
  y: number;
  w: number;
  h: number;
}

/**
 * Product page "What X does": features grouped into a few themes, each shown
 * with a crop of the product's own screenshot (see FeatureStack).
 */
export interface FeatureCard {
  title: string;
  body: string;
  /** titles from `features`, in display order */
  features: string[];
  /** a crop of the product's screenshot… */
  crop?: Crop;
  /** …or a product-style panel (see FeatureStack's `panels`) */
  ui?: "respondly-channels" | "respondly-studio";
}

export interface Screenshot {
  src: ImageMetadata;
  alt: string;
  /** Neutral label shown in the frame's title bar */
  frameLabel: string;
  /**
   * Phones show one complete part of the screen instead of the whole desktop
   * screenshot shrunk to nothing. A rectangle in % of the image, drawn around a
   * whole UI element so the crop never cuts through text.
   */
  mobileCrop?: Crop;
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
  featureCards?: FeatureCard[];
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
      mobileCrop: { x: 50, y: 13, w: 36, h: 60 }, // the phone and its chat
    },
    hero: {
      eyebrow: "AI assistant for WhatsApp, Instagram and your website",
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
      title: "Your assistant, your rules.",
      body: "Give the assistant one job, decide what it asks and when, and when a person steps in. Simple settings, no prompt writing, and a safe test chat before customers see a change. It answers from your own catalogue and business facts, takes orders and payments in the chat, and sends ready leads to Zoho CRM.",
    },
    workflow: {
      title: "Up and running in four steps.",
      steps: [
        { label: "Sign up & decide what your AI does", detail: "Start from a template, try it in a safe test chat" },
        { label: "Add your products & facts", detail: "Products, services, hours, prices and policies, by hand or CSV" },
        { label: "Connect channels & open your store", detail: "WhatsApp, Instagram, website chat and the online store" },
        { label: "Get notified & step in", detail: "Ready leads, new orders and handovers, at once" },
      ],
    },
    featureCards: [
      {
        title: "Answers from your real catalogue",
        body: "Customers get the actual product, price and stock, in the language they write in, at any hour.",
        features: ["24/7 AI responses", "Replies in your customer's language", "Your catalogue, your data"],
        crop: { x: 50.4, y: 13, w: 30, h: 38 },
      },
      {
        title: "Takes the order, and the payment",
        body: "Orders and payment links come from your catalogue and your own payment account, and ready leads land in Zoho CRM.",
        features: ["Orders & payments in chat", "Online store add-on", "Zoho CRM sync"],
        crop: { x: 53, y: 47.2, w: 34, h: 25.8 },
      },
      {
        title: "Every channel, one assistant",
        body: "WhatsApp, Instagram and your website chat answered by the same assistant, with one dashboard for all of it.",
        features: ["Instagram DMs & auto-import", "Website chat widget", "Instant alerts & handover", "Performance dashboard"],
        ui: "respondly-channels",
      },
      {
        title: "You decide how it works",
        body: "Choose its job, what it asks and when a person takes over. No prompt writing, and our team helps you set it up.",
        features: ["Assistant Studio", "Collect only what you need", "Templates for your industry", "Setup help from our team"],
        ui: "respondly-studio",
      },
    ],
    features: [
      { icon: "clock", title: "24/7 AI responses", body: "Answers every WhatsApp, Instagram and website message within seconds, at 2 AM or 2 PM." },
      { icon: "globe", title: "Replies in your customer's language", body: "English, Malayalam, Manglish, Arabic and more, detected automatically." },
      { icon: "database", title: "Your catalogue, your data", body: "Every reply comes from your own products, services and facts, so prices and stock are right." },
      { icon: "card", title: "Orders & payments in chat", body: "Order summary to confirm, change or cancel, paid into your own Razorpay or Stripe account." },
      { icon: "layers", title: "Online store add-on", body: "The products it sells in the chat become a store at your own address. Growth and Pro plans." },
      { icon: "users", title: "Zoho CRM sync", body: "Ready leads become Zoho CRM leads with everything the assistant learned, kept up to date." },
      { icon: "instagram", title: "Instagram DMs & auto-import", body: "Replies to DMs like WhatsApp, and can turn existing posts into ready-to-review products." },
      { icon: "code", title: "Website chat widget", body: "One line of code adds a branded AI chat to your website." },
      { icon: "bell", title: "Instant alerts & handover", body: "WhatsApp and email alerts when a lead is ready; the AI steps back when you reply." },
      { icon: "chart", title: "Performance dashboard", body: "Leads, orders, sales and how the assistant is doing, in one place." },
      { icon: "sparkles", title: "Assistant Studio", body: "Set its job and rules without prompts, test changes safely, publish, and roll back any time." },
      { icon: "filter", title: "Collect only what you need", body: "Per detail: save if mentioned, ask when needed, or ask only before an order or handover." },
      { icon: "compass", title: "Templates for your industry", body: "Fashion, real estate, clinics, restaurants, education and more, ready to adjust." },
      { icon: "userCheck", title: "Setup help from our team", body: "Real people help you get live, and stay a message away afterwards." },
    ],
    integrations: {
      title: "Works with the tools you already use.",
      body: "Respondly connects your channels, your payments and your CRM, with Excel export and CSV import for everything else.",
      items: ["WhatsApp", "Instagram", "Website chat widget", "Zoho CRM", "Razorpay", "Stripe", "Excel export", "CSV import"],
    },
    benefits: [
      "Never miss an enquiry, day or night",
      "Answers from your real products, prices and policies",
      "Orders and payments in the chat, paid into your own account",
      "Ready leads land in Zoho CRM on their own",
      "Your team steps in only when it matters",
      "Real people to help you set up",
    ],
    seo: {
      title: "Respondly — AI assistant and online store for WhatsApp & Instagram | Reofex",
      description:
        "Respondly answers customers on WhatsApp, Instagram and your website from your real catalogue, takes orders and payments in the chat, syncs leads to Zoho CRM and hands over to your team.",
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
      mobileCrop: { x: 17.5, y: 17.5, w: 54.5, h: 55 }, // the "Needs you" list
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
    featureCards: [
      {
        title: "Only the bills that need you",
        body: "Invoices arrive from Gmail and WhatsApp, get read and checked, and only the exceptions wait for a person.",
        features: ["Invoices arrive on their own", "Invoice in, bill out", "Tax & total checks", "Duplicates & new vendors", "Approve from anywhere"],
        crop: { x: 17.5, y: 17.5, w: 54.5, h: 55 },
      },
      {
        title: "Connected to the tools you already use",
        body: "Your inbox, your WhatsApp number, your ledger and your own AI provider, in one flow.",
        features: ["Zoho Books or Tally", "Your AI, your key", "Tax rules built in"],
        crop: { x: 72, y: 18.5, w: 27, h: 35.5 },
      },
      {
        title: "Runs on your machine, with a full record",
        body: "Nothing goes through Reofex servers. Every invoice keeps its history, and the month's numbers are one click away.",
        features: ["Not another cloud service", "Every step on record", "The month at a glance", "Backups & safe updates"],
        crop: { x: 0, y: 0, w: 60, h: 39.5 },
      },
    ],
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
      mobileCrop: { x: 72, y: 70, w: 27, h: 29.5 }, // the Approval Policy card
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
    featureCards: [
      {
        title: "Campaigns drafted for you",
        body: "A ready-to-review campaign for Facebook and Instagram, where every ad opens a WhatsApp chat.",
        features: ["AI campaign drafts", "Facebook & Instagram", "Click-to-WhatsApp ads", "Clear visibility"],
        crop: { x: 0, y: 0, w: 49, h: 52 },
      },
      {
        title: "Nothing spends without you",
        body: "Launches and budget changes always need your approval, and new campaigns start paused.",
        features: ["Human approval, always", "Campaigns start paused"],
        crop: { x: 72, y: 70, w: 27, h: 29.5 },
      },
      {
        title: "Suggestions you approve",
        body: "AI watches the results and recommends changes. You decide which ones happen.",
        features: ["Optimisation suggestions"],
        crop: { x: 0.5, y: 79, w: 12.6, h: 20.5 },
      },
    ],
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
      mobileCrop: { x: 50.5, y: 30, w: 34, h: 45.5 }, // the case card
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
    featureCards: [
      {
        title: "Every request runs the same way",
        body: "Build the intake form once, and each request follows its step list from submission to approval.",
        features: ["Service builder", "Task workflows", "Team & roles"],
        crop: { x: 50.5, y: 30, w: 34, h: 45.5 },
      },
      {
        title: "Billing and expiries, handled",
        body: "Charges come from a prepaid wallet with a VAT invoice each time, and expiries are tracked before they lapse.",
        features: ["Wallet & billing", "VAT invoicing", "Compliance alerts"],
        crop: { x: 50.5, y: 63, w: 34, h: 12.5 },
      },
      {
        title: "Your servers, your language",
        body: "Deployed inside your own environment, in English and Arabic with full right-to-left layout.",
        features: ["Self-hosted", "English & Arabic"],
        crop: { x: 17, y: 69.5, w: 32, h: 20.5 },
      },
    ],
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
