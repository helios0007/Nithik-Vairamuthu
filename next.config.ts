import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    // 90 is used for portfolio spreads so small text and linework stay sharp
    qualities: [75, 90],
  },
  async redirects() {
    return [
      // Short links to put on the CV, PDF portfolio and LinkedIn
      { source: '/cv', destination: '/Nithik-Resume.pdf', permanent: false },
      { source: '/portfolio', destination: 'https://heyzine.com/flip-book/51770bf3b0.html', permanent: false },
    ]
  },
}

export default nextConfig
