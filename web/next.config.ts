import type { NextConfig } from "next";

// Where the Express API lives. The browser never calls it directly: every request goes to
// /api/* on this origin and Next.js forwards it, so the auth cookie stays first-party.
const apiUrl = process.env.API_URL ?? "http://localhost:4000";

const nextConfig: NextConfig = {
  async rewrites() {
    return [{ source: "/api/:path*", destination: `${apiUrl}/:path*` }];
  },
};

export default nextConfig;
