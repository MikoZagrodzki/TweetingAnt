/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      button: {
        base: 'bg-secondary font-semibold px-2 rounded-sm shadow-md',
        hover: 'hover:bg-accent hover:text-white',
      },
      minWidth:{
        '1/3':'33.333333%',
        '1/2':'50%',

      },
      colors: {
        primary: "#A3967C", // Used for primary elements and call-to-action
        background: "#15202b", // Used as a background color for sections or containers
        secondary: "#1d9bf0", // Used as a secondary background or subtle text color
        accent: "#8899ac", // Used for headings, titles, or borders
        highlight: "#DAE3F0", // Used as a background color for sections or cards
      },
    },
  },
  plugins: [],
};
