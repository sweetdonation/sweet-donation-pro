import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}","./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        honey: "#F6C86E",
        cream: "#FFF8ED",
        moss: "#7E8B69",
        wood: "#5B3A29",
        ink: "#1A1A1A"
      },
      boxShadow: {
        soft: "0 10px 24px rgba(0,0,0,0.06)"
      },
      fontFamily: {
        sans: ["ui-sans-serif","system-ui","-apple-system","Segoe UI","Roboto","Inter","sans-serif"],
        serif: ["ui-serif","Georgia","serif"]
      }
    }
  },
  plugins: []
};
export default config;
