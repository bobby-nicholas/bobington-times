import type Article from '$lib/models/article';
import type { PageLoad } from './$types';


export const load = (async ({ fetch, setHeaders, params }) => {
	const article = await (await fetch(`/data/articles/${params.slug}`)).json() satisfies Article;
	setHeaders({ 'cache-control': 'max-age=86400' }); // 1 day
	return { article };
}) satisfies PageLoad;
