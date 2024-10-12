import { prisma } from '@/server/lib/prisma'
import { WebhookProvider, WebhookStatus } from '@prisma/client'

const crypto = require('crypto')

export const POST = async (req) => {
    // validate signature
    const secret = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET
    const hmac = crypto.createHmac('sha256', secret)
    const digest = Buffer.from(hmac.update(req.rawBody).digest('hex'), 'utf8');
    const signature = Buffer.from(req.get('X-Signature') || '', 'utf8');

    if (!crypto.timingSafeEqual(digest, signature)) {
        throw new Error('Invalid signature');
    }

    // save to DB 
    const reqBody = JSON.parse(req.rawBody)
    await prisma.webhook.create({
        data: {
            eventType: reqBody?.meta?.event_name,
            provider: WebhookProvider.LEMON_SQUEEZY,
            payload: req.rawBody,
            status: WebhookStatus.PENDING,
            retries: 0,
        }
    })

    // return 200
    return new Response(null, { status: 200 })
}