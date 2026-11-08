// Every project and its case study lives here.
// Empty or missing case-study fields show as "To fill in" boxes during `npm run dev`
// and are hidden on the live site, so it is safe to fill them in gradually.

export type ProblemDecision = {
  title?: string // the decision in a few words, e.g. "Transparent rules over a black box"
  problem: string // the challenge, one sentence
  decision: string // what you did, one or two sentences
}

// How the project works, shown as a straight line of blocks above the Process text.
// One stage = one block; a stage can hold a few nodes (e.g. two parallel steps).
export type PipelineNode = {
  id: string
  title: string
  detail?: string // methods / tools, e.g. "SAM · SegFormer · CLIP"
  mine?: boolean // the part Nithik built, highlighted
}

export type PipelineStage = {
  label: string // e.g. "Input", "Predict", "Output"
  nodes: PipelineNode[]
}

// For a tool with several layers (e.g. urban / building / unit): one tab per layer,
// each with its own pipeline and one short line per stage.
export type PipelineLevel = {
  label: string // tab name, e.g. "Urban"
  summary?: string // one line on what this layer does and who it is for
  stages: PipelineStage[]
  notes: string[] // one per stage
  // Screenshots of this layer, shown as a slideshow under its pipeline. Put files in
  // public/projects/<slug>/ and use the path from public, e.g. "/projects/oasis/urban-draw.webp".
  images?: LayerImage[]
}

export type LayerImage = {
  src: string
  alt: string
  width: number // the image's pixel size
  height: number
  caption?: string
}

export type ProjectVideo = {
  src: string // e.g. "/projects/crack-detection/crack-detection.mp4" (MP4 in public/projects/<slug>/)
  title: string
  caption?: string
}

// A free form thesis page: chapters of full slides instead of the case study template.
export type ThesisChapter = {
  title: string
  text?: string
  slides: LayerImage[]
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
  award?: string // e.g. "Best Thesis Award", shown as a badge on the card and page
  draft?: boolean // only visible in local dev until it has content

  // ── Summary box (top of the page, what reviewers scan first) ──
  team?: string // e.g. "Team of 3 — IAAC MaAI studio"
  duration?: string // e.g. "10 weeks"
  keyResult?: string // one line, e.g. "Segments façades into 6 classes at 0.81 mIoU"
  stack?: string[] // tools: Python, PyTorch, YOLOv8, Grasshopper…

  // ── Case study ──
  contextStats?: { value: string; label: string }[] // 2–4 key numbers, shown large above the context text
  context?: string[] // the problem and why it matters (one string per paragraph, keep it short)
  role?: string[] // exactly what Nithik built vs. the team
  pipeline?: PipelineStage[] // flowchart shown at the top of Process
  levels?: PipelineLevel[] // several pipelines as tabs; used instead of pipeline/process
  process?: string[] // how it was made; with a pipeline, give one short line per stage and it sits under each block
  screens?: LayerImage[] // screenshots of the finished tool, shown as a slideshow under Process
  videos?: ProjectVideo[] // short demo videos, shown under Process
  problems?: ProblemDecision[] // 2–3 "I chose X over Y because…" decisions
  outcome?: string[] // results, what changed
  modelCard?: ModelCard // for AI / ML projects
  reflection?: string[] // what you'd do differently / next
  links?: ProjectLink[]

  // When set, the project page shows this story instead of the case study sections.
  thesis?: { facts: { label: string; value: string }[]; chapters: ThesisChapter[] }
}

// A short, honest summary of an AI model's results.
export type ModelCard = {
  data?: string // e.g. "2,400 façade photos from Barcelona, hand labelled"
  model?: string // e.g. "YOLOv8-seg, fine tuned from COCO weights"
  baseline?: string // what you compared against
  metrics?: { label: string; value: string }[] // e.g. { label: "mAP50", value: "0.78" }
  limitations?: string[] // where it fails
  codeUrl?: string // GitHub repo
}

// Portfolio spreads (the PNG/WebP pages) are hidden on the site for now: no cover image, no gallery.
// Set to true to bring them back; the files in public/projects stay untouched.
export const SHOW_SPREADS = false

export const projects: Project[] = [
  {
    slug: "oasis",
    title: "OASIS",
    hook: "An AI assisted retrofit tool that maps heat vulnerability from city to apartment and ranks passive interventions using climate, building and health data, helping Barcelona adapt to extreme heat.",
    year: "2026",
    status: "Completed",
    tags: ["Urban Heat", "Heat Vulnerability", "AI Retrofit"],
    spreads: [],
    featured: true,
    award: "Best Thesis Award",

    team: "Main tool developer · team of 4, IAAC MaAI",
    duration: "8 weeks",
    keyResult: "Heat vulnerability scored for every building in a drawn zone, then traced down to room level retrofits",
    stack: ["Infrared SDK", "UTCI", "Ollama · Qwen2.5", "IFC", "OpenStreetMap", "Gemini API"],

    contextStats: [
      { value: "546k", label: "heat related deaths a year worldwide (2012–2021)" },
      { value: "50–85%", label: "of deaths in extreme heat linked to indoor exposure" },
      { value: "28%", label: "of Barcelona homes vulnerable to extreme heat" },
      { value: "591,211", label: "Barcelona homes without enough cross ventilation" },
    ],
    context: [
      "Barcelona faces longer heatwaves, made worse by dense streets, ageing housing and unequal access to cooling.",
      "An architect, a public health officer and a housing operator each hold part of the picture, in separate tools. The 82 year old sleeping at 32°C in apartment 4B stays invisible to all three.",
    ],
    role: [
      "I did the major part of the tool development. I built the complete urban scale tool, integrated my teammates' workflows into one system, and prepared the presentations.",
      "Team: Gaelle Habib, Chun-Chun Chang, Vimal TN, Nithik Vairamuthu. Tutor: Prof. Emanuele Naboni.",
    ],
    levels: [
      {
        label: "Urban",
        summary: "Layer 1 · for municipalities and housing agencies: find where heat vulnerability is highest.",
        stages: [
          { label: "Zone", nodes: [{ id: "zone", title: "Draw the zone", mine: true }] },
          { label: "Simulate", nodes: [{ id: "sim", title: "Site context & microclimate", mine: true }] },
          { label: "Score", nodes: [{ id: "hvi", title: "Heat vulnerability per building", mine: true }] },
          { label: "Intervene", nodes: [{ id: "urban", title: "Urban measures & what ifs", mine: true }] },
          { label: "Hand off", nodes: [{ id: "handoff", title: "High risk buildings to Layer 2", mine: true }] },
        ],
        notes: [
          "Draw a polygon on the map of Barcelona, or search a location.",
          "Buildings, vegetation, ground materials and weather are fetched, and a UTCI microclimate simulation runs. Satellite surface temperature is the fallback.",
          "Every building gets a heat vulnerability index from 0 to 10, with its main drivers: heat island, missing vegetation, poor ventilation, density.",
          "An LLM suggests urban measures such as trees, cool pavements, water and shade corridors, and the user tests what if scenarios.",
          "If a zone stays above 5.5 after the measures, its high risk buildings pass to the building layer with their urban context.",
        ],
        images: [
          { src: "/projects/oasis/urban-draw.webp", width: 2000, height: 1144, alt: "OASIS map of Barcelona with a study zone drawn as a polygon", caption: "Draw a zone on the map. The live data sources are listed beside it." },
          { src: "/projects/oasis/urban-hvi-map.webp", width: 2000, height: 1148, alt: "2D map of the zone with every building coloured by heat vulnerability", caption: "Every building scored from 0 to 10, with the risk distribution and the composite score formula." },
          { src: "/projects/oasis/urban-3d.webp", width: 2000, height: 1150, alt: "3D view of the zone, buildings extruded and coloured by heat vulnerability", caption: "The same zone in 3D: 496 buildings, zone score 5.0, moderate vulnerability." },
          { src: "/projects/oasis/urban-inspector.webp", width: 2000, height: 1147, alt: "Building inspector panel showing one building's exposure, social vulnerability and thermal context", caption: "Inspect one building: exposure, social vulnerability and thermal context behind its score." },
          { src: "/projects/oasis/urban-drivers.webp", width: 2000, height: 1147, alt: "UTCI heatmap of the zone beside a list of vulnerability drivers", caption: "The heatmap and its drivers: thermal stress, poor ventilation and high building density." },
          { src: "/projects/oasis/urban-interventions.webp", width: 2000, height: 1142, alt: "Intervention cards with estimated cost and heat vulnerability reduction beside the 3D zone", caption: "Interventions ranked by projected reduction, each with a cost range for the zone." },
          { src: "/projects/oasis/urban-apartment-section.webp", width: 2000, height: 1146, alt: "Before and after section of a top floor apartment, indoor temperature 38.2°C to 37.6°C", caption: "What the measures mean inside one home: a top floor apartment before and after, −0.6°C indoors." },
        ],
      },
      {
        label: "Building",
        summary: "Layer 2 · for retrofit agencies, architects and building administrators: diagnose overheating room by room.",
        stages: [
          { label: "Upload", nodes: [{ id: "ifc", title: "IFC model & occupants" }] },
          { label: "Read", nodes: [{ id: "parse", title: "Rooms, façades & boundaries" }] },
          { label: "Risk", nodes: [{ id: "kpi", title: "Health weighted heat risk" }] },
          { label: "Rank", nodes: [{ id: "rank", title: "Score rooms, filter strategies" }] },
          { label: "Recommend", nodes: [{ id: "diag", title: "Diagnosis & retrofits in 3D" }] },
        ],
        notes: [
          "An IFC model of the building, its location and who lives there.",
          "The IFC is parsed into rooms, façades and space boundaries.",
          "Solar gain with neighbour shadows, ventilation, envelope and heat island correction over a heatwave week give four health KPIs.",
          "Each room gets a composite risk score, and rules keep only the strategies that fit it.",
          "An LLM writes a plain language diagnosis and the top three retrofits per room, shown in 3D with before/after renders.",
        ],
        images: [
          { src: "/projects/oasis/building-input.webp", width: 2000, height: 1150, alt: "Building analysis form: IFC model, location, construction data and occupant profile", caption: "Upload the IFC model, then add construction data and the occupant profile." },
          { src: "/projects/oasis/building-rooms.webp", width: 2000, height: 1132, alt: "3D building with one room highlighted, its diagnosis, risk breakdown and hourly temperatures", caption: "Room by room: diagnosis, risk breakdown and hourly temperatures, with strategies pinned in 3D." },
        ],
      },
      {
        label: "Unit · panorama",
        summary: "Layer 3 · for residents: assess a single home from one panorama photo.",
        stages: [
          { label: "Upload", nodes: [{ id: "pano", title: "Panorama photo" }] },
          { label: "Read the room", nodes: [{ id: "room", title: "Layout & elements" }] },
          { label: "Risk", nodes: [{ id: "ctx", title: "Risk context & problem map" }] },
          { label: "Generate", nodes: [{ id: "gen", title: "Retrofit strategies" }] },
          { label: "Review", nodes: [{ id: "review", title: "Validate & report" }] },
        ],
        notes: [
          "One panorama photo of the room, its location and who lives there.",
          "LGTNet and SAM 3 reconstruct the room's layout and elements.",
          "Site data and the room's features build a risk context and a problem map.",
          "Retrofit strategies are generated from that evidence.",
          "A validation checkpoint and review loop produce the report, with interventions shown in 3D.",
        ],
        images: [
          { src: "/projects/oasis/unit-brief.webp", width: 2000, height: 904, alt: "Chat agent collecting a room brief next to the reconstructed 3D room", caption: "A short chat collects the room brief; the room is rebuilt in 3D for the resident to check." },
          { src: "/projects/oasis/unit-report.webp", width: 2000, height: 892, alt: "Effect report with before and after values beside the retrofitted 3D room", caption: "The effect report: peak operative temperature 33 → 28.1°C, overheating hours 698 → 209." },
        ],
      },
    ],
    problems: [
      {
        title: "One system across three scales",
        problem: "The data to protect vulnerable residents exists, but in different tools, for different professionals.",
        decision: "Connect city, building and apartment in one tool. The urban layer finds high risk buildings and hands their urban context to the building layer.",
      },
      {
        title: "Health weighted metrics, not just temperature",
        problem: "Air temperature alone doesn't show who is actually at risk.",
        decision: "Four health weighted KPIs: operative temperature, wet bulb globe temperature, nocturnal recovery and age weighted overheating hours.",
      },
      {
        title: "Rules first, then AI",
        problem: "An LLM on its own can recommend retrofits that don't fit the room.",
        decision: "Rules filter out strategies that don't apply, then the LLM writes a plain language diagnosis and the top three retrofits for each room.",
      },
    ],
    outcome: [
      "A working tool with urban and building layers, demonstrated on a real Barcelona scenario, plus a unit scale layer planned for residents using a single panorama photo.",
      "Built for municipalities, the Barcelona Housing Consortium, public health agencies, architects, retrofit agencies and residents. The project received the Best Thesis Award.",
    ],
    reflection: [
      "Next: finish integrating the unit scale layer, so residents' own homes feed real conditions back into the city's vulnerability model.",
    ],
    links: [{ label: "Code on GitHub", href: "https://github.com/helios0007/HVRA" }],
  },
  {
    slug: "retrograde",
    title: "RetroGrade",
    hook: "A tool that rapidly evaluates the early feasibility of sustainable building retrofits, enabling informed retrofit or rebuild decisions before significant time and resources are invested.",
    year: "2026",
    status: "Completed",
    tags: ["Image Segmentation", "Regression Model", "Feasibility Analysis"],
    spreads: [
      "/projects/retrograde/RETROGRADE_SPREAD_1.webp",
      "/projects/retrograde/RETROGRADE_SPREAD_2.webp",
    ],
    featured: true,

    team: "Tool developer · team of 4, IAAC Research Studio II",
    duration: "8 weeks",
    keyResult: "A retrofit feasibility score out of 100 from one façade photo and a short questionnaire, in about 60 seconds",
    stack: ["SAM", "SegFormer", "CLIP", "Random Forest", "Open-Meteo", "Nominatim", "ReportLab"],

    contextStats: [
      { value: "35M", label: "EU buildings to retrofit by 2030" },
      { value: "1%", label: "renovated each year" },
      { value: "4–12 wk", label: "for one feasibility study" },
      { value: "€8–40k", label: "cost of that study" },
    ],
    context: [
      "At today's pace, Europe needs nearly a century to upgrade its buildings, and each one starts with a slow, costly feasibility study that may only conclude: rebuild.",
      "RetroGrade gives that first answer, retrofit or demolish, in about a minute. It is built for municipalities, developers and building owners.",
    ],
    role: [
      "I was a tool developer on a team of four. I built the image segmentation step, which reads a façade photo and turns it into the inputs the rest of the tool depends on: window to wall ratio, shading, vegetation and façade material. I also put together the presentation.",
      "Team: Nithik Vairamuthu, Rashi Desadla, Rim Choufani, Seid Burka. Faculty: Marita Georganta, with faculty assistants Akshay Madapura and Salvador Cantuarias.",
    ],
    pipeline: [
      {
        label: "Input",
        nodes: [
          { id: "photo", title: "Façade photo" },
          { id: "info", title: "Building details", detail: "4 step questionnaire" },
          { id: "loc", title: "Location" },
        ],
      },
      {
        label: "Analyse",
        nodes: [
          { id: "seg", title: "Image segmentation", detail: "SAM · SegFormer · CLIP", mine: true },
          { id: "climate", title: "Climate data", detail: "Open-Meteo" },
        ],
      },
      {
        label: "Predict",
        nodes: [{ id: "reg", title: "Energy & carbon", detail: "Random forest" }],
      },
      {
        label: "Score",
        nodes: [{ id: "score", title: "Feasibility / 100", detail: "135 rules · user weights" }],
      },
      {
        label: "Output",
        nodes: [{ id: "report", title: "PDF report", detail: "In about 60 seconds" }],
      },
    ],
    process: [
      "A façade photo, a short questionnaire about the building, and its location.",
      "SAM, SegFormer and CLIP read windows, shading, vegetation and materials. Open-Meteo adds the climate.",
      "A random forest trained on 40,000 European buildings predicts energy use and carbon emissions.",
      "135 rules in 5 weighted categories give a score out of 100: above 50, retrofit; below, demolish.",
      "A 7 section PDF report, in about 60 seconds.",
    ],
    screens: [
      { src: "/projects/retrograde/landing.webp", width: 2000, height: 1096, alt: "RetroGrade landing page asking whether your building is ready to retrofit, with the five step how it works row", caption: "The landing page: an early feasibility assessment in five steps, from building data and a façade photo to a PDF report." },
      { src: "/projects/retrograde/step1-building.webp", width: 2000, height: 1118, alt: "Questionnaire step 1, choosing the building function: residential, commercial, industrial or institutional", caption: "Step 1 of 4, Building: the user picks the building function." },
      { src: "/projects/retrograde/step1-address-year.webp", width: 2000, height: 1100, alt: "Questionnaire step 1 continued, with the building address, a year built slider and an optional height field", caption: "Step 1 continued: the address (which sets the climate), the year built and an optional height." },
      { src: "/projects/retrograde/step2-energy.webp", width: 2000, height: 1104, alt: "Questionnaire step 2 with options for façade orientation, glazing, insulation and HVAC type", caption: "Step 2, Energy: façade orientation, glazing, insulation and HVAC type." },
      { src: "/projects/retrograde/step3-green-features.webp", width: 2000, height: 1104, alt: "Questionnaire step 3 with toggles for solar panels, smart building systems and rainwater harvesting", caption: "Step 3, Façade: toggles for the green systems the building already has." },
      { src: "/projects/retrograde/step4-photo-weights.webp", width: 2000, height: 1089, alt: "Questionnaire step 4 with an uploaded façade photo and five adjustable category weight sliders totalling 100", caption: "Step 4, Review: the façade photo goes in here, and the five category weights can be adjusted before running the analysis." },
      { src: "/projects/retrograde/result-score.webp", width: 2000, height: 1098, alt: "Analysis result showing a retrofit viability score of 62.0, a category breakdown and the façade segmentation overlay", caption: "The result: a retrofit viability score of 62.0 with a breakdown by category, and the segmentation overlay beside the input photo." },
      { src: "/projects/retrograde/result-details.webp", width: 2000, height: 1100, alt: "Key results: window to wall ratio, façade material, climate, predicted energy and carbon, with location and building inputs", caption: "Key results: window to wall ratio, façade material, climate zone, and predicted energy and carbon, with the inputs listed below and the PDF report ready to download." },
      { src: "/projects/retrograde/pdf-report.webp", width: 2000, height: 1100, alt: "Page of the generated PDF report on energy consumption and carbon emission", caption: "The PDF report: predicted energy and carbon against the EU thresholds, with the key feature inputs and an interpretation." },
    ],
    problems: [
      {
        title: "Specialised models, chained",
        problem: "No single model can read every façade feature a feasibility check needs.",
        decision: "SAM isolates the building, SegFormer finds windows, shading and vegetation, and CLIP classifies materials.",
      },
      {
        title: "Weights the user controls",
        problem: "Owners and municipalities prioritise different things.",
        decision: "Five weighted categories with research based defaults (envelope & energy 30%, orientation 20%, renewables 20%, passive design 15%, environmental impact 15%) that users can adjust.",
      },
      {
        title: "Transparent rules over a black box",
        problem: "A feasibility score has to be explainable, not just a number.",
        decision: "135 readable rules. Existing PV panels score high; a tall, north facing, poorly insulated building in a cold climate scores very low.",
      },
    ],
    outcome: [
      "A working web tool. The user fills in a 4 step questionnaire with a façade photo and their chosen weights, waits about 60 seconds, and downloads a 7 section feasibility report.",
      "Every building analysed is logged to a shared dataset. Over time this builds a record that can support neighbourhood- and city scale analysis of retrofit and demolition needs, for urban planning and policy.",
    ],
    modelCard: {
      codeUrl: "https://github.com/RashiD2801/RetroGrade",
      data: "1,000 façade images for segmentation; 40,000 building records across Europe for the regression model",
      model: "SAM + SegFormer (CMP and ADE20K) + CLIP for façade segmentation; random forest regression for energy and carbon",
      metrics: [
        { label: "Energy consumption MAE", value: "7.79" },
        { label: "Carbon emission MAE", value: "6.90" },
      ],
      limitations: [
        "Window to wall ratio depends on the photo's perspective: the same façade measured 45% WWR and 17.5% shading in one image, and 39.7% and 18.8% in another.",
        "Limited to European buildings, and to residential, commercial, industrial and institutional typologies.",
        "Uses only the façade and general building data; internal layouts and building depth are not considered.",
        "Segmentation and regression models can introduce minor prediction errors.",
      ],
    },
    reflection: [
      "Next steps: bring in building layouts for a stronger environmental analysis; add client budget, cost estimates and ROI for financial feasibility; integrate structural feasibility and local regulations for full retrofit decision support; and suggest retrofit design solutions with visualisations.",
    ],
    links: [{ label: "Code on GitHub", href: "https://github.com/RashiD2801/RetroGrade" }],
  },
  {
    slug: "crack-detection",
    title: "RE:PAIR",
    hook: "A perception driven, closed loop robotic system that detects cracks, repairs them with robotic 3D printing, and verifies the result.",
    year: "2026",
    status: "Completed",
    tags: ["Computer Vision", "Segmentation", "Robotics"],
    spreads: ["/projects/crack-detection/REPAIR_SPREAD.webp"],
    featured: true,

    team: "Developer, crack detection · team of 5, IAAC MRAC/MaAI",
    duration: "6 weeks",
    keyResult: "Detect, repair and verify in one closed loop, tested in simulation and on a UR10",
    stack: ["Python", "YOLOv8", "ROS 2", "UR10", "RViz", "Flask", "Grasshopper"],

    context: [
      "Cracks in timber range from superficial, aesthetic damage to deep, structural failure, and each needs a different repair: filling, patching or reinforcement.",
      "RE:PAIR asks whether a robot can find a crack, repair it, and check its own work, while showing every decision it makes.",
    ],
    role: [
      "I did the programming and development for crack detection: the YOLO segmentation model and the code that turns its masks into centrelines and target points for the robot. The ROS 2 integration was built by a teammate.",
      "Team: Onur Berk Doğrultucu, Vimal TN, Nithik Vairamuthu, Arthur Rotstein, Sam Holcombe.",
    ],
    pipeline: [
      { label: "Capture", nodes: [{ id: "cam", title: "Camera image" }] },
      { label: "Detect", nodes: [{ id: "seg", title: "Crack segmentation", mine: true }] },
      { label: "Extract", nodes: [{ id: "line", title: "Centreline & points", mine: true }] },
      { label: "Repair", nodes: [{ id: "print", title: "Robotic 3D printing" }] },
      { label: "Verify", nodes: [{ id: "check", title: "Re scan & check" }] },
    ],
    process: [
      "A camera captures the cracked timber surface.",
      "A custom trained YOLO segmentation model masks each crack.",
      "Each mask is reduced to a centreline, then to target points for the toolpath.",
      "ROS 2 drives a UR10 that fills the crack by robotic 3D printing.",
      "The robot checks the repair, closing the loop.",
    ],
    videos: [
      { src: "/projects/crack-detection/crack-detection.mp4", title: "Crack detection" },
      { src: "/projects/crack-detection/ros2-simulation.mp4", title: "ROS 2 simulation" },
    ],
    problems: [
      {
        title: "Decisions the operator can see",
        problem: "The robot's perception and planning were invisible, so failures were hard to trace and trust was low.",
        decision: "An observability interface in RViz shows what the robot sees and plans at every step.",
      },
      {
        title: "A Flask bridge to Grasshopper",
        problem: "The detection model had to work in the design tools too, not only inside ROS 2.",
        decision: "A small Flask server exposes the YOLO model over HTTP, so Grasshopper can request crack masks and turn their centrelines into targets for the Robots plug in.",
      },
      {
        title: "A synthetic fallback for testing",
        problem: "Losing the camera stopped the entire pipeline.",
        decision: "A synthetic input lets each stage be tested in isolation.",
      },
    ],
    outcome: [
      "Repairman Stack v1.0: a decision visible robotic repair system, tested in RViz simulation and on a real UR10.",
      "The same crack detection also runs in Rhino/Grasshopper through the Flask bridge.",
    ],
    modelCard: {},
    reflection: [
      "Integration is a system discipline. Code can be correct and the motion still wrong: a 180° base yaw mismatch broke IK alignment, simulated arm kinematics differ from the real UR10, and corner calibration was mandatory before trusting the workspace.",
    ],
  },
  {
    slug: "chronoscape",
    title: "Chronoscape",
    hook: "Rebuilding lost places from residents' memories: a pipeline that turns what people remember into weighted prompts for AI reconstruction, from one home to a whole street.",
    year: "2025",
    status: "Completed",
    tags: ["Image Generation", "Generative AI", "Urban Regeneration"],
    spreads: ["/projects/chronoscape/CHRONOSCAPE_SPREAD.webp"],
    featured: true,

    team: "Lead developer · IAAC Research Studio",
    duration: "8 weeks",
    keyResult: "Residents' memories turned into weighted prompts that rebuild a lost home and a shared street",
    stack: ["Python", "Custom parser", "pypdf", "Emotion analysis", "Location enhancer", "Gemini (Nano Banana)"],

    context: [
      "When a neighbourhood is lost, as in the Pacific Palisades fire, AI reconstruction fills the gaps with generic street patterns and idealised, Western centric styles. Planners end up deciding on false geometry, and neighbourhoods lose their identity.",
      "Chronoscape tests a hypothesis: adding memory to 3D reconstruction gives more contextual richness and spatial coherence than image only or text only models.",
    ],
    role: [
      "I was the lead developer: I wrote the code and built the complete pipeline, from parsing residents' narratives to the prompts that drive image generation.",
    ],
    pipeline: [
      { label: "Remember", nodes: [{ id: "form", title: "Memory questionnaire" }] },
      { label: "Parse", nodes: [{ id: "parser", title: "Weighted, structured prompt", mine: true }] },
      { label: "Locate", nodes: [{ id: "loc", title: "Location enhancer", mine: true }] },
      { label: "Generate", nodes: [{ id: "gen", title: "Remembered home", mine: true }] },
      { label: "Collect", nodes: [{ id: "collective", title: "Collective street", mine: true }] },
    ],
    process: [
      "Residents answer questions about the place: the first image that comes to mind, its atmosphere, materials, routines and light.",
      "A Python parser extracts each resident's story and weights it; emotion analysis sets the light and atmosphere.",
      "A location enhancer adds the real neighbourhood, with a web search fallback, so the model doesn't invent generic streets.",
      "Gemini (Nano Banana) renders street and drone views; a memory manager keeps each resident's images consistent.",
      "Many residents' stories converge into one collective streetscape of the rebuilt neighbourhood.",
    ],
    screens: [
      { src: "/projects/chronoscape/memory-layer.webp", width: 2000, height: 935, alt: "An iceberg above and below a waterline: visible geometry above, the memory layer below", caption: "The idea: above the waterline, incomplete visible geometry, occluded areas and basic streets. Below it, the memory layer: cultural identity, social life, emotional and social nodes." },
      { src: "/projects/chronoscape/evolution.webp", width: 2000, height: 952, alt: "Sequence of generated images from first exterior parameters to a collective neighbourhood view", caption: "How the output evolved: exterior parameters, a collective memory layer, weighted prompt keywords from the parser, the location enhancer, architectural component references, and then neighbourhood views." },
      { src: "/projects/chronoscape/scales.webp", width: 2000, height: 950, alt: "Diagram from user input through the location enhancer to single unit and neighbourhood scales", caption: "The system: a user's questionnaire and reference image pass through the location enhancer, then scale from one person and one home to many residents and a neighbourhood." },
      { src: "/projects/chronoscape/remembered-home.webp", width: 2000, height: 944, alt: "Two generated views of a remembered home on a hillside street at dusk", caption: "A remembered home, generated from a resident's memory: a raised timber house above a winding hillside street." },
      { src: "/projects/chronoscape/comparison.webp", width: 2000, height: 964, alt: "The same scene generated by Grok, Perplexity, ChatGPT and Chronoscape side by side", caption: "The same place generated by Grok, Perplexity, ChatGPT and Chronoscape. The other three place the house on a clifftop above the sea; Chronoscape places it on a built up hillside street." },
    ],
    problems: [
      {
        title: "Memory as structured data",
        problem: "Memories are personal, vague and unstructured.",
        decision: "A questionnaire built on six kinds of memory (sensory, spatial, emotional, collective, habit and architectural character) turns them into structured data.",
      },
      {
        title: "Weighting what mattered most",
        problem: "Not every remembered detail matters equally for rebuilding a place.",
        decision: "The parser assigns weights. Thresholds, paths and the street context rank very high, small objects medium, decoration low.",
      },
      {
        title: "Grounded in the real place",
        problem: "Image models hallucinate missing parts from their training data.",
        decision: "A location enhancer and architectural references anchor each generation in the actual neighbourhood. Results were compared against ChatGPT, Gemini, Grok, Perplexity, Stable Diffusion, SDXL and Flux.",
      },
    ],
    outcome: [
      "Remembered homes generated from single residents' memories, and a collective streetscape of a rebuilt Pacific Palisades neighbourhood that carries many residents' stories.",
      "The dataset so far: 250 user uploaded context images, 13 resident narratives and 82 architectural elements.",
    ],
    links: [{ label: "Code on GitHub", href: "https://github.com/helios0007/CHRONOSCAPE" }],
    reflection: [
      "Memory based reconstruction is not about geometric accuracy. It is about recovering the semantic and spatial information that cameras cannot capture.",
    ],
  },
  {
    slug: "pressure-chamber",
    title: "Pressure Chamber",
    hook: "An interactive installation for Barcelona, World Capital of Architecture 2026, where visitors try to out prompt an AI image generator and discover its biases first hand.",
    year: "2026",
    status: "Exhibited",
    tags: ["Installation", "Generative AI", "AI Bias"],
    spreads: [],
    featured: true,

    team: "Coding & installation",
    duration: "",
    keyResult: "Visitors prompt Gemini to match a target image; CLIP scores the result and reveals the bias behind the gap",
    stack: ["Python", "Flask", "Gemini API", "CLIP ViT-B/32", "React", "Three.js", "Raspberry Pi"],

    context: [
      "Generative AI quietly repeats the patterns in its training data: doctors appear as men, health as slim bodies, street food as Western.",
      "Pressure Chamber lets visitors feel that bias for themselves in a short game, exhibited in Barcelona during World Capital of Architecture 2026.",
    ],
    role: [
      "I worked on the coding of the app and on the physical installation at the exhibition.",
    ],
    pipeline: [
      { label: "Choose", nodes: [{ id: "task", title: "Language & bias challenge" }] },
      { label: "Prompt", nodes: [{ id: "prompt", title: "Visitor writes a prompt" }] },
      { label: "Generate", nodes: [{ id: "gen", title: "AI image" }] },
      { label: "Score", nodes: [{ id: "score", title: "Similarity to target" }] },
      { label: "Reveal", nodes: [{ id: "reveal", title: "Bias & leaderboard" }] },
    ],
    process: [
      "Visitors pick English, Spanish or Catalan and get a bias challenge with a target image.",
      "They write a prompt that should recreate the target without falling into the bias.",
      "Gemini generates the image; an offline fallback keeps the installation running without a connection.",
      "CLIP (ViT-B/32) compares the result with the target and gives a similarity score from 0 to 100.",
      "The bias behind the gap is explained, and the score goes on the leaderboard.",
    ],
    screens: [
      { src: "/projects/pressure-chamber/expo-night.webp", width: 2000, height: 1125, alt: "The installation in a dark exhibition space, lit by its blue screen and small lamps", caption: "The installation in the dark exhibition space, lit by its own screen and small lamps." },
      { src: "/projects/pressure-chamber/expo-visitors.webp", width: 2000, height: 1125, alt: "Two visitors standing at the installation in front of a wall drawing", caption: "Visitors at the installation during the exhibition." },
      { src: "/projects/pressure-chamber/challenge-loop.webp", width: 960, height: 540, alt: "Slide: prompt, generate, compare, reveal, with four steps from target image to result and report", caption: "The challenge loop: the visitor sees a target image, describes it in a prompt, the AI generates its interpretation, and the system compares, scores and explains the bias." },
      { src: "/projects/pressure-chamber/six-challenges.webp", width: 960, height: 540, alt: "Slide listing the six bias challenges", caption: "Six challenges, each aimed at a different bias: The Awkward Reach, Who's the Boss, Tunnel Vision, The Invisible Spectrum, No Complexity Zone and The Missing Brother." },
      { src: "/projects/pressure-chamber/system-framework.webp", width: 960, height: 540, alt: "Slide with the system as five blocks from user input to report", caption: "How the system works: user input, prompt engine, image model, vision score and report." },
      { src: "/projects/pressure-chamber/visitor-journey.webp", width: 960, height: 540, alt: "Slide showing the visitor journey from intro video to the takeaway", caption: "The visitor journey: intro video, language select, name entry, instruction video, a six card task hub, three tasks completed, then the takeaway. The system then resets for the next visitor." },
      { src: "/projects/pressure-chamber/installation.webp", width: 960, height: 540, alt: "Slide with a front elevation of the kiosk style booth", caption: "The physical installation: the web app runs in a kiosk like booth where the screen, console, input device and lighting make the playground feel physical." },
      { src: "/projects/pressure-chamber/ergonomics.webp", width: 960, height: 540, alt: "Slide with an isometric drawing of a person using the kiosk table", caption: "Ergonomics and scale: a 1500 mm wide table, about 750 mm high, with an angled console, recessed screen, keyboard and mouse, and RGB LEDs." },
    ],
    problems: [
      {
        title: "Bias you experience, not read about",
        problem: "Explaining AI bias with text alone rarely sticks.",
        decision: "Turn it into a game: visitors try to beat the model and watch the bias appear in their own results.",
      },
      {
        title: "Always on, even offline",
        problem: "An exhibition can't stop when the network or the API does.",
        decision: "A mock image renderer and a fallback similarity scorer keep the full flow working without Gemini or CLIP.",
      },
      {
        title: "Built for a kiosk",
        problem: "The installation had to run unattended all day.",
        decision: "It runs on a Raspberry Pi as a system service in kiosk mode, starting on boot with screen sleep disabled.",
      },
    ],
    outcome: [
      "Exhibited in Barcelona during World Capital of Architecture 2026, in three languages, with bias games such as The Dominant Hand and The Glass Ceiling. A web version also deploys to Vercel.",
    ],
    links: [{ label: "Code on GitHub", href: "https://github.com/helios0007/PRESSURE-CHAMBER" }],
  },
  {
    slug: "comparative-assembly",
    title: "Guided Comparative Assembly",
    hook: "An interactive tabletop installation: visitors build a small building scenario on a marker tracked table and see its carbon, labour, time and cost projected back onto the surface.",
    year: "2026",
    status: "Completed",
    tags: ["Installation", "Human-in-the-loop", "Construction LCA"],
    spreads: [],
    featured: true,

    team: "Data, UI & workflows · team of 6, IAAC MRAC + MaAI",
    duration: "6 weeks",
    keyResult: "Three construction methods compared live at a table, every number a sourced range",
    stack: ["TouchDesigner", "Python", "OpenCV ArUco", "MediaPipe", "ESP32 + RC522 RFID", "OSC", "Projection mapping", "Rhino + Grasshopper"],

    contextStats: [
      { value: "37%", label: "of global energy related CO₂ comes from buildings (UNEP, 2022)" },
      { value: "80%", label: "of a project's lifecycle impact is locked in during early design (McKinsey, 2023)" },
      { value: "282%", label: "most the carbon figure for one material changes by switching database" },
      { value: "47", label: "cited data sources behind the numbers" },
    ],
    context: [
      "Material, construction method, footprint and height are decided early in a project, often before any environmental or economic data is consulted. For non experts that data is inaccessible; for experts it is contested, because methodological assumptions vary and single figure comparisons mislead. The same building's result can move by around 200% just by changing the calculation method.",
      "This installation makes the consequences legible in the moment of choosing: a physical table that reads the building you configure and projects what it costs in carbon, labour, time and money. The data is shown as honest ranges with their sources, not as falsely precise single figures.",
      "Two tangible tables taught the loop: Urp (MIT, 1999), where a building model's shadow follows a simulated sun, and the reacTable (UPF, 2007), where pucks read by a camera become the controls. The project borrows their cycle of project, place, confirm, advance, and adds guided assembly and life cycle comparison to it.",
    ],
    role: [
      "I worked on data gathering, the projected UI, the presentation, and the workflows that connect the system.",
      "Around that: Leo built the TouchDesigner runtime, the vision pipeline and the ESP32 firmware, Rafik led the LCA dataset and its source registry, Onur the metrics engine, and Juan modelled the real phase sequence of each method.",
      "Team: Leo, Elias, Rafik, Seid, Onur, Nithik. Course: Hardware III, Human in the Loop: Interactive Systems, with Hamid Peiro and Aleksandra Kraeva.",
    ],
    pipeline: [
      {
        label: "Choose",
        nodes: [{ id: "rfid", title: "Method model", detail: "MIFARE tag · RC522 reader · ESP32" }],
      },
      {
        label: "Configure",
        nodes: [
          { id: "plane", title: "Footprint", detail: "4 corner markers · red puck, 10 points" },
          { id: "height", title: "Height", detail: "slide potentiometer · ESP32" },
          { id: "material", title: "Material", detail: "ArUco marker, ID 11" },
        ],
      },
      {
        label: "Compute",
        nodes: [
          { id: "data", title: "Sourced data", detail: "ranges · confidence tiers", mine: true },
          { id: "engine", title: "Metrics engine", detail: "area × floors × shape factor" },
        ],
      },
      {
        label: "Project",
        nodes: [{ id: "ui", title: "Nine panel UI", detail: "TouchDesigner · short throw projector", mine: true }],
      },
      {
        label: "Compare",
        nodes: [{ id: "compare", title: "Methods side by side" }],
      },
    ],
    process: [
      "The visitor places a 3D printed model of masonry, 3D printed or prefab construction on an RFID pedestal. Each model holds a MIFARE tag, read by an RC522 reader on an ESP32.",
      "Four ArUco markers at the table corners fix the working plane. A red puck held still for three seconds places each footprint point, ten in all, and the area comes from the shoelace formula. A slide potentiometer sets the number of floors, and an ArUco marker the material.",
      "Python and OpenCV send puck positions to TouchDesigner over OSC; the ESP32 sends the RFID and slider values over serial. Sourced per m² ranges are scaled by area, floors and a plan shape factor.",
      "One TouchDesigner script lays out nine named panels, 1280 × 720, for the short throw projector: selection, plan, phase navigation, part and total impact, assembly sequence, method, state and a status bar that names the next action.",
      "Each method steps through the phases it really has, projecting each one's carbon, energy, labour, time and cost: five for masonry, three for 3D printing, four for prefab. Then a comparison view sets the methods side by side.",
    ],
    problems: [
      {
        title: "Honest ranges, not single numbers",
        problem: "Construction data varies widely between sources and contexts, and a single figure hides that.",
        decision: "Every metric is a low–high range with its source, a tier (peer reviewed or EPD, institutional, vendor claim) and a confidence level, drawn from EPDs, the BEDEC Catalonia cost database and peer reviewed studies. A missing value stays visibly missing, so the table shows a data gap instead of faking precision.",
      },
      {
        title: "Hands on the table, not a screen",
        problem: "Non experts rarely engage with life cycle spreadsheets.",
        decision: "Visitors configure the building with their hands, using method models, a tracked puck and a height slider, and the feedback is projected straight onto the table. It is a live sandbox, not a scripted tour: any change re projects every metric at once, and hand gestures cover the rest (undo, add a window, extrude the walls into 3D, reset).",
      },
      {
        title: "A slider for height, not a marker",
        problem: "Height began as an ArUco dial, but a rotating marker is unreliable under projector light and a dial is a weak way to ask how many floors.",
        decision: "A linear slide potentiometer on the ESP32 now sets the floors as one continuous physical action. Median and moving average smoothing with hysteresis at floor boundaries keep it stable, the slider to projection delay stays under 100 ms, and each method has its own floor cap (3D printed earth is limited to one).",
      },
      {
        title: "Honest phases for each method",
        problem: "Forcing the same five phases onto every method would misrepresent how each one is built.",
        decision: "Masonry runs five phases. 3D printing collapses to three (foundation, print, finishing) because the printer lays structure, roof and openings in one pass, and prefab has four because it arrives finished from the factory. Juan modelled the real sequence for each, and the projection swaps the geometry as you step through. Reclaimed brick serves as a circular baseline, so every method is plotted against reuse rather than against zero.",
      },
      {
        title: "Tracking that survives projector light",
        problem: "Under a top down projector the corner markers can drop out and the homography returns nothing, which was the most common failure.",
        decision: "A marker free red puck tracker, with a dwell timer, became the resilient path for placing points, and a hand gesture layer reads secondary actions. Both vision pipelines stay in the repository.",
      },
      {
        title: "Logic in Python, rendering in TouchDesigner",
        problem: "The first runtime, Grasshopper with Anemone, stalled once it had to hold a live state machine, a camera and a projection at once.",
        decision: "The runtime moved to TouchDesigner and Rhino was demoted to geometry generation. The state engine and metrics sit in testable, version controlled Python, TouchDesigner only renders, and everything runs on one laptop over USB and serial, so the installation needs no network or IT support.",
      },
      {
        title: "A state model that survives a live room",
        problem: "An installation can break in many ways: a lost camera, a misplaced puck, an operator reset.",
        decision: "A layered state machine separates the eight visitor facing states from a wrapper of calibration, error, reset and manual override states, and from the colour coded projection feedback. Puck data goes stale after ten frames without a heartbeat and raises the error state.",
      },
    ],
    videos: [
      { src: "/projects/comparative-assembly/sandbox.mp4", title: "The sandbox in action", caption: "method, footprint, height, validate, compare" },
      { src: "/projects/comparative-assembly/vision-detection.mp4", title: "Vision pipeline", caption: "the camera reading the working plane and the puck" },
      { src: "/projects/comparative-assembly/touchdesigner-response.mp4", title: "TouchDesigner response", caption: "the projection answering in real time" },
    ],
    screens: [
      { src: "/projects/comparative-assembly/concept-setup.webp", width: 2000, height: 1116, alt: "Concept illustration of the installation: an overhead projector and camera over a table with a projected interface, a red puck and building models", caption: "The setup, as a concept illustration: an overhead short throw projector and camera above a table with building models, a red puck and the projected interface." },
      { src: "/projects/comparative-assembly/step-1-method.webp", width: 2000, height: 1131, alt: "Concept illustration of a hand placing a white building model onto a glowing pedestal", caption: "Move 1, method (concept illustration): place a printed model of the construction method on the RFID pedestal." },
      { src: "/projects/comparative-assembly/step-2-footprint.webp", width: 2000, height: 1131, alt: "Concept illustration of a glowing green building footprint projected onto a dark table", caption: "Move 2, footprint (concept illustration): dwell a red puck to drop each corner point of the plan." },
      { src: "/projects/comparative-assembly/step-3-height.webp", width: 2000, height: 1131, alt: "Concept illustration of a hand moving a slider beside a glowing multi storey building", caption: "Move 3, height (concept illustration): push the slider to set the number of floors." },
      { src: "/projects/comparative-assembly/step-4-validate.webp", width: 2000, height: 1131, alt: "Concept illustration of a footprint outline on a table between four corner markers with a red puck", caption: "Move 4, validate (concept illustration): four corner markers fix the plane and the footprint is checked before the phases begin." },
      { src: "/projects/comparative-assembly/step-5-compare.webp", width: 2000, height: 1131, alt: "Concept illustration of three building models, brick, 3D printed and timber, each with bars for carbon, cost and time", caption: "Move 5, compare (concept illustration): walk the phases, then end with the methods side by side." },
      { src: "/projects/comparative-assembly/physical-layer.webp", width: 2000, height: 1125, alt: "Three photos: the RFID pedestal with its reader, the red puck, and a board with method models and two sliders", caption: "The objects a visitor touches: the RFID pedestal with its reader, the red puck, and the board with the printed method models and the height sliders." },
      { src: "/projects/comparative-assembly/phases-masonry.webp", width: 2000, height: 1125, alt: "Four renders of a masonry building: foundation, structure, roof and openings", caption: "The projected build phases for masonry: foundation, structure, roof, openings (finishing shown on the last model)." },
      { src: "/projects/comparative-assembly/phases-3d-printed.webp", width: 2000, height: 1125, alt: "Three renders of a 3D printed building: foundation slab, printed walls, and finished with roof", caption: "The projected phases for 3D printing: foundation, print, finishing. There is no separate roof phase." },
      { src: "/projects/comparative-assembly/projection-ui.webp", width: 2000, height: 1110, alt: "Capture of the nine panel projection with selection, phase chips, part and total impact and a status bar", caption: "A live capture of the nine panel projection, with TouchDesigner's network visible: selection on the left, lifecycle stages along the top, impacts on the right and the status bar below." },
      { src: "/projects/comparative-assembly/vision-capture.webp", width: 2000, height: 1172, alt: "The vision pipeline running: four corner markers around a working plane and a puck with a dwell ring", caption: "The vision pipeline running: four corner markers fix the working plane, and the puck fills a three second dwell ring before it places a point." },
    ],
    outcome: [
      "Presented at the IAAC final critique on 22 May 2026, comparing masonry, 3D printed and prefab construction in a Catalan context. Jury members could play with it directly instead of watching a scripted tour: swap a method model, move the puck, slide the floors, and every metric updates at once.",
      "The numbers behind the table, per m² of floor area. Masonry: 205–490 kgCO2e, 22–34 labour hours, 14–20 weeks, €950–1,350, from Catalan tier 1 sources. 3D printed: 58–147 kgCO2e, 8–16 hours, 6–10 weeks, €1,000–1,500. Prefab: 130–350 kgCO2e, 12–20 hours, 8–12 weeks, €1,100–1,600, with the range spanning biogenic carbon accounting methods.",
      "Developed in the open as a repository of about 200 commits with the state spec, interface contract and run books.",
    ],
    reflection: [
      "The data has honest gaps. There is no peer reviewed Catalan life cycle study for 3D printed construction, so those figures come from Qatar, Australia and the US, and there is no Spanish primary dataset for prefab. CLT is sourced from Austria and Sweden; its 1,800–2,200 km of transport adds 25–60 kgCO2e/m² that most studies leave out.",
      "Three gaps were still open at the final presentation, each with a next step. The RFID reader was not yet detecting the tags, so the method was switched by hand while the DumpInfo diagnostic isolated hardware from code. Camera calibration came from physical measurements, the real spacing of the corner markers and the camera height, and still had to be checked at the frame edges. And prefab's lifecycle stages did not yet share an axis with the build phases of the other methods.",
      "The hardest part was coordination, not code. Six people's work diverged across branches that never merged, and a run of automatic snapshots looked like progress but was checkpointing, not integration. The team declared one branch the source of truth and did a single convergence pass.",
      "Next: a sound layer with a soundscape per method, re calibration under exhibition lighting, a proximity zoom, projected phase animations once the numbers are locked, more methods, and a museum deployment. The longer term picture is a table at the client meeting that shows the plan and each phase's cost, carbon and time, so client and consultant decide together.",
    ],
    links: [{ label: "Code on GitHub", href: "https://github.com/Leonardboeker/Hardware_III" }],
  },
  {
    slug: "pawlytics",
    title: "Pawlytics",
    hook: "A pet health monitoring app that learns each pet's baseline, adds breed risk, and tells owners clearly when a change is worth a vet visit.",
    year: "2026",
    status: "MVP",
    tags: ["Full stack App", "Health Monitoring", "3D Web"],
    spreads: [],
    featured: true,

    team: "Solo developer · personal project",
    duration: "",
    keyResult: "Daily logs turned into a 0–100 health score with clear Monitor / Vet soon / Urgent guidance",
    stack: ["React", "TypeScript", "Vite", "Tailwind", "Three.js", "Recharts", "FastAPI", "SQLAlchemy", "PostgreSQL", "JWT auth", "OpenStreetMap"],

    contextStats: [
      { value: "6", label: "subsystems in the health engine, all rules based" },
      { value: "30", label: "days of a pet's own history make up its baseline" },
      { value: "10", label: "breed profiles with prevalence data" },
      { value: "3", label: "urgency levels: Monitor, Vet soon, Urgent" },
    ],
    context: [
      "Changes in a pet's eating, sleep or activity are gradual and easy to miss, and owners rarely know when a change is worth a vet visit.",
      "Pawlytics is built for monitoring, not diagnosis: it compares each pet with its own baseline and gives clear, explainable guidance on when to act.",
    ],
    role: [
      "I did the complete development: the FastAPI backend and PostgreSQL data model, the rules based health engine, and the React front end with its 3D pet avatar.",
      "The repository starts from a product requirements document that lays out an eight layer architecture, from input sources through ingestion, storage, processing and the intelligence layer to output and a feedback loop. The app implements the path through that stack that an MVP needs.",
    ],
    pipeline: [
      { label: "Log", nodes: [{ id: "log", title: "Daily health log", detail: "energy · appetite · sleep · walks · symptoms", mine: true }] },
      { label: "Baseline", nodes: [{ id: "base", title: "Compare with own average", detail: "30 day baseline", mine: true }] },
      { label: "Breed risk", nodes: [{ id: "breed", title: "Known breed conditions", detail: "VetCompass · OFA", mine: true }] },
      { label: "Triage", nodes: [{ id: "triage", title: "Score & urgency", detail: "rule tree · 0–100", mine: true }] },
      { label: "Explain", nodes: [{ id: "explain", title: "Plain language guidance", detail: "templates · 3D avatar", mine: true }] },
    ],
    process: [
      "Owners log energy (1–5), appetite, mood, sleep, walks, play, weight and symptoms each day, in a short structured form.",
      "Today is compared with the pet's own last 30 days. Activity counts for 40% of the baseline match, sleep for 25%, energy for 20% and appetite for 15%. An activity drop of more than 30%, a weight change of more than 5% or an energy crash is flagged as an anomaly.",
      "Prevalence data for ten breed profiles, derived from VetCompass and OFA statistics, adds context. For dogs of ten or older, age linked conditions such as arthritis and cancer are weighted up by half.",
      "A rule tree sorts symptoms into Monitor, Vet soon or Urgent: difficulty breathing, a seizure, a collapse or suspected poisoning is urgent on its own, and so is vomiting with diarrhoea. Baseline deviation (up to 40 points), triage (10, 30 or 60), breed risk (up to 20) and anomalies add up to a risk score, and the health score is 100 minus it, nudged by up to 5 points by the recent trend.",
      "A plain language explanation built from templates, a 30 day trend, and a 3D avatar whose colour and movement follow the score. The tail only wags above 70.",
    ],
    screens: [
      { src: "/projects/pawlytics/onboarding.webp", width: 1280, height: 720, alt: "Four phone screens: splash, welcome with a dog photo, create an account, and sign in", caption: "Onboarding: splash, welcome (\"Make pet care easy, fun and rewarding\"), create an account and sign in." },
      { src: "/projects/pawlytics/pet-profile-home.webp", width: 1280, height: 720, alt: "Four phone screens: pet profile form, home with today's actions, daily question and weekly tips, and the health dashboard with a score of 75", caption: "Setting up a pet (name, species, breed, age, weight), then the home screen with today's actions, a daily question and weekly tips, and the health dashboard showing a daily summary score of 75/100." },
      { src: "/projects/pawlytics/health-log-explore.webp", width: 1280, height: 720, alt: "Four phone screens: the daily health log with energy, appetite and mood, the symptom picker, and the Explore tab listing vets in Barcelona", caption: "The daily health log (energy, appetite, mood, sleep, walks, symptoms and notes), and an Explore tab that lists vets in Barcelona from OpenStreetMap data." },
      { src: "/projects/pawlytics/profile-assistant.webp", width: 1280, height: 720, alt: "Four phone screens: the pet profile with weight, next vet visit and age, and a chat with the health assistant Fetch", caption: "The pet profile with weight, next vet visit and age, and Fetch, the chat assistant in the product design, asking follow up questions about the pet's health." },
    ],
    problems: [
      {
        title: "Monitoring, not diagnosis",
        problem: "An app that claims to diagnose is risky and hard to trust.",
        decision: "Focus on early warning and escalation: compare each pet with its own baseline and say clearly when to contact a vet.",
      },
      {
        title: "Rules before machine learning",
        problem: "There is no training data at launch, and owners need to see why a warning appears.",
        decision: "A transparent rules engine with template based explanations first; lightweight ML once enough logs exist.",
      },
      {
        title: "Explainable by construction",
        problem: "A score nobody can trace is a score nobody trusts.",
        decision: "Each log stores its score, urgency level and explanation when it is saved, and every warning maps to a named rule, so the history reads back exactly as it was judged.",
      },
      {
        title: "A new pet has no baseline",
        problem: "On day one there is no personal history to compare with.",
        decision: "The engine assumes a neutral baseline until logs accumulate, and the dashboard says so and asks the owner to start logging, rather than inventing a trend.",
      },
      {
        title: "Local services without an API key",
        problem: "Owners also need to find a vet, a groomer or a park nearby.",
        decision: "The Explore tab queries OpenStreetMap through the Overpass API for vets, groomers, parks, training and hotels around Barcelona. It needs no key, at the cost of photos and ratings.",
      },
      {
        title: "Health you can see",
        problem: "Numbers alone don't keep owners engaged day to day.",
        decision: "A 3D avatar of the pet, built with Three.js, reflects its health state next to the score and trend: its colour, how much it bobs and whether it wags all follow the score.",
      },
    ],
    outcome: [
      "A working full stack MVP: accounts with hashed passwords and token sign in, a 3 step pet onboarding, daily logging, health score and triage, a breed risk panel and 30 day trends, behind a documented REST API.",
      "Ten endpoints cover sign up, sign in, pets, breed risks, logs and the health summary. Saving a log runs the engine and stores its result, and each owner can only reach their own pets and logs.",
      "The Explore tab lists live vets, groomers, parks, training and hotels around Barcelona from OpenStreetMap.",
    ],
    links: [{ label: "Code on GitHub", href: "https://github.com/helios0007/PAWLYTICS" }],
    reflection: [
      "The rules are reasoned, not yet tested against real vet outcomes: the thresholds and weights are sensible defaults that need tuning as logs accumulate, and the breed table covers ten profiles. The feedback loop in the product requirements, where an owner confirms a symptom resolved or logs a vet visit, is designed but not built, and the repository has no automated tests yet.",
      "The Explore tab's featured places and reading tips are static placeholders; only the category lists are live.",
      "Next: wearable integration, lightweight anomaly detection once logs accumulate, and vet clinic integrations.",
    ],
  },
  {
    slug: "lunar-habitations",
    title: "LUNA: The Moon Base",
    hook: "Architecture as a hypothesis: a single project drawn as a five stage protocol for sustained human presence at the lunar south pole.",
    year: "2024",
    status: "Undergraduate thesis",
    tags: ["Lunar Architecture", "Origami Geometry", "Computational Design"],
    spreads: [],
    featured: true,
    stack: ["Grasshopper", "Rhino"],
    links: [
      {
        label: "Download paper",
        href: "/projects/lunar/origami-lunar-habitations.pdf",
        download: true,
      },
    ],
    thesis: {
      facts: [
        { label: "Site", value: "Lunar south pole" },
        { label: "Programme", value: "B.Arch thesis, VIT Vellore" },
        { label: "Published", value: "ZMECH Conference, November 2025" },
      ],
      chapters: [
        {
          title: "The premise",
          text: "Humanity's next frontier is a question of survival, routine and civic life. The thesis asks whether one architectural protocol can hold all three at the lunar south pole, where sunlight reaches the rim and water ice waits in permanent shadow.",
          slides: [
            { src: "/projects/lunar/luna-03.webp", alt: "Premise and the four traits that govern the site", width: 3000, height: 1500 },
            { src: "/projects/lunar/luna-05.webp", alt: "A floor of permanent shadow, surface zoning and associative logic", width: 3000, height: 1500 },
            { src: "/projects/lunar/luna-07.webp", alt: "Light on the rim, ice in the shadow", width: 3000, height: 1500 }
          ],
        },
        {
          title: "A protocol in five stages",
          text: "The settlement grows one step at a time: landing, first link, cluster, public floor, network. Each stage adds a single system and makes the next one possible, so dependence on Earth shrinks as the base grows.",
          slides: [
            { src: "/projects/lunar/luna-02.webp", alt: "Five stages, one settlement", width: 3000, height: 1500 }
          ],
        },
        {
          title: "Finding the form",
          text: "Global and local studies tested how the settlement could grow and what a single habitat could be. Origami gave the answer: a module that travels folded and opens on site, following Miura tessellation.",
          slides: [
            { src: "/projects/lunar/luna-08.webp", alt: "Global response and local response studies", width: 3000, height: 1500 },
            { src: "/projects/lunar/luna-09.webp", alt: "Form iterations in Grasshopper", width: 3000, height: 1500 },
            { src: "/projects/lunar/luna-10.webp", alt: "Miura logic, unfolded", width: 3000, height: 1500 }
          ],
        },
        {
          title: "The habitat",
          text: "A pre assembled module is transported in contracted form and unfolded on arrival. Floor structure, panel layers and elevations show how the folded skin becomes a tiered home.",
          slides: [
            { src: "/projects/lunar/luna-11.webp", alt: "The unfolded habitat on the lunar surface", width: 3000, height: 1500 },
            { src: "/projects/lunar/luna-12.webp", alt: "Floor structure and panel details", width: 3000, height: 1500 },
            { src: "/projects/lunar/luna-13.webp", alt: "Elevations of the habitat", width: 3000, height: 1500 }
          ],
        },
        {
          title: "The settlement thinks in tubes",
          text: "Air tubes link the habitats to a public floor, anchored on an inflatable shell. Robots print regolith shells around laboratories, and support systems sit quietly beneath the floor plates.",
          slides: [
            { src: "/projects/lunar/luna-14.webp", alt: "A public floor on lunar soil", width: 3000, height: 1500 },
            { src: "/projects/lunar/luna-15.webp", alt: "Regolith printed laboratories", width: 3000, height: 1500 },
            { src: "/projects/lunar/luna-16.webp", alt: "The settlement on the rim", width: 3000, height: 1500 },
            { src: "/projects/lunar/luna-17.webp", alt: "Plans and sections of the network", width: 3000, height: 1500 },
            { src: "/projects/lunar/luna-18.webp", alt: "Support systems", width: 3000, height: 1500 }
          ],
        },
        {
          title: "A closed loop",
          text: "Every litre of water and every breath of air is used again. Ice from the shadowed crater floor is melted, split, breathed and reclaimed, until the settlement begins to need less of Earth.",
          slides: [
            { src: "/projects/lunar/luna-19.webp", alt: "A closed loop", width: 3000, height: 1500 },
            { src: "/projects/lunar/luna-20.webp", alt: "Self sustaining settlement", width: 3000, height: 1500 },
            { src: "/projects/lunar/luna-21.webp", alt: "The finished settlement", width: 3000, height: 1500 }
          ],
        },
      ],
    },
  },
]

const isDev = process.env.NODE_ENV === "development"

/** Projects that should appear on the site (drafts only show in local dev). */
export const visibleProjects = projects.filter((p) => isDev || !p.draft)

export const featuredProjects = visibleProjects.filter((p) => p.featured || (isDev && p.draft))

export function getProject(slug: string) {
  return visibleProjects.find((p) => p.slug === slug)
}
