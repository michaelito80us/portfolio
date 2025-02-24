import type { NextConfig } from 'next';
import withBundleAnalyzer from '@next/bundle-analyzer';

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const config: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Enable Turbopack
  turbo: {
    rules: {
      // Add any custom Turbopack rules here
    },
  },
  // Performance optimizations
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['@heroicons/react', '@radix-ui/react-icons'],
    // Enable modern webpack features through Turbopack
    turbo: {
      loaders: {
        // Add any custom loaders here
      },
    },
  },
};

export default bundleAnalyzer(config);
