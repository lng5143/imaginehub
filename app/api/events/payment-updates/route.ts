import { prisma } from "@/server/lib/prisma";
import { OrderStatus, UserTier } from "@prisma/client";
import { PAYMENT_UPDATES_STATUS } from "@/const/consts";

const MAX_DURATION = 2 * 60 * 1000;
const INTERVAL = 2000;

export async function GET(req : Request) {
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
            controller.enqueue(encodeText('connected\n\n'));

            let lastStatus : OrderStatus;
            let interval : NodeJS.Timeout;
            let startTime = Date.now();
            const checOrderStatus = async () => {
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
                            controller.enqueue(encodeText(`data: {"status": "${PAYMENT_UPDATES_STATUS.success}", "orderId": "${order?.id}"}\n\n`));
                            clearInterval(interval);
                            controller.close();
                            return;
                        }
                    }

                    if (Date.now() - startTime > MAX_DURATION) {
                        controller.enqueue(encodeText(`data: {"status": "${PAYMENT_UPDATES_STATUS.timeOut}", "orderId": "${order?.id}"}\n\n`));
                        clearInterval(interval);
                        controller.close();
                        return;
                    }

                } catch (error) {
                    console.error(error);
                    controller.enqueue(encodeText(`data: {"status": "${PAYMENT_UPDATES_STATUS.failed}"}\n\n`));
                    clearInterval(interval);
                    controller.close();
                }
            }

            interval = setInterval(checOrderStatus, INTERVAL);

            req.signal.addEventListener('abort', () => {
                clearInterval(interval);
                controller.close();
            })
        }
    })

    return new Response(stream, { headers });
}

function encodeText(text : string) {
    return new TextEncoder().encode(text);
}