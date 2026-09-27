/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Keep Prisma out of the webpack/turbopack bundle
  serverExternalPackages: ['@prisma/client', 'prisma'],
  // Ensure the Query Engine binary is included in the Vercel serverless function
  outputFileTracingIncludes: {
    '/api/**/*': ['./node_modules/.prisma/client/**/*'],
    '/*': ['./node_modules/.prisma/client/**/*'],
  },
  images: {
    domains: ['images.unsplash.com', 'plus.unsplash.com', 'www.jeevanchetnafoundation.org'],
    unoptimized: true,
  },
};

export default nextConfig;
