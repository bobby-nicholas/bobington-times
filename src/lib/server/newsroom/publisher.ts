import type Article from "$lib/models/article";
import type PublishingOptions from "$lib/models/publishing-options";
import articlesClient from "../articlesClient";
import printer from "./printer";

async function publish(options: PublishingOptions): Promise<boolean> {
	const articlePromises = [] as Array<Promise<Partial<Article>>>;
	for (let i = 0; i < options.international; i++) {
		articlePromises.push(printer.generateArticle('International'));
		await new Promise(r => setTimeout(r, 250));
	}
	for (let i = 0; i < options.local; i++) {
		articlePromises.push(printer.generateArticle('Local'));
		await new Promise(r => setTimeout(r, 250));
	}
	for (let i = 0; i < options.sports; i++) {
		articlePromises.push(printer.generateArticle('Sports'));
		await new Promise(r => setTimeout(r, 250));
	}
	for (let i = 0; i < options.weather; i++) {
		articlePromises.push(printer.generateArticle('Weather'));
		await new Promise(r => setTimeout(r, 250));
	}

	const articles = await Promise.all(articlePromises);
	const [published, tags] = [new Date(), ['Edition I']];
	articles.forEach(article => articlesClient.add({ ...article, published, tags }));
	return true;
}

export default { publish };