/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				'light': 'var(--light)',
				'light-clear': 'var(--light-clear)',
				'dark': 'var(--dark)',
				'main': 'var(--main)',
				'secondary': 'var(--secondary)',
				'teritary': 'var(--teritary)',
				'accent': 'var(--accent)'
			},
		}
	},
	plugins: []
};