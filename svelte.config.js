import azure from 'svelte-adapter-azure-swa';
import { vitePreprocess } from '@sveltejs/kit/vite';
import * as dotenv from 'dotenv';

dotenv.config();

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: azure(),
	}
};

export default config;
