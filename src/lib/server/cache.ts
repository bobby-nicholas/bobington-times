import nodeCache from 'node-cache';

const cache = new nodeCache({ stdTTL: 1200 });

export default cache;
