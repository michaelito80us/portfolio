import type { NextConfig } from 'next';
import withBundleAnalyzer from '@next/bundle-analyzer';

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const config: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Performance optimizations
  experimental: {
    turbo: {
      // Configure Turbopack options
      resolveAlias: {
        // Add any module aliases here if needed
      },
      // Configure file extensions to resolve
      resolveExtensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      // Use rules instead of loaders (which is now deprecated)
      rules: {
        // Example: "*.svg": ['@svgr/webpack', 'url-loader']
      },
    },
  },
};

export default bundleAnalyzer(config);
