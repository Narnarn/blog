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
        DMmono: ["DM Mono", ...defaultTheme.fontFamily.sans],
        Montserrat: ["Montserrat", ...defaultTheme.fontFamily.sans],
        WorkSans: ["Work Sans", ...defaultTheme.fontFamily.sans],
        Charis: ["Charis SIL", ...defaultTheme.fontFamily.serif],
        NotoSerif: ["Noto Serif SC", ...defaultTheme.fontFamily.serif],
      },
    },
    listStyleType: {
      none: "none",
      disc: "disc",
      decimal: "decimal",
      square: "square",
      roman: "upper-roman",
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
