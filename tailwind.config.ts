import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "main-color": "#F7F7F7",
        "header-color": "#3A424C",
        "primary-button-color": "#F1E500",
        "error-message-color": "#FF3F3F",
        "account-name-color": "#B9B9B9",
        "post-color": "#D78E40",
      },
    },
  },
  plugins: [],
};
export default config;
