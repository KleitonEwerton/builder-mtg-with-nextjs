// next.config.mjs
import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.resolve.alias['@styles'] = path.resolve('./styles');
    return config;
  },
};

export default nextConfig;
