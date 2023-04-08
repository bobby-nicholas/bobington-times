export default class PublishingOptions {
	international = 0;
	local = 0;
	weather = 0;
	sports = 0;
	constructor(obj: Partial<PublishingOptions>) { Object.assign(this, obj); }
}