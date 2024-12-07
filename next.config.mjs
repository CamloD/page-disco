/** @type {import('next').NextConfig} */
const nextConfig = {
	 /*output: 'export', */
	 basePath: process.env.NODE_ENV === 'production' ? '/page-disco' : '',
	 assetPrefix: process.env.NODE_ENV === 'production' ? '/page-disco/' : '',
	 images: {
		domains: ['picsum.photos'],
		unoptimized: true,
	  },
};

export default nextConfig;
