/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true, // Este es el modo estricto de React
	swcMinify: true, // Usar SWC para minimizar el código
	output: 'export', // Si estás utilizando el modo de exportación estática
	experimental: {
	  appDir: true, // Habilitar el enrutamiento de la carpeta app
	},
	basePath: process.env.NODE_ENV === 'production' ? '/page-disco' : '',
	assetPrefix: process.env.NODE_ENV === 'production' ? '/page-disco/' : '',
	images: {
		domains: ['picsum.photos'],
		unoptimized: true,
	},
};

export default nextConfig;
