/**
 * Single source of truth for Reofex products.
 * Cards, the navigation mega menu, the footer and every product page read from here.
 *
 * Content rules (see brief §25):
 *  - Respondly copy mirrors https://therespondly.com and Fynex copy mirrors
 *    https://gofynex.com (both inspected 2026-10-07).
 *  - Reofex Growth: AI never spends money on its own — human approval is always explicit.
 *  - No invented customers, metrics, partnerships or performance numbers.
 */
import type { ImageMetadata } from "astro";
import type { IconName } from "../components/ui/icons";
import respondlyShot from "../assets/products/respondly.png";
import fynexShot from "../assets/products/fynex.png";
import growthDashShot from "../assets/products/growth-dash.png";
import growthApprovalShot from "../assets/products/growth-approval.png";
import syncShot from "../assets/products/sync.png";

export type ProductSlug = "respondly" | "reofex-growth" | "reofex-sync" | "fynex";

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
    tagline: "AI that replies to your clients the way you would.",
    category: "Customer Communication",
    description:
      "Respondly understands customer queries on WhatsApp, Instagram and your website, and responds with your actual business data — products, prices, services and opening hours — 24 hours a day.",
    icon: "chat",
    accent: "#1f9d6b",
    accentVar: "--accent-respondly",
    externalUrl: "https://therespondly.com/",
    screenshot: {
      src: respondlyShot,
      alt: "Respondly website: 'AI that replies to your clients the way you would', with a website chat widget answering a property enquiry.",
      frameLabel: "therespondly.com",
    },
    hero: {
      eyebrow: "AI WhatsApp & Instagram lead automation",
      title: "AI that replies to your clients",
      titleAccent: "the way you would.",
      body: "No more generic auto-replies. Respondly understands every customer query on WhatsApp, Instagram and your website, and responds with your actual data — instantly, 24 hours a day.",
      primaryCta: { label: "Visit therespondly.com", href: "https://therespondly.com/" },
      note: "7-day free trial · Setup in 10 minutes",
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
    slug: "reofex-growth",
    name: "Reofex Growth",
    tagline: "AI campaigns. Real customers. You stay in control.",
    category: "Advertising & Marketing",
    description:
      "An AI-assisted Meta advertising platform for small businesses. Run Facebook and Instagram ads where every ad opens a WhatsApp conversation with your business — and nothing goes live or changes budget without your approval.",
    icon: "megaphone",
    accent: "#f78d20",
    accentVar: "--accent-growth",
    screenshot: {
      src: growthDashShot,
      alt: "Reofex Growth dashboard: AI Growth Overview with campaign metrics, AI Insights and an Approval Policy panel where every launch and spend change requires approval.",
      frameLabel: "Reofex Growth · AI Growth Overview",
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
    slug: "reofex-sync",
    name: "Reofex Sync",
    tagline: "From invoice receipt to accounting entry — automated.",
    category: "Finance & Accounting",
    description:
      "An AI-powered invoice automation system. Invoices arriving by email or WhatsApp are read, extracted, matched to vendors, validated and routed for approval — then posted into your connected accounting software.",
    icon: "invoice",
    accent: "#138a8a",
    accentVar: "--accent-sync",
    screenshot: {
      src: syncShot,
      alt: "Reofex Sync, AI for Accounts: auto-read invoices from email, extract GST details, match vendors and catch duplicates, and post to Zoho Books — shown with the invoice inbox on a laptop.",
      frameLabel: "Reofex Sync · AI for Accounts",
    },
    hero: {
      eyebrow: "AI invoice automation",
      title: "From invoice receipt to accounting entry —",
      titleAccent: "automated.",
      body: "Reofex Sync picks up invoices from email and WhatsApp, reads them with AI, validates the data, runs your approval workflow and creates the accounting entry in your connected software.",
      primaryCta: { label: "Book a walkthrough", href: "/contact?topic=reofex-sync" },
    },
    problem: {
      title: "Invoice processing is still mostly copy and paste.",
      points: [
        "Invoices arrive as email attachments and WhatsApp photos in every possible format.",
        "Someone retypes vendor, amounts and tax lines into the accounting system by hand.",
        "Manual entry means errors, chasing approvals and slow month-end close.",
      ],
    },
    explanation: {
      title: "One pipeline from inbox to ledger.",
      body: "Reofex Sync watches the channels where invoices arrive, uses AI to read and understand each document, matches it against your vendors, validates it, and sends it through the approval workflow you define before posting to accounting.",
    },
    workflow: {
      title: "Every step of the invoice journey, handled.",
      steps: [
        { label: "Invoice received", detail: "Email or WhatsApp" },
        { label: "AI reads invoice" },
        { label: "Data extracted" },
        { label: "Invoice understood" },
        { label: "Vendor matched" },
        { label: "Invoice validated" },
        { label: "Approval workflow" },
        { label: "Accounting entry" },
        { label: "Connected accounting software" },
      ],
    },
    features: [
      { icon: "mail", title: "Email & WhatsApp intake", body: "Capture invoices from the channels vendors already use." },
      { icon: "scan", title: "AI document reading", body: "Extract vendor, line items, totals and tax from varied layouts." },
      { icon: "invoice", title: "GST extraction", body: "Extract GST details from every invoice, ready for your books." },
      { icon: "link", title: "Vendor matching & duplicates", body: "Match each invoice to the right vendor and catch duplicates before they're posted." },
      { icon: "shieldCheck", title: "Automated validation", body: "Catch missing fields and inconsistencies before they reach your books." },
      { icon: "userCheck", title: "Approval workflows", body: "Route invoices to the right people for sign-off." },
      { icon: "database", title: "Post to Zoho Books", body: "Post approved entries to Zoho Books in one click." },
    ],
    integrations: {
      title: "Fits between your inbox and your ledger.",
      body: "Intake channels on one side, your accounting system on the other — with AI reading, validation and approvals in between.",
      items: ["Email", "WhatsApp", "GST", "Approval workflow", "Zoho Books"],
    },
    benefits: ["Less manual work", "Fewer errors", "Faster invoice processing", "Automated validation", "Approval workflows", "Accounting integration"],
    seo: {
      title: "Reofex Sync — AI invoice automation to accounting",
      description:
        "Reofex Sync reads invoices from email and WhatsApp with AI, matches vendors, validates, routes approvals and posts entries to your accounting software.",
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
    accent: "#7357d6",
    accentVar: "--accent-fynex",
    externalUrl: "https://gofynex.com/",
    screenshot: {
      src: fynexShot,
      alt: "Fynex: an Employment Visa Renewal case moving through submission, PRO review, signature, payment and approval, with expiry tracking and wallet balance.",
      frameLabel: "gofynex.com",
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
