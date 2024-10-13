import { Worker } from 'bullmq';
import { connection } from '../server/lib/redis.js';
import { isWebhookProcessed, markWebhookAsProcessed, handlePaymentSuccess } from '../server/lib/webhook.js';

const paymentWorker = new Worker('payment-webhooks', async (job) => {
    const { webhookId, payload, eventType } = job.data;

    try {
        // check idempotency 
        if (await isWebhookProcessed(webhookId)) {
            return;
        }

        // handle the webhook 
        if (eventType === 'order_created') {
            await handlePaymentSuccess(payload);
        }

        // mark the webhook as processed 
        await markWebhookAsProcessed(webhookId);
    } catch (error) {

        console.error(error);
        throw error; // throw to retry the job
    }
}, {
    connection: connection,
    concurrency: 5
});

paymentWorker.on('completed', (jobId) => {
    console.log(`Payment webhook ${jobId} completed`);
});

paymentWorker.on('failed', (jobId, error) => {
    console.error(`Payment webhook ${jobId} failed: ${error.message}`);
});