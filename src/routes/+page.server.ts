import type Article from "$lib/server/article";

let articles = [] as Article[];

export const load = async ({ fetch }) => {
	console.log(articles.length ? 'returning cached articles' : 'fetching articles');
	if (articles.length) return { articles };
	articles = await (await fetch('/api/articles')).json();
	return { articles };
}