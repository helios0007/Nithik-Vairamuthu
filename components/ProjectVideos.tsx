// Short project videos, one per block, with a caption. Nothing downloads until the visitor
// presses play (preload="metadata" only fetches the first frame and the length).

import type { ProjectVideo } from '../data/projects'

export default function ProjectVideos({ videos }: { videos: ProjectVideo[] }) {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      {videos.map((v) => (
        <figure key={v.src}>
          <video
            controls
            playsInline
            preload="metadata"
            aria-label={v.title}
            className="aspect-video w-full rounded-lg border border-line bg-paper-2"
          >
            <source src={v.src} type="video/mp4" />
          </video>
          <figcaption className="mt-3 text-sm leading-6 text-muted">
            <span className="text-ink">{v.title}</span>
            {v.caption && <> · {v.caption}</>}
          </figcaption>
        </figure>
      ))}
    </div>
  )
}
