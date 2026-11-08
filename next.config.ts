import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    // 90 is used for portfolio spreads so small text and linework stay sharp
    qualities: [75, 90],
  },
  async redirects() {
    return [
      // Short link to put on the CV and LinkedIn (/portfolio is a page)
      { source: '/cv', destination: '/Nithik-Resume.pdf', permanent: false },
    ]
  },
}

export default nextConfig
