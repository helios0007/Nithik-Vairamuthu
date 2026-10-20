import { links } from '../data/site'

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-10 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <span>© {new Date().getFullYear()} Nithik Vairamuthu · Barcelona</span>
        <div className="flex gap-5">
          <a href={`mailto:${links.email}`} className="hover:text-ink">Email</a>
          <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-ink">LinkedIn</a>
          <a href={links.github} target="_blank" rel="noopener noreferrer" className="hover:text-ink">GitHub</a>
        </div>
      </div>
    </footer>
  )
}
