/** @type {import('next').NextConfig} */
const nextConfig = {
	basePath: '/page-disco',  
	assetPrefix: '/page-disco',
	images: {
	  domains: ['picsum.photos'], 
	  unoptimized: true, 
	},
  };
  
  export default nextConfig;
  