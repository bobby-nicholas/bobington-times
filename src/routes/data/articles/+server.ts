import type Article from '$lib/models/article';
import client from '$lib/server/articlesClient'
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { retrieveResource } from '$lib/server/requestHelper';

export const GET = (async ({ url, setHeaders }) => {
	const [startDate, endDate] = [url.searchParams.get('startDate'), url.searchParams.get('endDate')];
	const data = await retrieveResource<Article[]>(client.getByDateRange, startDate, endDate);
	if (!data) return new Response('An error occurred retrieving from the remote DB', { status: 500 });
	setHeaders({ 'cache-control': 'max-age=1200' }); // 20 Minutes
	return json(data);
}) satisfies RequestHandler;

export const POST = (async ({ request }) => {
	const article = (await request.json()) satisfies Article;
	const resource = await client.add(article);
	if (!resource) return new Response(null, { status: 500 });
	return new Response(null, { status:204 });
}) satisfies RequestHandler;
