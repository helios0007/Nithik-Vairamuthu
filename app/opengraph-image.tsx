import { ogImage, ogSize } from '../lib/og'

export const alt = 'Nithik Vairamuthu — architect and computational designer'
export const size = ogSize
export const contentType = 'image/png'

export default function Image() {
  return ogImage({
    eyebrow: 'Architect · Computational designer · AI for the built environment',
    title: 'Hi, I’m Nithik.',
    subtitle:
      'I keep asking how we’ll live tomorrow, on Earth and maybe beyond it. Then I build the tools to help find out.',
  })
}
