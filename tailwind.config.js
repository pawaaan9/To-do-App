const { NextURL } = require("next/dist/server/web/next-url");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Josefin Sans"],
      },
      backgroundImage: {
        "light-img-mobile": 'url("/images/bg-mobile-light.jpg")',
        "dark-img-mobile": 'url("/images/bg-mobile-dark.jpg")',
        "light-img-desktop": 'url("/images/bg-desktop-light.jpg")',
        "dark-img-desktop": 'url("/images/bg-desktop-dark.jpg")',
      },

      linearBorderGradients: ({ theme }) => ({
        colors: {
          "purple-blue": ["#57DDFF", "#C058F3"],
          "slate-300": ["#cbd5e1", "#cbd5e1"],
          "grayish-blue": ["#393a4d", "#393a4d"],
        },
        background: {
          "dark-blue": ["#25273c"],
          "zinc-white": ["#fafafa"],
        },
      }),
    },
  },
  variants: {
    extend: {
      backgroundImage: ["dark"],
    },
  },
  plugins: [require("tailwindcss-border-gradient-radius")],
};
