/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
        // External domains allowed for images
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'via.placeholder.com',
                port: '',
                pathname: '/**',
            },
        ],
        // Image formats to optimize
        formats: ['image/avif', 'image/webp'],
        // Device sizes for responsive images
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        // Image sizes for different breakpoints
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        // Enable built-in optimization
        minimumCacheTTL: 31536000, // 1 year
        // Disable static imports for better performance
        dangerouslyAllowSVG: true,
        contentDispositionType: 'attachment',
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    },
    // Enable experimental features for better performance
    experimental: {
        optimizePackageImports: ['lucide-react'],
    },
};



module.exports = nextConfig;