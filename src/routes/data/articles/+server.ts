import type Article from '$lib/server/article';
import client from '$lib/server/articlesClient'
import cache from '$lib/server/cache';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET = (async ({ url }) => {
	const [startDate, endDate] = [url.searchParams.get('startDate'), url.searchParams.get('endDate')];
	const key = cacheKey(startDate, endDate);

	if (cache.has(key)) return json(cache.get(key));
	const data = await client.getByDateRange(startDate, endDate);
	if (!data) return new Response(null, { status: 500 });
	cache.set(cacheKey(startDate, endDate), data);
	return json(data);
}) satisfies RequestHandler;

export const POST = (async ({ request }) => {
	const article = (await request.json()) satisfies Article;
	const resource = await client.add(article);
	if (!resource) return new Response(null, { status: 500 });
	return new Response(null, { status:204 });
}) satisfies RequestHandler;


const cacheKey = (startDate: string|null, endDate: string|null) => `range_${startDate ?? 'X'}_${endDate ?? 'X'}`;