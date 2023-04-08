import type Article from '$lib/models/article';
import client from '$lib/server/articlesClient'
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { retrieveResource } from '$lib/server/requestHelper';
import type PublishingOptions from '$lib/models/publishing-options';
import publisher from '$lib/server/newsroom/publisher';

export const GET = (async ({ url, setHeaders }) => {
	const [startDate, endDate] = [url.searchParams.get('startDate'), url.searchParams.get('endDate')];
	const data = await retrieveResource<Article[]>(client.getByDateRange, startDate, endDate);
	if (!data) return new Response('An error occurred retrieving from the remote DB', { status: 500 });
	setHeaders({ 'cache-control': 'max-age=1200' }); // 20 Minutes
	return json(data);
}) satisfies RequestHandler;

export const POST = (async ({ request }) => {
	const options = (await request.json()) satisfies Partial<PublishingOptions>;
	// if (!await publisher.publish(options)) return new Response(null, { status: 500 });
	publisher.publish(options);
	return new Response(null, { status:201 });
}) satisfies RequestHandler;
