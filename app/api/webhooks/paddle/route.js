import { paddle } from "@/server/lib/paddle";
import { EventName } from "@paddle/paddle-node-sdk";
import { prisma } from "@/server/lib/prisma";

export async function POST(req) {
    const signature = req.headers["paddle-signature"];
    const rawRequestBody = req.body.toString();

    const secretKey = process.env.PADDLE_WEBHOOK_SECRET_KEY;

    try {
        if (signature && rawRequestBody) {
            const eventData = paddle.webhooks.unmarshal(rawRequestBody, secretKey, signature);
            
            console.log(eventData); // TODO: check all event types
            switch(eventData.eventType) {
                case EventName.SubscriptionPaymentSucceeded: 
                    handlePaymentSuccess(eventData);
                    break;
            }
        }
    } catch (error) {
        console.error(error);
        // handle signature verification failure
    }
}

function handlePaymentSuccess(eventData) {
    // TODO: update user

    console.log("Payment success", eventData);
}