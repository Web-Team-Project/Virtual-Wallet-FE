/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['t4.ftcdn.net', 'lh3.googleusercontent.com'],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8000/api/:path*', // Ensure this matches your FastAPI URL
      },
    ];
  },
};

export default nextConfig;