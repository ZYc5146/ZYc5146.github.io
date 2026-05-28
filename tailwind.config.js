/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./js/*.js"],
  theme: {
    extend: {
      colors: {
        primary: '#165DFF',
        secondary: '#7B61FF',
        accent: '#FF7D00',
        dark: '#1D2129',
        light: '#F2F3F5',
        surface: '#FFFFFF',
        'surface-hover': '#F9FAFB',
        muted: '#6B7280',
        'muted-light': '#E5E7EB',
        danger: '#F53F3F'
      },
      fontFamily: {
        inter: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'elevation-1': '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
        'elevation-2': '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
        'elevation-3': '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
      }
    }
  },
  plugins: [],
}
