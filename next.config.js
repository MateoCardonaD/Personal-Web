/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  trailingSlash: false,
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/',
      },
    ]
  }
}

module.exports = nextConfig


