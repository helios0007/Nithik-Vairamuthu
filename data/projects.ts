// Every project and its case study lives here.
// Empty or missing case-study fields show as "To fill in" boxes during `npm run dev`
// and are hidden on the live site, so it is safe to fill them in gradually.

export type ProblemDecision = {
  problem: string
  decision: string
}

export type ProjectLink = {
  label: string
  href: string
  download?: boolean
}

export type Project = {
  slug: string // used in the URL: /projects/<slug>
  title: string
  hook: string // one line on what it does
  year: string
  status: string
  tags: string[] // themes / methods
  spreads: string[] // portfolio images, shown in the gallery; the first is the cover
  featured?: boolean // shown in "Selected work" on the home page
  draft?: boolean // only visible in local dev until it has content

  // ── Summary box (top of the page, what reviewers scan first) ──
  team?: string // e.g. "Team of 3 — IAAC MaAI studio"
  duration?: string // e.g. "10 weeks"
  keyResult?: string // one line, e.g. "Segments façades into 6 classes at 0.81 mIoU"
  stack?: string[] // tools: Python, PyTorch, YOLOv8, Grasshopper…

  // ── Case study ──
  context?: string[] // the problem and why it matters (one string per paragraph)
  role?: string[] // exactly what Nithik built vs. the team
  process?: string[] // how it was made: sketches, iterations, one thing that failed
  problems?: ProblemDecision[] // 2–3 "I chose X over Y because…" decisions
  outcome?: string[] // results, what changed
  modelCard?: ModelCard // for AI / ML projects
  reflection?: string[] // what you'd do differently / next
  links?: ProjectLink[]
}

// A short, honest summary of an AI model's results.
export type ModelCard = {
  data?: string // e.g. "2,400 façade photos from Barcelona, hand-labelled"
  model?: string // e.g. "YOLOv8-seg, fine-tuned from COCO weights"
  baseline?: string // what you compared against
  metrics?: { label: string; value: string }[] // e.g. { label: "mAP50", value: "0.78" }
  limitations?: string[] // where it fails
  codeUrl?: string // GitHub repo
}

export const projects: Project[] = [
  {
    slug: "retrograde",
    title: "RetroGrade",
    hook: "A tool that rapidly evaluates the early feasibility of sustainable building retrofits, enabling informed retrofit-or-rebuild decisions before significant time and resources are invested.",
    year: "2026",
    status: "Completed",
    tags: ["Image Segmentation", "Regression Model", "Feasibility Analysis"],
    spreads: [
      "/projects/retrograde/RETROGRADE_SPREAD_1.webp",
      "/projects/retrograde/RETROGRADE_SPREAD_2.webp",
    ],
    featured: true,
    context: [],
    role: [],
    stack: [],
    problems: [],
    outcome: [],
    modelCard: {},
  },
  {
    slug: "crack-detection",
    title: "Crack Detection & Robotic Repair",
    hook: "A computer vision pipeline using YOLOv8 segmentation to detect structural cracks and generate robotic repair paths.",
    year: "2026",
    status: "Completed",
    tags: ["Computer Vision", "Segmentation", "Robotics"],
    spreads: ["/projects/crack-detection/REPAIR_SPREAD.webp"],
    featured: true,
    context: [],
    role: [],
    stack: ["YOLOv8", "Python", "ROS2"],
    problems: [],
    outcome: [],
    modelCard: {},
  },
  {
    slug: "chronoscape",
    title: "Chronoscape",
    hook: "Memory-informed 3D reconstruction for urban regeneration — adding memory as an input produces environments with more contextual richness and spatial coherence than image-only or text-only models.",
    year: "2025",
    status: "Completed",
    tags: ["Image Generation", "Generative AI", "Urban Regeneration"],
    spreads: ["/projects/chronoscape/CHRONOSCAPE_SPREAD.webp"],
    featured: true,
    context: [],
    role: [],
    stack: [],
    problems: [],
    outcome: [],
  },
  {
    slug: "lunar-habitations",
    title: "Origami Lunar Habitations",
    hook: "A computational study of origami-inspired geometries applied to lunar habitat design.",
    year: "2025",
    status: "Published",
    tags: ["Computational Geometry", "Lunar Architecture"],
    spreads: ["/projects/lunar/lunar.webp"],
    featured: true,
    context: [],
    role: [],
    stack: ["Grasshopper", "Rhino"],
    problems: [],
    outcome: [
      "Presented at the ZMECH Conference, VIT Vellore (November 2025).",
    ],
    links: [
      {
        label: "Download paper",
        href: "/projects/lunar/origami-lunar-habitations.pdf",
        download: true,
      },
    ],
  },

  // ── Drafts: hidden on the live site until they have content and images ──
  {
    slug: "hvra-oasis",
    title: "HVRA / OASIS",
    hook: "A heat-vulnerability and overheating assessment tool — IAAC studio project.",
    year: "2026",
    status: "In progress",
    tags: ["Climate Risk", "Urban Heat"],
    spreads: [],
    draft: true,
  },
  {
    slug: "theia",
    title: "THEIA",
    hook: "A lunar environment and site-intelligence platform.",
    year: "2026",
    status: "In progress",
    tags: ["Lunar", "Site Intelligence"],
    spreads: [],
    draft: true,
  },
]

const isDev = process.env.NODE_ENV === "development"

/** Projects that should appear on the site (drafts only show in local dev). */
export const visibleProjects = projects.filter((p) => isDev || !p.draft)

export const featuredProjects = visibleProjects.filter((p) => p.featured || (isDev && p.draft))

export function getProject(slug: string) {
  return visibleProjects.find((p) => p.slug === slug)
}
