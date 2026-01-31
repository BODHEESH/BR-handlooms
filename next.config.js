/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove deprecated appDir option as it's now default in Next.js 13.4+
  // Ensure CSS is properly processed
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

module.exports = nextConfig;
