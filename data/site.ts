// Personal links and CV content used across the site.

// Change this when a custom domain is connected.
export const siteUrl = 'https://nithik-vairamuthu.vercel.app'

export const links = {
  email: 'v.nitik@gmail.com',
  linkedin: 'https://www.linkedin.com/in/nithik-vairamuthu-ba019543',
  github: 'https://github.com/helios0007',
  resume: '/Nithik-Resume.pdf', // also reachable at the short link /cv
  flipbook: 'https://heyzine.com/flip-book/51770bf3b0.html', // also at /portfolio
}

// Shown in the hero and the contact section. Leave a field empty ('') to hide it;
// empty fields show as "To fill in" boxes in `npm run dev`.
export const availability = {
  lookingFor: 'Internships in computational design and AI for the built environment',
  start: '', // e.g. 'From February 2027'
  duration: '', // e.g. '6 months'
  location: 'Based in Barcelona',
  relocation: '', // e.g. 'Open to relocating within Europe'
  languages: 'English (fluent) · Tamil (native)', // consider adding CEFR levels, e.g. Spanish A2
  permit: '', // only after confirming with IAAC — e.g. 'Student permit (Spain); can work as an intern'
  updated: 'October 2026',
}

export type CvItem = {
  label: string // small line above the title (type of role, or dates)
  title: string
  detail: string
  when?: string
}

export const experience: CvItem[] = [
  {
    label: 'Teaching',
    title: 'Teaching Assistant',
    detail: "IAAC, Barcelona — teaching assistant for computational design to first year Master's in AI students.",
    // TODO(owner): add the dates.
  },
  {
    label: 'Architecture',
    title: 'Architectural Internship',
    detail: 'Iinfinity Architects, Chennai — commercial, residential, and project documentation workflows.',
    // TODO(owner): confirm these dates — they overlap with IAAC.
    when: 'Dec 2022 – May 2026',
  },
  {
    label: 'Tutor',
    title: 'Computational Design Workshop',
    detail: 'Mysore School of Architecture — conducted a 3 day computational design workshop.',
  },
  {
    label: 'Workshop',
    title: 'AI Workshop',
    detail: 'VIT University, Vellore.',
    when: 'Aug 2026',
    // TODO(owner): say whether you led it.
  },
  {
    label: 'Workshop',
    title: 'VAP Parametric Workshop',
    detail: 'VIT University, Vellore — parametric modelling, fabrication, and furniture design.',
  },
]

export const education: CvItem[] = [
  {
    label: 'Oct 2025 – Jul 2027',
    title: 'Institute for Advanced Architecture of Catalonia (IAAC)',
    detail: "Master's in AI for Architecture and the Built Environment · Merit scholarship, 2025",
  },
  {
    label: 'Oct 2025 – Present',
    title: 'EADA Business School',
    detail: 'Business Strategist, Business Administration and Management',
  },
  {
    label: 'Vellore',
    title: 'Vellore Institute of Technology',
    detail: 'Bachelor of Architecture (B.Arch) · CGPA 8.80 / 10 · University rank holder, B.Arch',
  },
]

export const skills: { group: string; items: string[] }[] = [
  {
    group: 'AI & Vision',
    items: ['Python', 'PyTorch', 'OpenCV', 'SAM', 'SegFormer', 'YOLOv8', 'CLIP', 'MediaPipe', 'Stable Diffusion', 'Regression Models'],
  },
  {
    group: 'Computational Design',
    items: ['Grasshopper', 'Rhino', 'Speckle', 'TouchDesigner', 'Parametric Design', 'Adaptive Environments'],
  },
  {
    group: 'Software',
    items: ['React', 'TypeScript', 'FastAPI', 'Flask', 'PostgreSQL', 'Three.js'],
  },
  {
    group: 'Hardware & Robotics',
    items: ['Arduino', 'ESP32', 'RFID', 'Sensor Integration', 'ROS 2', 'UR10', 'Raspberry Pi'],
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
