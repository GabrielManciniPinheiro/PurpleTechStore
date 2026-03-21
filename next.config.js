/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "v0cq2fbscu.ufs.sh",
      },
    ],
  },
  experimental: {
    serverActions: true, // Devolvendo a vida pro seu checkout e pro nosso modal!
  },
};

module.exports = nextConfig;
