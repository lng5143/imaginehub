import { Redis } from 'ioredis';

let connection;

if (process.env.NODE_ENV === 'development') {
    connection = new Redis({
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379,
    password: process.env.REDIS_PASSWORD || '',
    maxRetriesPerRequest: null
    });
} else {
    connection = new Redis(process.env.REDIS_URL);
}

export { connection };
