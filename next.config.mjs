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
  rewrites: async () => {
    return [
      {
        source: "/((?!api/).*)",
        destination: "/static-app-shell",
      },
      {
        source: "/notes/:id",
        destination: "/",
      },
    ]
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
