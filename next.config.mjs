/** @type {import('next').NextConfig} */
const nextConfig = { images: {
    domains: ['utfs.io',"images.unsplash.com"],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'utfs.io',
        port: ''
      }
    ]
  }};

export default nextConfig;
