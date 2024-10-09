/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'zgukhjdutmmrcxpattxr.supabase.co',
      },
    ],
  },
};

export default nextConfig;
