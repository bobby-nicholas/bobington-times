import { Configuration, OpenAIApi } from 'openai';

import { OPEN_AI_KEY } from '$env/static/private';

export type GPT_4_MODEL = 'gpt-4';

const client = new OpenAIApi({ apiKey: OPEN_AI_KEY } as Configuration);

export default client;