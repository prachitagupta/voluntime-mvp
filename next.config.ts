import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['avatars.githubusercontent.com', 'randomuser.me'],
  },
  reactStrictMode: true,
};

export default nextConfig;
