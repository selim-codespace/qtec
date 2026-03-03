import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#4640DE",
                secondary: "#26A4FF",
                "primary-light": "#E9EBFD",
                "neutral-100": "#F8F8FD",
                "neutral-200": "#D6DDEB",
                "neutral-300": "#7C8493",
                "neutral-400": "#252733",
                "neutral-500": "#111111",
            },
            fontFamily: {
                sans: ["Inter", "sans-serif"],
                clash: ["Clash Display", "sans-serif"],
            },
        },
    },
    plugins: [],
};
export default config;
