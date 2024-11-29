import { Queue } from "bullmq";
import { connection as redisConnection } from "./redis";

// create queue and add job to queue functions are called in api routes for webhooks
export function createPaymentWebhooksQueue() {
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
        }
    });

    return paymentQueue;
}

export async function addPaymentWebhookToQueue(paymentQueue: Queue, webhook: any) {
    await paymentQueue.add('process-payment-webhook', {
        webhookId: webhook.id,
        payload: webhook.payload,
        eventType: webhook.eventType,
    }, {
        priority: 1
    })
}