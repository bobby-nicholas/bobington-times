import { CosmosClient } from "@azure/cosmos";
import dayjs from 'dayjs';
import type Article from "./article";

const { COSMOS_KEY: key, COSMOS_ENDPOINT: endpoint, COSMOS_DB_NAME, COSMOS_CONTAINER_NAME } = process.env;

if (!key || !endpoint || !COSMOS_DB_NAME || !COSMOS_CONTAINER_NAME)
	throw new Error('Database credentials not found on the environment');

const client = new CosmosClient({ key, endpoint });

const container = client.database(COSMOS_DB_NAME).container(COSMOS_CONTAINER_NAME);

async function get(id: string): Promise<Article | undefined> {
	return (await container.item(id).read<Article>()).resource;
}

async function getRecent(): Promise<Article[] | undefined> {
	return (await container.items.query<Article>({
		query: 'SELECT * FROM articles WHERE articles.published > @published',
		parameters: [{ name: '@published', value: dayjs().startOf('day').subtract(30, 'days').toISOString() }]
	}).fetchAll()).resources;
}

async function add(item: Article): Promise<Article | undefined> {
	return (await container.items.create(item)).resource;
}

export default {
	get,
	getRecent,
	add,
};