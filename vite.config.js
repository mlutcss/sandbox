import { vite } from '@mlut/plugins';
import { defineConfig } from 'vite';

const mlut = vite({
	input: 'src/assets/style/style.scss',
	output: 'dist/assets/style.css',
	minify: true,
});

export default defineConfig(() => {
	return {
		plugins: [mlut],
		build: {
    	rollupOptions: {
      	input: {
					main: 'index.html',
        	engine: 'src/lib/engine-dependencies.entry.js'
      	}
    	}
  	}
	};
});
