/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable experimental features for aggressive memory optimization
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
    optimizeServerReact: true,
    serverMinification: true,
    workerThreads: false,
    esmExternals: true,
  },

  // Server external packages (moved from experimental)
  serverExternalPackages: ['@sanity/client', '@sanity/image-url'],

  // Turbo configuration
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },

  // Memory-optimized image configuration
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
    formats: ['image/webp'],
    deviceSizes: [640, 828, 1200, 1920],
    imageSizes: [32, 64, 128, 256],
    minimumCacheTTL: 300,
    dangerouslyAllowSVG: false,
    unoptimized: false,
    loader: 'default',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Performance optimizations
  poweredByHeader: false,
  compress: true,

  // Output and bundle optimizations for memory efficiency
  output: 'standalone',
  generateEtags: false,
  trailingSlash: false,
  cleanDistDir: true,

  // Aggressive webpack optimizations for ultra-low memory
  webpack: (config, { dev, isServer }) => {
    // Aggressive memory optimization
    config.optimization = {
      ...config.optimization,
      minimize: !dev,
      sideEffects: false,
      removeAvailableModules: true,
      removeEmptyChunks: true,
      mergeDuplicateChunks: true,
      splitChunks: {
        chunks: 'all',
        minSize: 10000,
        maxSize: 50000,
        cacheGroups: {
          default: false,
          vendors: false,
          sanity: {
            name: 'sanity',
            chunks: 'all',
            test: /@sanity/,
            priority: 30,
            enforce: true
          },
          vendor: {
            name: 'vendor',
            chunks: 'all',
            test: /node_modules/,
            priority: 20,
            maxSize: 40000
          },
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            priority: 10,
            reuseExistingChunk: true,
            enforce: true,
            maxSize: 30000
          }
        }
      }
    };

    // Memory-conscious build optimizations
    if (!dev) {
      config.optimization.usedExports = true;
      config.optimization.providedExports = true;
      config.optimization.concatenateModules = true;

      // Reduce memory pressure during build
      config.parallelism = 1;
      config.cache = false;
    }

    // Server-side memory optimizations
    if (isServer) {
      config.externals = [...(config.externals || []), '@sanity/client'];
    }

    return config;
  },

  // Headers for better caching
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
      {
        source: '/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },

  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
}

module.exports = nextConfig