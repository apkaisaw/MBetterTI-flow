/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true
  },
  images: {
    domains: ['i.pravatar.cc', 'source.unsplash.com', 'avatars.dicebear.com'],
    unoptimized: true
  },
  typescript: {
    ignoreBuildErrors: true
  },
  generateBuildId: () => 'build-' + new Date().getTime()
}

module.exports = nextConfig
