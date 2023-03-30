import type Article from '$lib/server/article';
import client from '$lib/server/articlesClient'
import { json } from '@sveltejs/kit';

export const GET = async ({ url }) => {
	const [startDate, endDate] = [url.searchParams.get('startDate'), url.searchParams.get('endDate')];
	const data = await client.getByDateRange(startDate, endDate);
	if (!data) return new Response(null, { status: 500 });
	return json(data);
}

export const POST = async ({ request }) => {
	const article = await request.json() satisfies Article;
	const resource = await client.add(article);
	if (!resource) return new Response(null, { status: 500 });
	return new Response(null, { status:204 });
}
