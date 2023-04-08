import { BlobServiceClient } from '@azure/storage-blob';

import { BLOB_CONNECTION_STRING } from '$env/static/private';

if (!BLOB_CONNECTION_STRING)
	throw new Error(`Blob credentials not found on the environment.`);

export default BlobServiceClient.fromConnectionString(BLOB_CONNECTION_STRING);
