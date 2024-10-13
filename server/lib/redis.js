import { Redis } from 'ioredis';

export const connection = new Redis({
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379,
    password: process.env.REDIS_PASSWORD || '',
    maxRetriesPerRequest: null
});
