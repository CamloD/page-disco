export function getAssetPath(path) {
    // Asegúrate de que esto coincida con la configuración de tu proyecto en GitHub Pages
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
    return `${basePath}/${path.replace(/^\//, '')}`;
  }
  
  