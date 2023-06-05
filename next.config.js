const { withContentlayer } = require('next-contentlayer');
const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config) => {
    // 기존에 있던 alias 설정
    config.resolve.alias['@fonts'] = path.join(__dirname, 'public/fonts');

    // 새로 추가된 SVG 설정
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"]
    });

    return config;
  },
};

module.exports = withContentlayer(nextConfig);
