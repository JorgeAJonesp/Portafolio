export default function myImageLoader({ src, width, quality }) {
  // Para GitHub Pages, las rutas necesitan ser relativas
  // Si estamos en desarrollo, usamos la ruta normal
  if (process.env.NODE_ENV === 'development') {
    return src
  }
  
  // En producción (GitHub Pages), asegurar que la ruta sea correcta
  if (src.startsWith('/')) {
    // Si hay un basePath configurado automáticamente por GitHub Actions, lo respeta
    return src
  }
  
  return src
}