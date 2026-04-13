export type Project = {
  slug: string
  title: string
  description: string
  tags: string[]
  cover?: string
  spreads?: string[]
  year?: string
  status?: string
  link?: string
  downloadFile?: string
  downloadLabel?: string
}

export const projects: Project[] = [
  {
    slug: "retrograde",
    title: "Retrograde",
    description:
      "RetroGrade is a tool that rapidly evaluates the early feasibility of sustainable building retrofits, enabling informed retrofit-or-rebuild decisions before significant time and resources are invested.",
    tags: ["Image Segmentation", "Regression Model", "Feasibility Analysis", "Report"],
    cover: "/projects/retrograde/cover.jpg",
    spreads: [
      "/projects/retrograde/RETROGRADE_SPREAD_1.png",
      "/projects/retrograde/RETROGRADE_SPREAD_2.png",
    ],
    year: "2026",
    status: "Completed",
  },
  {
    slug: "chronoscape",
    title: "Chronoscape",
    description:
      "Incorporating memory into 3D reconstruction results in environments that exhibit greater contextual richness and spatial coherence compared to image-only and text-only models",
    tags: ["Image Generation", "Generative AI", "Urban Regeneration", "Memory"],
    cover: "/projects/chronoscape/cover.jpg",
    spreads: [
      "/projects/chronoscape/CHRONOSCAPE_SPREAD.png",
    ],
    year: "2025",
    status: "Completed",
  },
  {
    slug: "crack detection",
    title: "Crack Detection & Robotic Repair",
    description:
      "Computer vision pipeline using YOLOv8 segmentation to detect structural cracks and generate robotic repair pathways.",
    tags: ["YOLOv8", "Computer Vision", "ROS2", "Python"],
    cover: "/projects/crack detection/cover.jpg",
    spreads: [
      "/projects/crack detection/REPAIR_SPREAD.png",
    ],
    year: "2026",
    status: "Completed",
  },
  {
    slug: "lunar-habitations",
    title: "Origami Lunar Habitations",
    description:
      "Computational study of origami-inspired geometries applied to lunar habitat design. Published at ZMECH Conference, VIT Vellore.",
    tags: ["Extra terrestrial", "Grasshopper", "Rhino", "Lunar Architecture"],
    cover: "/projects/lunar/cover.jpg",
    spreads: [
      "/projects/lunar/lunar.png",
    ],
    year: "2025",
    status: "Published",
    downloadFile: "/projects/lunar/origami-lunar-habitations.pdf",
    downloadLabel: "Download Paper",
  },
]
