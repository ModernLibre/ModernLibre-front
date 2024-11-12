/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  // Only use rewrites in development
  async rewrites() {
    const source = `/${process.env.API_BASE_URL}/:path*`;
    const destination = `${process.env.NEXT_PUBLIC_API_URL}/:path*`;

    console.log('Rewrites source:', source);
    console.log('Rewrites destination:', destination);

    return [
      {
        source, // 表示匹配所有以 /api/ 开头的路径，并将路径的其余部分捕获为 :path* 参数。
        destination // 重定向到后端服务器
      }
    ];
  }
};

module.exports = nextConfig;