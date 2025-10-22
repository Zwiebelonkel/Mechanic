/** @type {import('next').NextConfig} */
const nextConfig = {
  // Build a standalone server output suitable for Docker/Cloud Run
  output: 'standalone',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
