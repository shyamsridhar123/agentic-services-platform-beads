/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Base path is set for GitHub Pages deployment
  // Set NEXT_PUBLIC_BASE_PATH env var to override (e.g., /agentic-services-platform-beads)
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
}

export default nextConfig
