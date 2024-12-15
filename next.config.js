/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    loader: 'custom',
    loaderFile: './imageLoader.js',
  },
  eslint: false,
}

module.exports = nextConfig
