import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['s.headshots.fun','images.pexels.com'], // 添加你的图片域名
  },
};

export default withNextIntl(nextConfig);