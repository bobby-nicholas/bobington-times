export default interface Article {
	id?: string;
	published: Date;
	author?: string;
	section?: string;
	headline: string;
	summary: string;
	text: string;
	photo: string;
	tags?: string[];
}