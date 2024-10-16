import { Redis } from 'ioredis';

let connection;

connection = new Redis(process.env.REDIS_URL, {maxRetriesPerRequest: null});

console.log(connection);

export { connection };
