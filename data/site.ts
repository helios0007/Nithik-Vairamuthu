// Personal links and CV content used across the site.

export const links = {
  email: 'v.nitik@gmail.com',
  linkedin: 'https://www.linkedin.com/in/nithik-vairamuthu-ba019543',
  github: 'https://github.com/helios0007',
  resume: '/Nithik-Resume.pdf',
  flipbook: 'https://heyzine.com/flip-book/0bcd06bf33.html',
}

export type CvItem = {
  label: string // small line above the title (type of role, or dates)
  title: string
  detail: string
  when?: string
}

export const experience: CvItem[] = [
  {
    label: 'Architecture',
    title: 'Architectural Internship',
    detail: 'Iinfinity Architects, Chennai — commercial, residential, and project documentation workflows.',
    // TODO(owner): confirm these dates — they overlap with IAAC.
    when: 'Dec 2022 – May 2026',
  },
  {
    label: 'Workshop',
    title: 'VAP Parametric Workshop',
    detail: 'VIT University, Vellore — parametric modelling, fabrication, and furniture design.',
  },
  {
    label: 'Tutor',
    title: 'Parametric Workshop',
    detail: 'Mysore School of Architecture — assisted in organising and conducting a 3-day parametric workshop.',
  },
]

export const education: CvItem[] = [
  {
    label: 'Oct 2025 – Jul 2027',
    title: 'Institute for Advanced Architecture of Catalonia (IAAC)',
    detail: "Master's in AI for Architecture and the Built Environment",
  },
  {
    label: 'Oct 2025 – Present',
    title: 'EADA Business School',
    detail: 'Business Strategist, Business Administration and Management',
  },
  {
    label: 'Vellore',
    title: 'Vellore Institute of Technology',
    detail: 'Bachelor of Architecture (B.Arch)',
  },
]

export const skills: { group: string; items: string[] }[] = [
  {
    group: 'AI / Vision',
    items: ['Python', 'PyTorch', 'OpenCV', 'SAM', 'Image Segmentation', 'Regression Models', 'Stable Diffusion'],
  },
  {
    group: 'Design / Spatial',
    items: ['Grasshopper', 'Rhino', 'Computational Design', 'Parametric Design', 'Architecture', 'Adaptive Environments'],
  },
  {
    group: 'Hardware / Systems',
    items: ['Arduino', 'ESP32', 'Sensor Integration', 'Strategic Thinking', 'Systems Design'],
  },
]

export const publications = [
  {
    when: 'Nov 2025',
    title: 'Computational Study of Origami Inspired Geometries in Lunar Habitations',
    venue: 'Presented at the ZMECH Conference — VIT Vellore.',
    href: '/projects/lunar/origami-lunar-habitations.pdf',
    projectSlug: 'lunar-habitations',
  },
]
