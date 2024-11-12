import { RedisConnection } from 'bullmq';
import { Redis } from 'ioredis';

let connection : Redis;

if (process.env.REDIS_URL) {
    connection = new Redis(process.env.REDIS_URL, { maxRetriesPerRequest: null });
} else {
    connection = new Redis({
        host: 'localhost',
        port: 6379,
        maxRetriesPerRequest: null
    });
}

export { connection };