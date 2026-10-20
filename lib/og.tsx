import { ImageResponse } from 'next/og'

// Shared look for link-preview images (LinkedIn, email, WhatsApp…): charcoal card, big title, blue accent.
export const ogSize = { width: 1200, height: 630 }

// Trim long text at a word boundary so previews never end mid-word.
function shorten(text: string, max: number) {
  if (text.length <= max) return text
  const cut = text.slice(0, max)
  return cut.slice(0, cut.lastIndexOf(' ')).replace(/[,;:—-]$/, '') + '…'
}

export function ogImage({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          background: '#111214',
          color: '#ededed',
          borderBottom: '16px solid #6e8bff',
        }}
      >
        <div style={{ fontSize: 30, color: '#6e8bff', fontWeight: 700 }}>{eyebrow}</div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: title.length > 24 ? 76 : 96, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2 }}>
            {title}
          </div>
          <div style={{ marginTop: 28, fontSize: 34, lineHeight: 1.35, color: '#a1a6b0', maxWidth: 1000 }}>
            {shorten(subtitle, 140)}
          </div>
        </div>
        <div style={{ fontSize: 26, color: '#a1a6b0' }}>nithik-vairamuthu.vercel.app</div>
      </div>
    ),
    ogSize
  )
}
