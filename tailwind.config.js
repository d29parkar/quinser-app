/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0047AB', // Logo blue
        'primary-dark': '#003380',
        'primary-light': '#1E5FC4',
        secondary: '#E4002B', // Logo red
        'secondary-dark': '#B80022',
        'secondary-light': '#FF1A3D',
        accent: '#60A5FA', // Soft sky blue for accents
        background: '#F9FAFB',
        text: '#111827',
        'text-secondary': '#6B7280',
        'card-bg': '#FFFFFF',
        border: '#E5E7EB',
      },
      fontFamily: {
        sans: ['Inter', 'Poppins', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tight: '-0.5px',
      },
    },
  },
  plugins: [],
}

