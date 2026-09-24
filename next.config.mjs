/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'plus.unsplash.com', 'www.jeevanchetnafoundation.org'],
    unoptimized: true,
  },
};

export default nextConfig;
