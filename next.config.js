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
    ],
  },
  experimental: {
    serverActions: true, // Devolvendo a vida pro seu checkout e pro nosso modal!
  },
};

module.exports = nextConfig;
