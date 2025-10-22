/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  // Configuración específica para GitHub Pages
  basePath: process.env.NODE_ENV === 'production' ? '/PortafolioJorgeAJones' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/PortafolioJorgeAJones/' : '',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
