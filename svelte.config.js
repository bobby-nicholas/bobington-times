import azure from 'svelte-adapter-azure-swa';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: azure({
			customStaticWebAppConfig: {
				routes: [
					{ route: '/api/articles', },
					{ route: '/api/articles/[slug]', },
				],
			},
		}),
	}
};

export default config;
