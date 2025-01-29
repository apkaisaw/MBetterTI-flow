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
  generateBuildId: () => 'build-' + new Date().getTime(),
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    return config;
  },
  experimental: {
    serverActions: true,
  },
}

module.exports = nextConfig
