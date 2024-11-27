/** @type {import('next').NextConfig} */
const nextConfig = {
	basePath: process.env.NEXT_PUBLIC_BASE_PATH,
	assetPrefix: '/page-disco',
	/*output: 'export', */
	images: {
	  domains: ['example.com'],
	  unoptimized: true,
	},
  };
  
  export default nextConfig;
  