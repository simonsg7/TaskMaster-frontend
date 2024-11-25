/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Primary color
                "primary-light": "#3B7894",
                "primary": "#335D70",
    
                // Secondary color
                "secondary-light": "#D9BD7D",
                "secondary": "#D6B56E",
    
                // Tertiary color
                "tertiary-light": "#F4F3F3",
                "tertiary": "#C8C6C6",
                }
        },
    },
    plugins: [],
}