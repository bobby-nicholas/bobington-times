import client from '$lib/server/articlesClient'
import cache from '$lib/server/cache';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET = (async ({ params }) => {
	if (!params.slug) return new Response('param id not found in route', { status: 400 });
	if (cache.has(params.slug)) return json(cache.get(params.slug));
	const data = await client.getById(params.slug);
	if (!data) return new Response(null, { status: 404 });
	cache.set(params.slug, data);
	return json(data);
}) satisfies RequestHandler;
