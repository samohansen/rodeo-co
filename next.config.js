/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.imgur.com',
      }
    ],
    domains: ['lh3.googleusercontent.com']
  }
}

module.exports = nextConfig
