/** @type {import('next').NextConfig} */
const nextConfig = {
	basePath: '/page-disco',
	assetPrefix: '/page-disco',
	/*output: 'export', */
	images: {
	  domains: ['example.com'],
	  unoptimized: true,
	},
  };
  
  export default nextConfig;
  