import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  // Убираем полифиллы для старых браузеров — целевые браузеры 2021+
  compiler: {
    removeConsole: false,
  },
  images: {
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "dev-mc-backend.citymed12.ru",
      },
    ],
  },
};

export default nextConfig;
