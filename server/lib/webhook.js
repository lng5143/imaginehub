import { prisma } from "./prisma.js";
import { WebhookStatus, OrderStatus, UserTier } from "@prisma/client";

export async function isWebhookProcessed(webhookId) {
    const webhook = await prisma.webhook.findUnique({
        where: {
            id: webhookId
        }
    })

    return webhook?.status === WebhookStatus.PROCESSED;
}

export async function markWebhookAsProcessed(webhookId) {
    await prisma.webhook.update({
        where: { id: webhookId },
        data: { status: WebhookStatus.PROCESSED }
    })
}

export async function handlePaymentSuccess(payload) {
    console.log('handling payment success');
    const data = JSON.parse(payload);
    const orderId = data?.meta?.custom_data?.order_id;
    const userId = data?.meta?.custom_data?.user_id;

    console.log(data);

    // update order status 
    await prisma.order.update({
        where: { id: orderId },
        data: { status: OrderStatus.COMPLETED }
    })

    // update user tier 
    await prisma.user.update({
        where: { id: userId },
        data: { tier: UserTier.PAID }
    })
}

export async function getWebhookById(webhookId) {
    return await prisma.webhook.findUnique({
        where: { id: webhookId }
    })
}
