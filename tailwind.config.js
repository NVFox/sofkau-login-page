/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./public/**/*.{html,js}",
        "./src/**/*.{ejs,js}",
        "./src/client/**/*.{js,ts}"
    ],
    theme: {
        extend: {
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                fadeOut: {
                    '0%': { opacity: '1', transform: 'translateY(0)' },
                    '100%': { opacity: '0', transform: 'translateY(20px)' },
                },
            },
            animation: {
                fadeIn: 'fadeIn 0.5s ease-out',
                fadeOut: 'fadeOut 0.5s ease-out',
            },
        },
    },
    plugins: [],
}