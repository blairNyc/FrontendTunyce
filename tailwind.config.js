/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg-primary": "#F9F9FB",
        "universal-primary": "#FB5857",
        grey: "#9ca3af",
        "text-primary":"#FB5857"
      },
    },
  },
  plugins: [
    require("flowbite/plugin"),
  ],
};

