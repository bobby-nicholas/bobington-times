import client from '$lib/server/articlesClient'
import { json } from '@sveltejs/kit';

export const GET = async ({ params }) => {
	const data = await client.getById(params.slug);
	if (!data) return new Response(null, { status: 404 });
	return json(data);
}
