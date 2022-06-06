const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Inter: ["Inter", ...defaultTheme.fontFamily.sans],
        DMmono: ["DM-Mono", ...defaultTheme.fontFamily.sans],
        Montserrat: ["Montserrat", ...defaultTheme.fontFamily.sans],
        WorkSans: ["Work-Sans", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
