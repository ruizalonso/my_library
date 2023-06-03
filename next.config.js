/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    // serverActions: true,
    serverComponentsExternalPackages: ['mongoose', 'bcryptjs'],
  },
  images: {
    domains: [
      'images.unsplash.com',
      'images.cdn1.buscalibre.com',
      'images.cdn2.buscalibre.com',
      'images.cdn3.buscalibre.com',
      'planetadelibrosco5.cdnstatics.com',
      'planetadelibroscom.cdnstatics2.com',
    ],
  },
}

module.exports = nextConfig
