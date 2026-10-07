import type { IconName } from "../components/ui/icons";

export const site = {
  name: "Reofex Technologies",
  shortName: "Reofex",
  url: "https://reofex.com", // TODO: confirm production domain
  description:
    "Reofex Technologies builds SaaS products, intelligent automation and custom software that help businesses operate smarter, faster and with less friction.",
  footerBlurb: "Software products, intelligent automation and custom software for modern businesses.",
  email: "info@reofex.com",
  whatsapp: {
    /** International format, digits only or with +/spaces, e.g. "+971 50 123 4567". Empty = not configured. */
    number: "+91 8075954537",
    message: "Hi Reofex, I'd like to get started with a project. Can we talk?",
  },
  social: [
    { label: "LinkedIn", icon: "linkedin", href: "https://www.linkedin.com/company/reofex" },
    { label: "Instagram", icon: "instagram", href: "https://instagram.com/reofextech" },
    { label: "GitHub", icon: "github", href: "https://github.com/reofex" },
  ] as { label: string; icon: IconName; href: string }[],
};

/**
 * "Get Started" destination: opens a WhatsApp chat with Reofex and a pre-filled message.
 * Falls back to the contact page until a WhatsApp number is configured.
 */
export const getStartedHref = (() => {
  const digits = site.whatsapp.number.replace(/\D/g, "");
  return digits ? `https://wa.me/${digits}?text=${encodeURIComponent(site.whatsapp.message)}` : "/contact?topic=project";
})();

export const mainNav = [
  { label: "Products", href: "/products", mega: true },
  { label: "Solutions", href: "/solutions" },
  { label: "How We Build", href: "/how-we-build" },
  { label: "About", href: "/about" },
  { label: "Case Studies", href: "/case-studies" },
];

export interface Service {
  slug: string;
  icon: IconName;
  name: string;
  summary: string;
  detail: string;
  includes: string[];
}

export const services: Service[] = [
  {
    slug: "custom-software",
    icon: "code",
    name: "Custom Software",
    summary: "Build web and mobile applications around your business needs.",
    detail:
      "When off-the-shelf tools force you to change how you work, we build software that fits the way your business actually operates.",
    includes: ["Web applications", "Mobile applications", "Internal tools & portals", "Business systems"],
  },
  {
    slug: "saas-development",
    icon: "cloud",
    name: "SaaS Development",
    summary: "From product concept and architecture to production.",
    detail:
      "We build SaaS products for ourselves — and bring that same product thinking to yours, from first architecture decisions to a production-ready platform.",
    includes: ["Product discovery", "Multi-tenant architecture", "Billing & accounts", "Launch & iteration"],
  },
  {
    slug: "ai-automation",
    icon: "sparkles",
    name: "AI & Automation",
    summary: "Use AI and automation to reduce repetitive business operations.",
    detail:
      "Practical AI that reads documents, answers customers and moves work between systems — with humans in control where it matters.",
    includes: ["Document understanding", "Conversational AI", "Workflow automation", "Human-in-the-loop design"],
  },
  {
    slug: "integrations",
    icon: "plug",
    name: "Integrations",
    summary: "Connect existing systems through APIs and integrations.",
    detail: "Make the tools you already pay for work together, so data moves once and stays consistent.",
    includes: ["API design & development", "Third-party integrations", "Data synchronisation", "Messaging channels"],
  },
  {
    slug: "development-assistance",
    icon: "users",
    name: "Development Assistance",
    summary: "Extend your team with experienced engineers.",
    detail: "Add engineering capacity to your roadmap with people who are used to shipping products, not just tickets.",
    includes: ["Dedicated engineers", "Code reviews & audits", "Feature delivery", "Technical leadership"],
  },
  {
    slug: "it-solutions",
    icon: "shield",
    name: "IT Solutions",
    summary: "Architecture, modernization and technology consulting.",
    detail: "Clear technical direction for systems that need to scale, be modernised or be rethought.",
    includes: ["Solution architecture", "Legacy modernisation", "Cloud planning", "Technology consulting"],
  },
];

export const processSteps = [
  { n: "01", title: "Understand", body: "Learn your goals, constraints and the real problem behind the request." },
  { n: "02", title: "Architect", body: "Design the right solution and a system that can grow with you." },
  { n: "03", title: "Prototype", body: "Validate the approach early with something people can click." },
  { n: "04", title: "Build", body: "Develop with quality, testing and steady delivery." },
  { n: "05", title: "Integrate", body: "Connect to the systems and data you already rely on." },
  { n: "06", title: "Launch", body: "Ship to production with monitoring and a clear rollout." },
  { n: "07", title: "Improve", body: "Measure, learn and keep improving after launch." },
];

export const capabilities: { icon: IconName; label: string }[] = [
  { icon: "sparkles", label: "AI" },
  { icon: "zap", label: "Automation" },
  { icon: "cloud", label: "Cloud" },
  { icon: "api", label: "APIs" },
  { icon: "layers", label: "SaaS" },
  { icon: "globe", label: "Web" },
  { icon: "phone", label: "Mobile" },
  { icon: "plug", label: "Integrations" },
  { icon: "database", label: "Databases" },
  { icon: "workflow", label: "Workflow systems" },
];

/**
 * Case studies — PLACEHOLDERS ONLY.
 * Replace with real, approved case studies. Do not invent customers or metrics.
 */
export interface CaseStudy {
  slug: string;
  placeholder: boolean;
  label: string;
  title: string;
  problem: string;
  approach: string;
  solution: string;
  technology: string[];
  outcome: string;
  visual: "sync" | "fynex" | "respondly";
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "invoice-automation",
    placeholder: true,
    label: "Invoice automation",
    title: "Automating invoice intake for a finance team",
    problem: "[Placeholder] Describe the client's manual invoice process and why it was a problem.",
    approach: "[Placeholder] How Reofex investigated the workflow and designed the solution.",
    solution: "[Placeholder] What was built — e.g. email/WhatsApp intake into an approval workflow.",
    technology: ["AI document reading", "Workflow automation", "Accounting integration"],
    outcome: "[Placeholder] Real, approved outcome to be supplied by Reofex.",
    visual: "sync",
  },
  {
    slug: "service-workflows",
    placeholder: true,
    label: "Service workflows",
    title: "Digitising service requests for a GCC service company",
    problem: "[Placeholder] Describe how requests and documents were tracked before.",
    approach: "[Placeholder] How the workflows were mapped and configured.",
    solution: "[Placeholder] What was deployed and how the team uses it.",
    technology: ["No-code workflows", "Self-hosted deployment", "Role permissions"],
    outcome: "[Placeholder] Real, approved outcome to be supplied by Reofex.",
    visual: "fynex",
  },
  {
    slug: "customer-messaging",
    placeholder: true,
    label: "Customer communication",
    title: "Answering customer enquiries across messaging channels",
    problem: "[Placeholder] Describe the volume and channels of customer enquiries.",
    approach: "[Placeholder] How the conversation flows and data sources were designed.",
    solution: "[Placeholder] What was implemented and how handover works.",
    technology: ["Conversational AI", "WhatsApp & Instagram", "CRM sync"],
    outcome: "[Placeholder] Real, approved outcome to be supplied by Reofex.",
    visual: "respondly",
  },
];
