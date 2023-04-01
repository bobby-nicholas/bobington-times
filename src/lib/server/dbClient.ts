import { CosmosClient } from '@azure/cosmos';

import { COSMOS_KEY, COSMOS_ENDPOINT, COSMOS_DB_NAME } from '$env/static/private';

if (!COSMOS_KEY || !COSMOS_ENDPOINT || !COSMOS_DB_NAME)
	throw new Error(`Database credentials not found on the environment. COSMOS_KEY=${COSMOS_KEY} COSMOS_ENDPOINT=${COSMOS_ENDPOINT} COSMOS_DB_NAME=${COSMOS_DB_NAME}`);

export default new CosmosClient({ key: COSMOS_KEY, endpoint: COSMOS_ENDPOINT }).database(COSMOS_DB_NAME);
