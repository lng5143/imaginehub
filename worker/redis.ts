import { Redis } from 'ioredis';

let connection: Redis | null = null;

export function initializeRedis(): Redis {
    if (process.env.REDIS_URL) {
        return new Redis(process.env.REDIS_URL, { maxRetriesPerRequest: null });
    } else {
        return new Redis({
            host: 'localhost',
            port: 6379,
            maxRetriesPerRequest: null
        });
    }
}

// Getter function to ensure connection exists
export function getRedisConnection(): Redis | null {
    if (process.env.NODE_ENV !== 'production') {
        return null;
    }

    if (!connection) {
        connection = initializeRedis();
    }

    return connection;
}

// Export for backward compatibility
export { connection };