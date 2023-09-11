/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "bg-primary": "#F9F9FB",
        "text-primary":"#FB5857",
        "graybasic": "#B3B3BC;",
        "textbasicgray": "#787887",
        "iconsgray":"#B3B3BC",
        "orangered":"#FF5349",
      },
    },
  },
  plugins: [],
};

