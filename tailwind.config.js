module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  darkMode: 'class', // Explicitly using class strategy, not media queries
  theme: {
    extend: {
      colors: {
        primary: '#74BA43',
        success: '#42758F',
        warning: '#EB6209',
        'dark-background': '#3D3D3C',
        'light-background': '#F0F5FF',
        'dark-text': '#152542',
        'light-text': '#3E547C',
        'custom-0': '#54565a',
        'custom-1': '#f16022',
        'custom-2': '#42758f',
        'custom-3': '#f19b76',
        'custom-4': '#FFFFFF',
        'custom-5': '#91bd77',
        'custom-6': '#F8F8F8',
        'custom-7': '#777777',
      },
      fontFamily: {
        raleway: ['Raleway', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'sm': '0px 1px 3px rgba(0, 0, 0, 0.12)',
        'md': '0px 5px 20px -5px rgba(0, 0, 0, 0.15)',
        'lg': '0px 10px 25px -8px rgba(0, 0, 0, 0.25)',
        'xl': '0px 20px 40px -10px rgba(0, 0, 0, 0.25)',
      }
    },
  },
  // Adding core plugins to ensure proper dark mode behavior
  corePlugins: {
    preflight: true,
    dark: true,
  },
  // Add a safelist for critical classes to ensure they're always generated
  safelist: [
    'bg-white',
    'bg-gray-100',
    'dark:bg-gray-900',
    'dark:bg-gray-800',
    'dark:bg-gray-700',
    'text-dark-text',
    'dark:text-white'
  ],
  plugins: [],
}
