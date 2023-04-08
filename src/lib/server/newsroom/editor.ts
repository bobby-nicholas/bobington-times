import type Article from "$lib/models/article";
import {executeNewsroomChat, Roles } from "../gptClient";
import { EDITOR } from "./system-prompts";

const characterMessages = [
	{ role: Roles.SYSTEM, content: EDITOR },
];

async function reviewArticle(draft: string): Promise<string|null> {
	if (!draft.trim()) throw Error('Draft article is empty');
	const message = { role: Roles.USER, content: `[DRAFT] ${draft}`.trim() };
	return (await executeNewsroomChat([...characterMessages, message]))?.content ?? null;
}

async function finalizeArticle(final: string): Promise<Partial<Article> | null> {
	if (!final.trim()) throw Error('Final article is empty');
	const content = final.trim();
	const message = { role: Roles.USER, content: `[FINAL] ${content}` };
	const response = await executeNewsroomChat([...characterMessages, message]);
	if (!response) return null;
	let [headline, lead] = extractHeadlineAndLead(response.content);
	if (!!headline && !!lead) return { headline, lead, content };
	const retry = await executeNewsroomChat([...characterMessages, message, response, { role: Roles.USER, content: `Respond in the correct format` }]);
	if (!retry) return null;
	[headline, lead] = extractHeadlineAndLead(retry.content);
	if (!!headline && !!lead) return { headline, lead, content };
	return null;
}

const extractHeadlineAndLead = (content: string): [string|undefined, string|undefined] => ([
	content.split('\n').find(c => /^HEADLINE:.*$/.test(c))?.replace('HEADLINE:', '').trim(),
	content.split('\n').find(c => /^LEAD:.*$/.test(c))?.replace('LEAD:', '').trim()
]);


export default { reviewArticle, finalizeArticle };