import type { NextConfig } from "next";
import withNextIntl from "next-intl/plugin";
const nextConfig: NextConfig = {
  /* config options here */
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  experimental: {
    turbo: {
      rules: {
        // 配置 SVG 处理规则
        "*.svg": {
          loaders: ["@svgr/webpack"],
          as: "react",
        },
      },
    },
  },
};

export default withNextIntl()(nextConfig);
