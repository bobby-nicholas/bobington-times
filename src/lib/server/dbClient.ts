import { CosmosClient } from "@azure/cosmos";

const { COSMOS_KEY: key, COSMOS_ENDPOINT: endpoint, COSMOS_DB_NAME } = process.env;

if (!key || !endpoint || !COSMOS_DB_NAME)
	throw new Error('Database credentials not found on the environment');

export default new CosmosClient({ key, endpoint }).database(COSMOS_DB_NAME);
