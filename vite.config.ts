import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import mkcert from 'vite-plugin-mkcert'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
	plugins: [
		sveltekit(),
		mkcert(),
		tailwindcss()
	],
	server: {
		host: true,
	}
});