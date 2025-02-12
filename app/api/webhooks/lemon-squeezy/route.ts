import { addPaymentWebhookToQueue, createPaymentWebhooksQueue } from '@/server/lib/bullmq'
import { prisma } from '@/server/lib/prisma'
import { WebhookProvider, WebhookStatus } from '@prisma/client'

const crypto = require('crypto')

const paymentQueue = createPaymentWebhooksQueue();

export const POST = async (req : Request) => {
    // validate signature
    const rawBody = await new Response(req.body).text();
    const secret = process.env.LM_SIGNING_SECRET
    const hmac = crypto.createHmac('sha256', secret)
    const digest = Buffer.from(hmac.update(rawBody).digest('hex'), 'utf8');
    const signature = Buffer.from(req.headers.get('X-Signature') || '', 'utf8');

    if (!crypto.timingSafeEqual(digest, signature)) {
        throw new Error('Invalid signature');
    }

    // save to DB and add to queue
    try {
        const webhook = await prisma.webhook.create({
            data: {
                eventType: req.headers.get('x-event-name'),
                provider: WebhookProvider.LEMON_SQUEEZY,
                payload: rawBody,
                status: WebhookStatus.PENDING,
                retries: 0,
            }
        })

        await addPaymentWebhookToQueue(paymentQueue, webhook);
    } catch (error) {
        console.error(error);
    }

    // return 200
    return new Response(null, { status: 200 })
}