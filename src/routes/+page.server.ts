import type Article from '$lib/server/article';
import type { PageServerLoad } from './$types';

export const load = (async ({ fetch }) => {
	console.log('load / function started. Fetching /data/articles');
	const articles = await (await fetch('/data/articles')).json() satisfies Article[];
	console.log('returning articles result: ', articles);
	return { articles };
}) satisfies PageServerLoad;