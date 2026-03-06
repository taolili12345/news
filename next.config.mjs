/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/stories/:series/v:volume/chapters/:chapter',
        destination: '/stories/:series/v:volume/ch:chapter',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
