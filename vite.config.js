import { vite } from '@mlut/plugins';
import { defineConfig } from 'vite';

const mlut = vite({
	input: 'src/assets/style/style.scss',
	output: 'src/assets/style/style.css',
});

export default defineConfig(() => {
	return {
		plugins: [mlut],
	};
});
