import { OrderStatus } from "@prisma/client"
import { prisma } from "./prisma"

export const createOrder = async (userId, amount) => {
    const order = await prisma.order.create({
        data: {
            userId,
            amount,
            status: OrderStatus.PENDING,
        }
    })

    return { success: true, data: order}
}