import { Queue } from "bullmq";
import { connection as redisConnection } from "./redis.js";

// create queue and add job to queue functions are called in api routes for webhooks
export async function createPaymentWebhooksQueue() {
    const paymentQueue = new Queue('payment-webhooks', {
        connection: redisConnection,
        defaultJobOptions: {
            attempts: 5,
            backoff: {
                type: 'exponential',
                delay: 2000
            },
            removeOnComplete: true,
            removeOnFail: false,
            timeout: 10000
        }
    });

    return paymentQueue;
}

export async function addPaymentWebhookToQueue(paymentQueue, webhook) {
    await paymentQueue.add('process-payment-webhook', {
        webhookId: webhook.id,
        payload: webhook.payload,
        eventType: webhook.eventType,
    }, {
        priority: 1
    })
}