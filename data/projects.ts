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

// Portfolio spreads (the PNG/WebP pages) are hidden on the site for now: no cover image, no gallery.
// Set to true to bring them back; the files in public/projects stay untouched.
export const SHOW_SPREADS = false

export const projects: Project[] = [
  {
    slug: "oasis",
    title: "OASIS",
    hook: "An AI-assisted retrofit tool that maps heat vulnerability from city to apartment and ranks passive interventions using climate, building and health data, helping Barcelona adapt to extreme heat.",
    year: "2026",
    status: "Completed",
    tags: ["Urban Heat", "Heat Vulnerability", "AI Retrofit"],
    spreads: [],
    featured: true,
    award: "Best Thesis Award",

    team: "Main tool developer · team of 4, IAAC MaAI",
    duration: "8 weeks",
    keyResult: "Heat vulnerability scored for every building in a drawn zone, then traced down to room-level retrofits",
    stack: ["Infrared SDK", "UTCI", "Ollama · Qwen2.5", "IFC", "OpenStreetMap", "Gemini API"],

    contextStats: [
      { value: "546k", label: "heat-related deaths a year worldwide (2012–2021)" },
      { value: "50–85%", label: "of deaths in extreme heat linked to indoor exposure" },
      { value: "28%", label: "of Barcelona homes vulnerable to extreme heat" },
      { value: "591,211", label: "Barcelona homes without enough cross-ventilation" },
    ],
    context: [
      "Barcelona faces longer heatwaves, made worse by dense streets, ageing housing and unequal access to cooling.",
      "An architect, a public health officer and a housing operator each hold part of the picture, in separate tools. The 82-year-old sleeping at 32°C in apartment 4B stays invisible to all three.",
    ],
    role: [
      "I did the major part of the tool development. I built the complete urban-scale tool, integrated my teammates' workflows into one system, and prepared the presentations.",
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
          { label: "Intervene", nodes: [{ id: "urban", title: "Urban measures & what-ifs", mine: true }] },
          { label: "Hand off", nodes: [{ id: "handoff", title: "High-risk buildings to Layer 2", mine: true }] },
        ],
        notes: [
          "Draw a polygon on the map of Barcelona, or search a location.",
          "Buildings, vegetation, ground materials and weather are fetched, and a UTCI microclimate simulation runs. Satellite surface temperature is the fallback.",
          "Every building gets a heat vulnerability index from 0 to 10, with its main drivers: heat island, missing vegetation, poor ventilation, density.",
          "An LLM suggests urban measures such as trees, cool pavements, water and shade corridors, and the user tests what-if scenarios.",
          "If a zone stays above 5.5 after the measures, its high-risk buildings pass to the building layer with their urban context.",
        ],
        images: [
          { src: "/projects/oasis/urban-draw.webp", width: 2000, height: 1144, alt: "OASIS map of Barcelona with a study zone drawn as a polygon", caption: "Draw a zone on the map. The live data sources are listed beside it." },
          { src: "/projects/oasis/urban-hvi-map.webp", width: 2000, height: 1148, alt: "2D map of the zone with every building coloured by heat vulnerability", caption: "Every building scored from 0 to 10, with the risk distribution and the composite score formula." },
          { src: "/projects/oasis/urban-3d.webp", width: 2000, height: 1150, alt: "3D view of the zone, buildings extruded and coloured by heat vulnerability", caption: "The same zone in 3D: 496 buildings, zone score 5.0, moderate vulnerability." },
          { src: "/projects/oasis/urban-inspector.webp", width: 2000, height: 1147, alt: "Building inspector panel showing one building's exposure, social vulnerability and thermal context", caption: "Inspect one building: exposure, social vulnerability and thermal context behind its score." },
          { src: "/projects/oasis/urban-drivers.webp", width: 2000, height: 1147, alt: "UTCI heatmap of the zone beside a list of vulnerability drivers", caption: "The heatmap and its drivers: thermal stress, poor ventilation and high building density." },
          { src: "/projects/oasis/urban-interventions.webp", width: 2000, height: 1142, alt: "Intervention cards with estimated cost and heat vulnerability reduction beside the 3D zone", caption: "Interventions ranked by projected reduction, each with a cost range for the zone." },
          { src: "/projects/oasis/urban-apartment-section.webp", width: 2000, height: 1146, alt: "Before and after section of a top-floor apartment, indoor temperature 38.2°C to 37.6°C", caption: "What the measures mean inside one home: a top-floor apartment before and after, −0.6°C indoors." },
        ],
      },
      {
        label: "Building",
        summary: "Layer 2 · for retrofit agencies, architects and building administrators: diagnose overheating room by room.",
        stages: [
          { label: "Upload", nodes: [{ id: "ifc", title: "IFC model & occupants" }] },
          { label: "Read", nodes: [{ id: "parse", title: "Rooms, façades & boundaries" }] },
          { label: "Risk", nodes: [{ id: "kpi", title: "Health-weighted heat risk" }] },
          { label: "Rank", nodes: [{ id: "rank", title: "Score rooms, filter strategies" }] },
          { label: "Recommend", nodes: [{ id: "diag", title: "Diagnosis & retrofits in 3D" }] },
        ],
        notes: [
          "An IFC model of the building, its location and who lives there.",
          "The IFC is parsed into rooms, façades and space boundaries.",
          "Solar gain with neighbour shadows, ventilation, envelope and heat-island correction over a heatwave week give four health KPIs.",
          "Each room gets a composite risk score, and rules keep only the strategies that fit it.",
          "An LLM writes a plain-language diagnosis and the top three retrofits per room, shown in 3D with before/after renders.",
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
        decision: "Connect city, building and apartment in one tool. The urban layer finds high-risk buildings and hands their urban context to the building layer.",
      },
      {
        title: "Health-weighted metrics, not just temperature",
        problem: "Air temperature alone doesn't show who is actually at risk.",
        decision: "Four health-weighted KPIs: operative temperature, wet bulb globe temperature, nocturnal recovery and age-weighted overheating hours.",
      },
      {
        title: "Rules first, then AI",
        problem: "An LLM on its own can recommend retrofits that don't fit the room.",
        decision: "Rules filter out strategies that don't apply, then the LLM writes a plain-language diagnosis and the top three retrofits for each room.",
      },
    ],
    outcome: [
      "A working tool with urban and building layers, demonstrated on a real Barcelona scenario, plus a unit-scale layer planned for residents using a single panorama photo.",
      "Built for municipalities, the Barcelona Housing Consortium, public health agencies, architects, retrofit agencies and residents. The project received the Best Thesis Award.",
    ],
    reflection: [
      "Next: finish integrating the unit-scale layer, so residents' own homes feed real conditions back into the city's vulnerability model.",
    ],
    links: [{ label: "Code on GitHub", href: "https://github.com/helios0007/HVRA" }],
  },
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
      "I was a tool developer on a team of four. I built the image segmentation step, which reads a façade photo and turns it into the inputs the rest of the tool depends on: window-to-wall ratio, shading, vegetation and façade material. I also put together the presentation.",
      "Team: Nithik Vairamuthu, Rashi Desadla, Rim Choufani, Seid Burka. Faculty: Marita Georganta, with faculty assistants Akshay Madapura and Salvador Cantuarias.",
    ],
    pipeline: [
      {
        label: "Input",
        nodes: [
          { id: "photo", title: "Façade photo" },
          { id: "info", title: "Building details", detail: "4-step questionnaire" },
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
      "A 7-section PDF report, in about 60 seconds.",
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
        decision: "Five weighted categories with research-based defaults (envelope & energy 30%, orientation 20%, renewables 20%, passive design 15%, environmental impact 15%) that users can adjust.",
      },
      {
        title: "Transparent rules over a black box",
        problem: "A feasibility score has to be explainable, not just a number.",
        decision: "135 readable rules. Existing PV panels score high; a tall, north-facing, poorly insulated building in a cold climate scores very low.",
      },
    ],
    outcome: [
      "A working web tool. The user fills in a 4-step questionnaire with a façade photo and their chosen weights, waits about 60 seconds, and downloads a 7-section feasibility report.",
      "Every building analysed is logged to a shared dataset. Over time this builds a record that can support neighbourhood- and city-scale analysis of retrofit and demolition needs, for urban planning and policy.",
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
        "Window-to-wall ratio depends on the photo's perspective: the same façade measured 45% WWR and 17.5% shading in one image, and 39.7% and 18.8% in another.",
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
    hook: "A perception-driven, closed-loop robotic system that detects cracks, repairs them with robotic 3D printing, and verifies the result.",
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
      { label: "Verify", nodes: [{ id: "check", title: "Re-scan & check" }] },
    ],
    process: [
      "A camera captures the cracked timber surface.",
      "A custom-trained YOLO segmentation model masks each crack.",
      "Each mask is reduced to a centreline, then to target points for the toolpath.",
      "ROS 2 drives a UR10 that fills the crack by robotic 3D printing.",
      "The robot checks the repair, closing the loop.",
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
        decision: "A small Flask server exposes the YOLO model over HTTP, so Grasshopper can request crack masks and turn their centrelines into targets for the Robots plug-in.",
      },
      {
        title: "A synthetic fallback for testing",
        problem: "Losing the camera stopped the entire pipeline.",
        decision: "A synthetic input lets each stage be tested in isolation.",
      },
    ],
    outcome: [
      "Repairman Stack v1.0: a decision-visible robotic repair system, tested in RViz simulation and on a real UR10.",
      "The same crack detection also runs in Rhino/Grasshopper through the Flask bridge.",
    ],
    modelCard: {},
    reflection: [
      "Integration is a system discipline. Code can be correct and the motion still wrong: a 180° base-yaw mismatch broke IK alignment, simulated arm kinematics differ from the real UR10, and corner calibration was mandatory before trusting the workspace.",
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
      "When a neighbourhood is lost, as in the Pacific Palisades fire, AI reconstruction fills the gaps with generic street patterns and idealised, Western-centric styles. Planners end up deciding on false geometry, and neighbourhoods lose their identity.",
      "Chronoscape tests a hypothesis: adding memory to 3D reconstruction gives more contextual richness and spatial coherence than image-only or text-only models.",
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
      "A location enhancer adds the real neighbourhood, with a web-search fallback, so the model doesn't invent generic streets.",
      "Gemini (Nano Banana) renders street and drone views; a memory manager keeps each resident's images consistent.",
      "Many residents' stories converge into one collective streetscape of the rebuilt neighbourhood.",
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
      "The dataset so far: 250 user-uploaded context images, 13 resident narratives and 82 architectural elements.",
    ],
    links: [{ label: "Code on GitHub", href: "https://github.com/helios0007/CHRONOSCAPE" }],
    reflection: [
      "Memory-based reconstruction is not about geometric accuracy. It is about recovering the semantic and spatial information that cameras cannot capture.",
    ],
  },
  {
    slug: "pressure-chamber",
    title: "Pressure Chamber",
    hook: "An interactive installation for Barcelona, World Capital of Architecture 2026, where visitors try to out-prompt an AI image generator and discover its biases first-hand.",
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
    hook: "An interactive tabletop installation: visitors build a small building scenario with tracked pucks and see its carbon, labour, time and cost projected back onto the table.",
    year: "2026",
    status: "Completed",
    tags: ["Installation", "Human-in-the-loop", "Construction LCA"],
    spreads: [],
    featured: true,

    team: "Data, UI & workflows · team of 6, IAAC MRAC + MaAI",
    duration: "6 weeks",
    keyResult: "Three construction methods compared live at a table, every number a sourced range",
    stack: ["TouchDesigner", "Python", "OpenCV ArUco", "ESP32 + RFID", "Projection mapping", "Rhino + Grasshopper"],

    contextStats: [
      { value: "3", label: "construction methods: masonry, 3D-printed, prefab" },
      { value: "5", label: "construction phases, foundation to finishing" },
      { value: "10", label: "tracked pucks to draw the footprint" },
      { value: "47", label: "cited data sources behind the numbers" },
    ],
    context: [
      "A construction method's consequences (carbon, labour, time and cost) are usually locked in long before anyone sees them, and then only in expert reports.",
      "This installation makes them legible in the moment of choosing, at a physical table, for non-experts, with the data shown as honest ranges rather than falsely precise single figures.",
    ],
    role: [
      "I worked on data gathering, the projected UI, the presentation, and the workflows that connect the system.",
      "Team: Leo, Elias, Rafik, Seid, Onur, Nithik. Course: Hardware III, Human in the Loop: Interactive Systems.",
    ],
    pipeline: [
      { label: "Method", nodes: [{ id: "rfid", title: "Place a method model" }] },
      { label: "Footprint", nodes: [{ id: "pucks", title: "Arrange the pucks" }] },
      { label: "Configure", nodes: [{ id: "height", title: "Height & material" }] },
      { label: "Phases", nodes: [{ id: "phases", title: "Five construction phases" }] },
      { label: "Compare", nodes: [{ id: "compare", title: "Methods side by side" }] },
    ],
    process: [
      "Visitors place an RFID-tagged model of a method on the pedestal: masonry, 3D-printed or prefab.",
      "They arrange ten ArUco pucks into a footprint; an overhead camera and OpenCV track them.",
      "A slider sets the building height, the material logic is chosen, and the scenario is validated.",
      "The table steps through foundation, structure, roof, openings and finishing, projecting each phase's carbon, labour, time and cost.",
      "A comparison view sets the chosen method against the others.",
    ],
    problems: [
      {
        title: "Honest ranges, not single numbers",
        problem: "Construction data varies widely between sources and contexts.",
        decision: "Every metric is a low–high range with its source and confidence tier, drawn from EPDs, the BEDEC Catalonia cost database and peer-reviewed studies.",
      },
      {
        title: "Hands on the table, not a screen",
        problem: "Non-experts rarely engage with life-cycle spreadsheets.",
        decision: "Visitors configure the building with their hands, using method models, tracked pucks and a height slider, and the feedback is projected straight onto the table.",
      },
      {
        title: "A state model that survives a live room",
        problem: "An installation can break in many ways: a lost camera, a misplaced puck, an operator reset.",
        decision: "A layered state machine in TouchDesigner wraps the visitor flow in calibration, error, reset and manual-override states, with colour-coded feedback.",
      },
    ],
    outcome: [
      "Presented at the IAAC final critique on 22 May 2026, comparing masonry, 3D-printed and prefab construction in a Catalan context.",
    ],
    links: [{ label: "Code on GitHub", href: "https://github.com/Leonardboeker/Hardware_III" }],
  },
  {
    slug: "pawlytics",
    title: "Pawlytics",
    hook: "A pet health monitoring app that learns each pet's baseline, adds breed risk, and tells owners clearly when a change is worth a vet visit.",
    year: "2026",
    status: "MVP",
    tags: ["Full-stack App", "Health Monitoring", "3D Web"],
    spreads: [],
    featured: true,

    team: "Solo developer · personal project",
    duration: "",
    keyResult: "Daily logs turned into a 0–100 health score with clear Monitor / Vet soon / Urgent guidance",
    stack: ["React", "TypeScript", "Three.js", "Recharts", "FastAPI", "PostgreSQL", "SQLAlchemy"],

    context: [
      "Changes in a pet's eating, sleep or activity are gradual and easy to miss, and owners rarely know when a change is worth a vet visit.",
      "Pawlytics is built for monitoring, not diagnosis: it compares each pet with its own baseline and gives clear, explainable guidance on when to act.",
    ],
    role: [
      "I did the complete development: the FastAPI backend and PostgreSQL data model, the rules-based health engine, and the React front end with its 3D pet avatar.",
    ],
    pipeline: [
      { label: "Log", nodes: [{ id: "log", title: "Daily health log" }] },
      { label: "Baseline", nodes: [{ id: "base", title: "Compare with own average" }] },
      { label: "Breed risk", nodes: [{ id: "breed", title: "Known breed conditions" }] },
      { label: "Triage", nodes: [{ id: "triage", title: "Score & urgency" }] },
      { label: "Explain", nodes: [{ id: "explain", title: "Plain-language guidance" }] },
    ],
    process: [
      "Owners log food, sleep, activity, weight and symptoms each day.",
      "Today is compared with the pet's 30-day average; an activity drop over 30% or a weight change over 5% is flagged.",
      "Breed prevalence data from VetCompass and OFA adds context for known conditions.",
      "A rule tree sorts symptoms into Monitor, Vet soon or Urgent, and a weighted score from 0 to 100 sums it up.",
      "A plain-language explanation, a 30-day trend, and a 3D avatar that reflects the pet's health state.",
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
        decision: "A transparent rules engine with template-based explanations first; lightweight ML once enough logs exist.",
      },
      {
        title: "Health you can see",
        problem: "Numbers alone don't keep owners engaged day to day.",
        decision: "A 3D avatar of the pet, built with Three.js, reflects its health state next to the score and trend.",
      },
    ],
    outcome: [
      "A working full-stack MVP: accounts, a 3-step pet onboarding, daily logging, health score and triage, a breed-risk panel and 30-day trends, behind a documented REST API.",
    ],
    links: [{ label: "Code on GitHub", href: "https://github.com/helios0007/PAWLYTICS" }],
    reflection: [
      "Next: wearable integration, lightweight anomaly detection once logs accumulate, and vet clinic integrations.",
    ],
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
