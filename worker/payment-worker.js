import { Worker } from 'bullmq';
import { connection } from '../server/lib/redis.js';
import { 
    isWebhookProcessed, 
    markWebhookAsProcessed, 
    handlePaymentSuccess, 
    markWebhookAsProcessing, 
    handleWebhookFailure 
} from '../server/lib/webhook.js';

const paymentWorker = new Worker('payment-webhooks', async (job) => {
    const { webhookId, payload, eventType } = job.data;

    const data = JSON.parse(payload);
    console.log('webhook data', data)

    const orderId = data?.meta?.custom_data?.order_id;
    const userId = data?.meta?.custom_data?.user_id;

    try {
        // check idempotency 
        if (await isWebhookProcessed(webhookId)) {
            return;
        }

        await markWebhookAsProcessing(webhookId);

        // handle the webhook 
        if (eventType === 'order_created') {
            await handlePaymentSuccess(userId, orderId);
        }

        // mark the webhook as processed 
        await markWebhookAsProcessed(webhookId);
    } catch (error) {
        await handleWebhookFailure(webhookId, orderId);
        console.error(error);
        throw error; // throw to retry the job
    }
}, {
    connection: connection,
    concurrency: 5,
});

paymentWorker.on('completed', (jobId) => {
    console.log(`Payment webhook ${jobId} completed`);
});

paymentWorker.on('failed', (jobId, error) => {
    console.error(`Payment webhook ${jobId} failed: ${error.message}`);
});