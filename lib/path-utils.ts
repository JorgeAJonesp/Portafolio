/**
 * Helper para generar rutas correctas en GitHub Pages
 */
export function getImagePath(imagePath: string): string {
  // Remover la barra inicial si existe
  const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
  
  // En producción, añadir el basePath para GitHub Pages
  if (process.env.NODE_ENV === 'production') {
    return `/Portafolio/${cleanPath}`;
  }
  
  // En desarrollo, usar la ruta normal
  return `/${cleanPath}`;
}

export function getBasePath(): string {
  return process.env.NODE_ENV === 'production' ? '/Portafolio' : '';
}