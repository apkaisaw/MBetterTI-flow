/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true
  },
  images: {
    domains: ['i.pravatar.cc', 'source.unsplash.com'],
    unoptimized: true
  }
}

module.exports = nextConfig
