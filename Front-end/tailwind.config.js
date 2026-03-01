export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#67e767',
        'dark-bg': '#1e1e1e',
        'sidebar': '#2e2e2e',
        'card-shadow': 'rgba(0, 0, 0, 0.555)',
        'note-color1': '#abacad',
        'note-color2': '#e07a5f',
        'note-color3': '#81b29a',
      },
      fontFamily: {
        apple: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'sans-serif'],
        verdana: ['Verdana', 'Geneva', 'Tahoma', 'sans-serif'],
        monospace: ['Courier New', 'Courier', 'monospace'],
      },
      boxShadow: {
        'card': '0 5px 10px rgba(0, 0, 0, 0.555)',
        'tools': '0 3px 5px rgba(0, 0, 0, 0.664)',
        'empty': '0 3px 10px rgba(0, 0, 0, 0.39)',
      },
      animation: {
        'typing': 'typing 3s steps(25, end) infinite',
        'blink': 'blink 0.8s step-end infinite',
      },
      keyframes: {
        typing: {
          '0%': { width: '0' },
          '50%': { width: '100%' },
          '80%': { width: '100%' },
        },
        blink: {
          'from, to': { borderColor: 'transparent' },
          '50%': { borderColor: '#67e767' },
        },
      },
    },
  },
  plugins: [],
}
