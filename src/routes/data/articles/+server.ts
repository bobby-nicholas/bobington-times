import type Article from '$lib/models/article';
import client from '$lib/server/articlesClient'
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { retrieveResource } from '$lib/server/requestHelper';
import type PublishingOptions from '$lib/models/publishing-options';
import publisher from '$lib/server/newsroom/publisher';
import { receivePubComplete, receivePubMessage } from '$lib/server/events';
import { PUBLISHING_KEY } from '$env/static/private';

export const GET = (async ({ url, setHeaders }) => {
	const [startDate, endDate] = [url.searchParams.get('startDate'), url.searchParams.get('endDate')];
	const data = await retrieveResource<Article[]>(client.getByDateRange, startDate, endDate);
	if (!data) return new Response('An error occurred retrieving from the remote DB', { status: 500 });
	setHeaders({ 'cache-control': 'max-age=1200' }); // 20 Minutes
	return json(data);
}) satisfies RequestHandler;

export const POST = (async ({ request }) => {
	const { headers } = request;
	if (headers.get('x-publishing-key') !== PUBLISHING_KEY) return new Response(null, { status: 401 });
	const options = (await request.json()) satisfies Partial<PublishingOptions>;
	const stream = new ReadableStream({
		start(controller) {
			receivePubMessage((message: string) => controller.enqueue(message));
			receivePubComplete(() => controller.close());
			publisher.publish(options);
		}
	});
	return new Response(stream, { headers: { 'content-type': 'text/event-stream' }});
}) satisfies RequestHandler;
