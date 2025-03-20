export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cyber-purple': '#6B1FB1',
        'cyber-blue': '#00F0FF',
        'cyber-pink': '#FF00FF',
        'cyber-dark': '#0A0A0F',
      },
      fontFamily: {
        'orbitron': ['Orbitron', 'sans-serif'],
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px #00F0FF, 0 0 10px #00F0FF, 0 0 15px #00F0FF' },
          '100%': { boxShadow: '0 0 10px #FF00FF, 0 0 20px #FF00FF, 0 0 30px #FF00FF' },
        },
      },
    },
  },
  plugins: [],
}