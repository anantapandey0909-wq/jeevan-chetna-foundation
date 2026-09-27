/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Keep Prisma out of the Next.js serverless bundle so the Query Engine
  // binary (rhel-openssl-3.0.x on Vercel) is available at runtime.
  serverExternalPackages: ['@prisma/client', 'prisma'],
  images: {
    domains: ['images.unsplash.com', 'plus.unsplash.com', 'www.jeevanchetnafoundation.org'],
    unoptimized: true,
  },
};

export default nextConfig;
