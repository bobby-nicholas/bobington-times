import client from '$lib/server/articlesClient'
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET = (async ({ params }) => {
	if (!params.slug) return new Response('param id not found in route', { status: 400 });
	const data = await client.getById(params.slug);
	if (!data) return new Response(null, { status: 404 });
	return json(data);
}) satisfies RequestHandler;
