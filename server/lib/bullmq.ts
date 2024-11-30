import { Queue } from "bullmq";
import { getRedisConnection } from "../../worker/redis";

// create queue and add job to queue functions are called in api routes for webhooks
export function createPaymentWebhooksQueue() {
    // Skip queue creation during build time
    if (process.env.IS_BUILD_TIME === 'true') {
        console.log('Skipping Queue creation during build time');
        return null;
    }

    const connection = getRedisConnection();
    if (!connection) {
        console.log('No Redis connection available');
        return null;
    }

    const paymentQueue = new Queue('payment-webhooks', {
        connection,
        defaultJobOptions: {
            attempts: 5,
            backoff: {
                type: 'exponential',
                delay: 2000
            },
            removeOnComplete: true,
            removeOnFail: false,
        }
    });

    return paymentQueue;
}

export async function addPaymentWebhookToQueue(paymentQueue: Queue | null, webhook: any) {
    // Skip if we're in build time or no queue available
    if (!paymentQueue || process.env.IS_BUILD_TIME === 'true') {
        console.log('Skipping webhook addition during build time or no queue available');
        return;
    }

    await paymentQueue.add('process-payment-webhook', {
        webhookId: webhook.id,
        payload: webhook.payload,
        eventType: webhook.eventType,
    }, {
        priority: 1
    });
}