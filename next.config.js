/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  // Only use rewrites in development
  ...(process.env.NODE_ENV === 'development' && {
    async rewrites() {
      return [
        {
          source: '/api/:path*',// 表示匹配所有以 /api/ 开头的路径，并将路径的其余部分捕获为 :path* 参数。
          destination: `${process.env.NEXT_PUBLIC_API_URL}/:path*` // 重定向到后端服务器
        }
      ]
    }
  })
};

module.exports = nextConfig;