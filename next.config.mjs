/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "flagpedia.net",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
