import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
                mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', "Liberation Mono", "Courier New", 'monospace'],
            },
            colors: {
                blueprint: {
                    bg: '#081b33',
                    grid: '#112b4e',
                    fg: '#e2e8f0',
                    accent: '#00f0ff',
                    secondary: '#38bdf8',
                    alert: '#fbbf24',
                }
            },
            backgroundImage: {
                'blueprint-pattern': 'linear-gradient(#112b4e 1px, transparent 1px), linear-gradient(90deg, #112b4e 1px, transparent 1px)',
            },
            backgroundSize: {
                'blueprint': '40px 40px',
            }
        },
    },

    plugins: [forms],
};
