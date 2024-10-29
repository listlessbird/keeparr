/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.googleusercontent.com",
      },
    ],
  },
  output: "standalone",
  experimental: {
    // typedRoutes: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

export default nextConfig
