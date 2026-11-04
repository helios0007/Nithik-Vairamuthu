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

    team: "Tool developer · team of 4, IAAC Research Studio II",
    duration: "",
    keyResult: "A retrofit feasibility score out of 100 from one façade photo and a short questionnaire, in about 60 seconds",
    stack: ["SAM", "SegFormer", "CLIP", "Random Forest", "Open-Meteo", "Nominatim", "ReportLab"],

    context: [
      "Over 35 million buildings in Europe need to be retrofitted by 2030 to meet climate goals. But the EU renovates only about 1% of its building stock each year, so at the current pace most buildings would take nearly a century to upgrade.",
      "Every retrofit starts with an early feasibility study, which typically takes 4–12 weeks and costs €8,000–40,000 (€2–10/m² of floor area). After all that time and money, the answer may simply be that the building has to be rebuilt.",
      "RetroGrade answers that first question quickly: is this building worth retrofitting, or should it be demolished? It is built for municipalities, real estate developers and building owners.",
    ],
    role: [
      "I was a tool developer on a team of four. I built the image segmentation step, which reads a façade photo and turns it into the inputs the rest of the tool depends on: window-to-wall ratio, shading, vegetation and façade material. I also put together the presentation.",
      "Team: Nithik Vairamuthu, Rashi Desadla, Rim Choufani, Seid Burka. Faculty: Marita Georganta, with faculty assistants Akshay Madapura and Salvador Cantuarias.",
    ],
    process: [
      "Step 1a, image processing: SAM extracts the building mask from the façade photo. SegFormer trained on the CMP façade dataset detects façade elements to calculate window-to-wall ratio and shading. SegFormer trained on ADE20K finds vegetation and its coverage. CLIP classifies materials and vegetation types.",
      "Step 1b, climate data: the building's address is geocoded with Nominatim, then Open-Meteo provides temperatures, solar radiation and wind. From these the tool derives the Köppen climate class, heating and cooling degree days (HDD/CDD), and daylight and ventilation indices.",
      "Step 2, prediction: a random forest regression model, trained on 40,000 building records across Europe, predicts energy consumption and carbon emissions from the façade results, building information and building systems.",
      "Step 3, scoring: a rule-based algorithm with 135 rules in 5 categories combines everything into a score out of 100. Above 50, a retrofit is feasible; below 50, demolition is suggested. The result is delivered as a 7-section PDF report.",
    ],
    problems: [
      {
        problem: "No single model can read everything a feasibility check needs from a façade photo.",
        decision: "Chain specialised models: SAM to isolate the building, SegFormer (CMP) for windows and shading, SegFormer (ADE20K) for vegetation, and CLIP for materials.",
      },
      {
        problem: "Different users care about different things: an owner and a municipality will weigh energy, solar access or environmental impact differently.",
        decision: "Make the score a weighted assessment across five categories: envelope & energy 30%, orientation & solar exposure 20%, renewable energy access 20%, passive design 15%, environmental impact 15%. Users can adjust the weights, and the defaults are set from research.",
      },
      {
        problem: "A score needs to be explainable, not just a number.",
        decision: "Use transparent rules instead of a black-box model. For example, a building that already has PV panels scores high. A north-facing building in a cold climate with poor insulation or single glazing and over 15 m tall scores very low, because it performs poorly and is very hard to retrofit.",
      },
    ],
    outcome: [
      "A working web tool. The user fills in a 4-step questionnaire with a façade photo and their chosen weights, waits about 60 seconds, and downloads a 7-section feasibility report.",
      "Every building analysed is logged to a shared dataset. Over time this builds a record that can support neighbourhood- and city-scale analysis of retrofit and demolition needs, for urban planning and policy.",
    ],
    modelCard: {
      data: "1,000 façade images for segmentation; 40,000 building records across Europe for the regression model",
      model: "SAM + SegFormer (CMP and ADE20K) + CLIP for façade segmentation; random forest regression for energy and carbon",
      metrics: [
        { label: "Energy consumption MAE", value: "7.79" },
        { label: "Carbon emission MAE", value: "6.90" },
      ],
      limitations: [
        "Window-to-wall ratio depends on the photo's perspective: the same façade measured 45% WWR and 17.5% shading in one image, and 39.7% and 18.8% in another.",
        "Limited to European buildings, and to residential, commercial, industrial and institutional typologies.",
        "Uses only the façade and general building data; internal layouts and building depth are not considered.",
        "Segmentation and regression models can introduce minor prediction errors.",
      ],
    },
    reflection: [
      "Next steps: bring in building layouts for a stronger environmental analysis; add client budget, cost estimates and ROI for financial feasibility; integrate structural feasibility and local regulations for full retrofit decision support; and suggest retrofit design solutions with visualisations.",
    ],
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
