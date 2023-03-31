import type Article from '$lib/server/article';
import type { PageLoad } from './$types';

export const load = (async ({ fetch }) => {
	const articles = await (await fetch('/data/articles')).json() satisfies Article[];
	return { articles };
}) satisfies PageLoad;
