import { prisma } from "./prisma.js";
import { WebhookStatus, OrderStatus, UserTier } from "@prisma/client";

export async function isWebhookProcessed(webhookId: string) {
    const webhook = await prisma.webhook.findUnique({
        where: {
            id: webhookId
        }
    })

    return webhook?.status === WebhookStatus.PROCESSED;
}

export async function markWebhookAsProcessed(webhookId: string) {
    await prisma.webhook.update({
        where: { id: webhookId },
        data: { status: WebhookStatus.PROCESSED }
    })
}

export async function markWebhookAsProcessing(webhookId: string) {
    await prisma.webhook.update({
        where: { id: webhookId },
        data: { status: WebhookStatus.PROCESSING }
    })
}

export async function handleWebhookFailure(webhookId: string, orderId: string) {
    const webhook = await prisma.webhook.findUnique({
        where: { id: webhookId }
    })

    if (!webhook) {
        throw new Error('Webhook not found');
    }

    if (webhook.retries >= 4) {
        await prisma.webhook.update({
            where: { id: webhookId },
            data: { status: WebhookStatus.FAILED }
        })
        await prisma.order.update({
            where: { id: orderId },
            data: { status: OrderStatus.FAILED }
        })
    } else {
        await prisma.webhook.update({
            where: { id: webhookId },
            data: { retries: webhook.retries + 1 }
        })

    }
}

export async function handlePaymentSuccess(userId: string, orderId: string) {
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

export async function getWebhookById(webhookId: string) {
    return await prisma.webhook.findUnique({
        where: { id: webhookId }
    })
}
