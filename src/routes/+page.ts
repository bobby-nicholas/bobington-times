import type Article from '$lib/models/article';
import type { PageLoad } from './$types';

export const load = (async ({ fetch, setHeaders }) => {
	const articles = await (await fetch('/data/articles')).json() satisfies Article[];
	setHeaders({ 'cache-control': 'max-age=1200' }); // 20 Minutes
	return { articles };
}) satisfies PageLoad;
