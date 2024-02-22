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
}

module.exports = withHydrationOverlay({
  appRootSelector: "main",
})(nextConfig)
