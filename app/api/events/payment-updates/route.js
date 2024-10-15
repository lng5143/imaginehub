import { prisma } from "@/server/lib/prisma";
import { OrderStatus, UserTier } from "@prisma/client";

const MAX_DURATION = 5 * 60 * 1000;
const INTERVAL = 2000;

export async function GET(req) {
    const headers = new Headers({
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      });

    const { searchParams } = new URL(req.url);
    const orderId = searchParams.get('orderId');

    if (!orderId) {
        return new Response('orderId is required', { status: 400 });
    }

    const stream = new ReadableStream({
        async start(controller) {
            controller.enqueue(encodeText('data: connected\n\n'));

            let lastStatus = null;
            let intervalId;
            let startTime = Date.now();
            const checOrderStatus = async () => {
                console.log("polling db");
                try {
                    const order = await prisma.order.findUnique({
                        where: {
                            id: orderId,
                        },
                        include: {
                            user: true,
                        }
                    })

                    if (!order) {
                        throw new Error('Order not found');
                    }

                    if (order.status !== lastStatus) {
                        lastStatus = order.status;

                        if (order.status === OrderStatus.COMPLETED && order.user.tier === UserTier.PAID) {
                            
                            clearInterval(intervalId);
                            controller.close();
                            return;
                        }
                    }

                    if (Date.now() - startTime > MAX_DURATION) {
                        controller.enqueue(encodeText(`data: timeout\n\n`));
                        clearInterval(intervalId);
                        controller.close();
                        return;
                    }

                } catch (error) {
                    console.error(error);
                    controller.enqueue(encodeText(`data: error\n\n`));
                    clearInterval(intervalId);
                    controller.close();
                }
            }

            intervalId = setInterval(checOrderStatus, INTERVAL);

            req.signal.addEventListener('abort', () => {
                clearInterval(intervalId);
                controller.close();
            })
        }
    })
}

function encodeText(text) {
    return new TextEncoder().encode(text);
}