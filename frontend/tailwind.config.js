import daisyui from 'daisyui'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],  // ✅ Only include the plugin here
  daisyui: {
    themes: ["forest", "coffee"],  // ✅ Configuration goes outside 'plugins'
  },
}
