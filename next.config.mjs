/** @type {import('next').NextConfig} */
const nextConfig = {
	basePath: '/mi-app',
	assetPrefix: '/mi-app',
	/*output: 'export', */
	images: {
	  domains: ['example.com'],
	  unoptimized: true,
	},
  };
  
  export default nextConfig;
  