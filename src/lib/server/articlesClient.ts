import dayjs from 'dayjs';
import client from './dbClient';
import type Article from "./article";
import type { Resource } from '@azure/cosmos';

const { ARTICLES_CONTAINER_NAME } = process.env;

if (!ARTICLES_CONTAINER_NAME)
	throw new Error('Container name not found on the environment');

const container = client.container(ARTICLES_CONTAINER_NAME);

async function getById(id: string): Promise<Article | undefined> {
	return (await container.item(id).read<Article>()).resource;
}

async function getByDateRange(startDate: string|null, endDate: string|null): Promise<Article[] | undefined> {
	console.log('executing getByDateRange function');
	return (await container.items.query<Article>({
		query: 'SELECT * FROM articles WHERE articles.published >= @startDate AND articles.published <= @endDate',
		parameters: [
			{ name: '@startDate', value: startDate ?? dayjs().startOf('day').subtract(1, 'week').toISOString() },
			{ name: '@endDate', value: endDate ?? dayjs().endOf('day').toISOString() },
		]
	}).fetchAll()).resources;
}

async function add(item: Article): Promise<Resource | undefined> {
	return (await container.items.create(item)).resource;
}

export default {
	getById,
	getByDateRange,
	add,
};
