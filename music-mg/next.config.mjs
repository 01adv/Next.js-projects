/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        domains: ['images.unsplash.com']
    }
};

export default nextConfig;

// new pattern
// images: {
//   remotePatterns: [
//     {
//       protocol: 'https',
//       hostname: 'assets.example.com',
//       port: '',
//       pathname: '/account123/**',
//     },
//   ],
// },