/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        fluidSmall: "repeat(auto-fit, minmax(10rem, 1fr))",
        fluidMedium: "repeat(auto-fit, minmax(15rem, 1fr))",
        fluid: "repeat(auto-fit, minmax(20rem, 1fr))",
        fluidLarge: "repeat(auto-fit, minmax(25rem, 1fr))",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
