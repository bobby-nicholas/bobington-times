/* eslint-disable @typescript-eslint/no-explicit-any */
import cache from '$lib/server/cache';

export const retrieveResource = async <T>(fetchMethod: (...params: any[]) => Promise<T|undefined>, ...params: any[]) : Promise<T|undefined> => {
	const key = `${fetchMethod.name}_${params.map(p => (p?.toString() ?? 'X')).join('_')}`;
	if (key && cache.has(key)) return cache.get<T>(key);
	const data = await fetchMethod(...params);
	if (key && data) cache.set(key, data);
	return data;
};
