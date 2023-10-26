import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./node_modules/flowbite-react/**/*.js",
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
        darkBg: "#1E262C",
        darkSidebarBg: "#1E262C",
        darkNavbarBg: "#1D1D1D",
        TealGreen: "#128C7E",
        TealGreenDark: "#075E54",
        LightGreen: "#25D366",
        Blue: "#34B7F1",
      },
      minHeight: {
        rootLayoutContainerHeight: "calc(100vh - 48px)",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
export default config;
