/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'zgukhjdutmmrcxpattxr.supabase.co',
      },
      {
        protocol: 'https',
        hostname: `${process.env.AWS_S3_BUCKET}.s3.eu-central-1.amazonaws.com`,
      },
      {
        protocol: 'https',
        hostname: 'ib-project-assets.s3.eu-central-1.amazonaws.com'
      }
    ],
  },
};

export default nextConfig;
