export default interface Article {
	id: string;
	published: Date;
	author: string;
	section?: string;
	text: string;
	tags?: string[];
}