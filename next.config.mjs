/** @type {import('next').NextConfig} */
const nextConfig = {
	output: 'export', // Esto indica que usarás exportación estática
	experimental: {
		staticPageGenerationTimeout: 60, // Esto le da más tiempo para generar las páginas estáticas si tienes muchas
	},
	basePath: process.env.NODE_ENV === 'production' ? '/page-disco' : '',
	assetPrefix: process.env.NODE_ENV === 'production' ? '/page-disco/' : '',
	images: {
		domains: ['picsum.photos'],
		unoptimized: true,
	},
};

export default nextConfig;
