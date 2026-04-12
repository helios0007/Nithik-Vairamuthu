export type Project = {
  slug: string
  title: string
  description: string
  tags: string[]
  cover?: string        // main card thumbnail
  spreads?: string[]    // multiple spread images
  year?: string
  status?: string
  link?: string
    downloadFile?: string
  downloadLabel?: string
}

export const projects: Project[] = [
  {
    slug: "chronoscape",
    title: "Chronoscape",
    description:
      "Memory-based urban regeneration using AI. Focuses on the LA Wildfires — reconstructing architectural memory through neural radiance fields, generative imagery, and spatial storytelling.",
    tags: ["NeRF", "Generative AI", "Urban Regeneration", "Python"],
    cover: "/projects/chronoscape/cover.jpg",
    spreads: [
      "/projects/chronoscape/CHRONOSCAPE_SPREAD.png",
    ],
    year: "2025",
    status: "Completed",
  },
  {
    slug: "crack-detection",
    title: "Crack Detection & Robotic Repair",
    description:
      "Computer vision pipeline using YOLOv8 segmentation to detect structural cracks and generate robotic repair pathways.",
    tags: ["YOLOv8", "Computer Vision", "ROS2", "Python"],
    cover: "/projects/crack-detection/cover.jpg",
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
    tags: ["Computational Design", "Grasshopper", "Rhino", "Publication"],
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
