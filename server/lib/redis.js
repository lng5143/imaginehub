import { Redis } from 'ioredis';

let connection;

if(process.env.REDIS_URL) {
    connection = new Redis(process.env.REDIS_URL, {maxRetriesPerRequest: null});
} else {
    connection = new Redis({
        host: process.env.REDIS_HOST || 'localhost',
        port: process.env.REDIS_PORT || 6379,
        password: process.env.REDIS_PASSWORD || '',
        maxRetriesPerRequest: null
    });
}

console.log(connection);

export { connection };
