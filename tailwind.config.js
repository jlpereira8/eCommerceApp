/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Tenor Sans",
          "sans-serif"
        ],
      },
      colors: {
        title: 'var(--title-active)',
        body: 'var(--body)',
        label: 'var(--label)',
        placeholder: 'var(--placeholder)',
        line: 'var(--line)',
        inputbackground: 'var(--input-background)',
        background: 'var(--background)',
        offwhite: 'var(--off-white)',
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
      },
    },
  },
  plugins: [],
}
