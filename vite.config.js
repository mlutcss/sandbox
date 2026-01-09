import { vite } from '@mlut/plugins';
import { defineConfig } from 'vite';

const mlut = vite({
	input: 'src/assets/style/style.scss',
	output: 'assets/style.css',
	minify: true,
});

export default defineConfig(() => {
	return {
		plugins: [mlut],
	};
});
