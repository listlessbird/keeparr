const {
  withHydrationOverlay,
} = require("@builder.io/react-hydration-overlay/next")

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  async rewrites() {
    return [
      {
        source: "/api/v1/:slug*",
        destination: "http://localhost:3001/:slug*",
      },
    ]
  },
}

module.exports = withHydrationOverlay({
  appRootSelector: "main",
})(nextConfig)
