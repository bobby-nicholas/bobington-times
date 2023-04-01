import client from '$lib/server/articlesClient'
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { retrieveResource } from '$lib/server/requestHelper';

export const GET = (async ({ params, setHeaders }) => {
	if (!params.slug) return new Response('param id not found in route', { status: 400 });
	const data = await retrieveResource(client.getById, params.slug);
	if (!data) return new Response(null, { status: 404 });
	setHeaders({ 'cache-control': 'max-age=7200' }); // 2 Hours
	return json(data);
}) satisfies RequestHandler;
