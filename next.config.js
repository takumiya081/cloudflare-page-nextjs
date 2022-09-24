/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // check on CI
    ignoreBuildErrors: true,
  },
  compiler: {
    emotion: {},
  },
};

module.exports = config;
