/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['i.ibb.co', 'lh3.googleusercontent.com', 'avatars.githubusercontent.com', 'i.postimg.cc'],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://virtual-wallet-87bx.onrender.com/api/:path*',
      },
    ];
  },
};

export default nextConfig;