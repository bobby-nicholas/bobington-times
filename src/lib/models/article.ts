import type Section from "./section";

export default interface Article {
	id: string;
	published: Date;
	author: string;
	section: Section;
	headline: string;
	lead: string;
	content: string;
	photo?: {
		src: string;
		description: string;
	};
	tags: string[];
}