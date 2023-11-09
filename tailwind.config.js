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
        background: "#FFFCF5", // Used as a background color for sections or containers
        secondary: "#F0E5CF", // Used as a secondary background or subtle text color
        accent: "#6C82A3", // Used for headings, titles, or borders
        highlight: "#DAE3F0", // Used as a background color for sections or cards
      },
    },
  },
  plugins: [],
};
