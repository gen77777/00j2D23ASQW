import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  output: "standalone",
  trailingSlash: true,
  // sharp ships a native binary that output file tracing can miss in standalone builds —
  // see node_modules/next/dist/docs/.../output.md.
  outputFileTracingIncludes: {
    "/*": ["node_modules/sharp/**/*"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
