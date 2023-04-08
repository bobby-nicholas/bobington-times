import { Configuration, OpenAIApi } from 'openai';
import type { AxiosError } from 'axios';

import { OPEN_AI_KEY } from '$env/static/private';
import { FOUNDATION, NEWSROOM } from './newsroom/system-prompts';


const GPT_4_MODEL = 'gpt-4';

const MAX_TOKENS = 2000;

const TEMPERATURE = 1;

const IMAGE_FORMAT = 'b64_json' as ImageFormats;

const IMAGE_SIZE = '512x512' as ImageSize;

const DALLE_2_MODEL = 'dalle-2';

const MAX_DALLE_PROMPT_LENGTH = 999;

export enum Roles { SYSTEM = 'system', USER = 'user', ASSISTANT = 'assistant' }

export type Role = 'system' | 'user'| 'assistant';

export type ImageSize = '256x256' | '512x512' | '1024x1024';

export type ImageFormats = 'b64_json' | 'url';

export type Message = { role: Role, content: string };

export type Prompt = { prompt: string };

const client = new OpenAIApi(new Configuration({ apiKey: OPEN_AI_KEY }));

const chatConfig = {
	model: GPT_4_MODEL,
	max_tokens: MAX_TOKENS,
	temperature: TEMPERATURE,
};

const imageConfig = {
	response_format: IMAGE_FORMAT,
	size: IMAGE_SIZE,
};

const systemMessages = [
	{ role: Roles.SYSTEM, content: FOUNDATION },
	{ role: Roles.SYSTEM, content: NEWSROOM },
];

const [MAX_ATTEMPTS, TIMEOUT] = [2, 5000];

export async function executeNewsroomChat(userMessages: Message[]): Promise<Message|null> {
	for (let i = 0; i < MAX_ATTEMPTS; i++) {
		try {
			const response = (await client.createChatCompletion({
				...chatConfig, messages: [...systemMessages, ...userMessages],
			})).data.choices[0].message;
			if (!response?.content) console.warn(`The response message is empty`);
			return response ?? null;
		}
		catch (error) {
			console.error(`A network error occurred hitting the OpenAI API`, (error as AxiosError)?.toJSON() ?? '');
			if ((error as AxiosError)?.response?.status === 429) {
				await new Promise(r => setTimeout(r, randomIntInRange(TIMEOUT, 1000)));
				continue;
			}
			return null;
		}
	}
	return null;
}

export async function executePhotoGeneration(description: string): Promise<string|null> {
	const prompt = description.length > MAX_DALLE_PROMPT_LENGTH ? description.substring(0, MAX_DALLE_PROMPT_LENGTH-3).padEnd(MAX_DALLE_PROMPT_LENGTH, '.') : description;
	for (let i = 0; i < MAX_ATTEMPTS; i++) {
		try {
			return (await client.createImage({ ...imageConfig, prompt, })).data.data[0].b64_json ?? null;
		}
		catch (error) {
			console.error(`A network error occurred hitting the OpenAI API`, (error as AxiosError)?.toJSON() ?? '');
			if ([429].includes((error as AxiosError)?.response?.status ?? 0)) {
				await new Promise(r => setTimeout(r, randomIntInRange(TIMEOUT, 1000)));
				continue;
			}
			return null;
		}
	}
	return null;
}

function randomIntInRange(num: number, error: number) {
	return Math.floor(Math.random() * (num + error - (num - error) + 1)) + (num - error);
}
