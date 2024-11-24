import type { Config } from "tailwindcss";

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        // 主题色
        primary: "var(--color-primary)",
        "primary-hover": "var(--color-primary-hover)",
        secondary: "var(--color-secondary)",

        // 背景色
        background: "var(--color-background)",
        "header-background": "var(--color-header-background)",
        "card-background": "var(--color-card-background)",

        // 文本颜色
        text: "var(--color-text)",
        "text-secondary": "var(--color-text-secondary)",

        // 边框和分割线
        divider: "var(--color-divider)",
        border: "var(--color-border)",

        // 按钮状态
        "button-hover": "var(--color-button-hover)",
        "button-active": "var(--color-button-active)",

        // 交易相关颜色
        positive: "var(--color-positive)",
        negative: "var(--color-negative)",

        // 状态颜色
        warning: "var(--color-warning)",
        success: "var(--color-success)",
        error: "var(--color-error)",
      },
      boxShadow: {
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
      },
    },
  },
  plugins: [],
} satisfies Config;
