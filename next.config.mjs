/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "clawacademy.io" }],
        destination: "https://www.clawacademy.io/:path*",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://telegram.org https://oauth.telegram.org https://cdn.jsdelivr.net",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https: blob:",
              "font-src 'self' data: https: https://fonts.reown.com https://fonts.gstatic.com",
              "connect-src 'self' https://*.supabase.co https://*.walletconnect.com https://*.walletconnect.org wss://*.walletconnect.com wss://*.walletconnect.org https://rpc.walletconnect.com https://rpc.walletconnect.org https://pulse.walletconnect.com https://explorer-api.walletconnect.com https://registry.walletconnect.com https://api.telegram.org https://*.reown.com wss://*.reown.com https://explorer-api.reown.com https://api.web3modal.org https://*.web3modal.org https://se.walletconnect.com https://verify.walletconnect.com https://verify.walletconnect.org https://*.coinbase.com https://*.infura.io https://*.alchemy.com https://*.etherscan.io https://*.bscscan.com",
              "frame-src 'self' https://telegram.org https://oauth.telegram.org https://verify.walletconnect.com https://verify.walletconnect.org https://secure.walletconnect.com https://*.coinbase.com",
              "worker-src 'self' blob: 'unsafe-eval'",
              "script-src-elem 'self' 'unsafe-inline' https://telegram.org https://oauth.telegram.org https://cdn.jsdelivr.net",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
