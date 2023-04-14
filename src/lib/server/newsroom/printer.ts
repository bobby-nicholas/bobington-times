import type Article from "$lib/models/article";
import type Section from "$lib/models/section";
import { sendPubMessage } from "../events";
import { executeNewsroomChat, Roles, type Message } from "../gptClient";
import editor from "./editor";
import photographer from "./photographer";
import * as prompts from "./system-prompts";

const characterMessages: Record<Section, Message> = {
	'International': { role: Roles.SYSTEM, content: prompts.INTERNATIONAL_REPORTER },
	'Local': { role: Roles.SYSTEM, content: prompts.LOCAL_REPORTER },
	'Sports': { role: Roles.SYSTEM, content: prompts.SPORTS_REPORTER },
	'Weather': { role: Roles.SYSTEM, content: prompts.METEOROLOGIST },
};

const createUrlSafeId = (headline: string) => {
	if (!headline) throw Error(`Can't create an id with an empty 'headline'`);
	const alphanumericAndSpace = /^[a-z0-9\s]+$/i;
	const cleanHeadline = headline.split('').filter(char => alphanumericAndSpace.test(char) || char === ' ');
	const cleanedHeadlineNoSpaces = cleanHeadline.join('').replace(/\s+/g, '-');
	const dateStr = new Date().toISOString().split('T')[0];

	return `${cleanedHeadlineNoSpaces}-${dateStr}`;
  };

async function generateArticle(desk: Section, prompt = 'Submit a story'): Promise<Partial<Article>> {
	const storyPrompt = { role: Roles.USER, content: prompt.trim() };
	sendPubMessage(`Creating draft ${desk} article`);
	const draft = await executeNewsroomChat([characterMessages[desk], storyPrompt]);
	
	if (!draft) throw Error('Failed to generate draft article');
	sendPubMessage(`Creating feedback for draft ${desk} article`);
	const feedback = await editor.reviewArticle(draft.content);
	
	if (!feedback) throw Error('Failed to generate article feedback');
	const feedbackPrompt = { role: Roles.USER, content: `Feedback from the editor: ${feedback.trim()}` };
	sendPubMessage(`Creating final version of ${desk} article`);
	const final = await executeNewsroomChat([characterMessages[desk], storyPrompt, draft, feedbackPrompt]);
	
	if (!final) throw Error('Failed to generate revised article');
	sendPubMessage(`Creating headline and lead for ${desk} article`);
	const article = await editor.finalizeArticle(final.content);

	if (!article) throw Error('Failed to finalize article');
	sendPubMessage(`Creating image for ${desk} article`);
	const photo = await photographer.submitImage(article);
	
	const [section, id] = [desk, createUrlSafeId(article?.headline ?? '')];
	sendPubMessage(`Successfully created ${desk} article`);
	return { ...article, ...photo, section, id, author: 'Staff reporter' };
}

export default { generateArticle };
