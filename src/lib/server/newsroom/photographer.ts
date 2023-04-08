import type Article from "$lib/models/article";
import { Roles, executeNewsroomChat, executePhotoGeneration } from "../gptClient";
import { uploadImage } from "../imageClient";
import { PHOTOGRAPHER } from "./system-prompts";

const characterMessages = [
	{ role: Roles.SYSTEM, content: PHOTOGRAPHER },
];

async function submitImage(article: Partial<Article>): Promise<Partial<Article>> {
	const { headline, lead } = article;
	if (!headline || !lead) throw Error('Headline and lead are required to generate an image');
	
	const content = `
	Headline: ${headline}
	Lead: ${lead}

	Submit a photograph.
	`.trim();
	
	const photoPrompt = { role: Roles.USER, content };
	const description = (await executeNewsroomChat([...characterMessages, photoPrompt]))?.content.trim();
	
	if (!description) throw Error('Failed to generate an image description');
	
	const b64Image = await executePhotoGeneration(description);

	if (!b64Image) throw Error('Failed generate the image');
	
	const src = await uploadImage(b64Image);

	return { photo: { src, description } };
}

export default { submitImage };