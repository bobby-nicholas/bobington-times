import type Article from '$lib/server/article';
import client from '$lib/server/articlesClient'
import cache from '$lib/server/cache';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET = (async ({ url }) => {
	console.log('GET /data/articles function started.');
	const [startDate, endDate] = [url.searchParams.get('startDate'), url.searchParams.get('endDate')];
	const key = cacheKey(startDate, endDate);
	console.log(`Checking if ${key} is in cache`);
	if (cache.has(key)) { console.log('Found. Returning from cache'); return json(cache.get(key)); }
	console.log('Not found. Invoking DB client');
	const data = await client.getByDateRange(startDate, endDate);
	console.log('Response: ', data);
	if (!data) return new Response('An error occurred retrieving from the remote DB', { status: 500 });
	console.log('adding to cache and returning data as JSON');
	cache.set(key, data);
	return json(data);
}) satisfies RequestHandler;

export const POST = (async ({ request }) => {
	const article = (await request.json()) satisfies Article;
	const resource = await client.add(article);
	if (!resource) return new Response(null, { status: 500 });
	return new Response(null, { status:204 });
}) satisfies RequestHandler;


const cacheKey = (startDate: string|null, endDate: string|null) => `range_${startDate ?? 'X'}_${endDate ?? 'X'}`;