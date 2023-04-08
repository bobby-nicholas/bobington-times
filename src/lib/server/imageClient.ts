import { BLOB_CONTAINER_NAME } from "$env/static/private";
import blobClient from "./blobClient";

const client = blobClient.getContainerClient(BLOB_CONTAINER_NAME);

async function uploadImage(image: string): Promise<string> {
	if (!image) throw Error('No image data provided');
	const data = Buffer.from(image, 'base64');
	const blob = client.getBlockBlobClient(`Bobington-${Date.now()}`);
	await blob.uploadData(data,{
		blobHTTPHeaders: {
			blobContentType: 'image/png'
		}
	});
	return blob.url;
}

export {
	uploadImage,
};