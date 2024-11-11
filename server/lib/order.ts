import { OrderStatus } from "@prisma/client"
import { prisma } from "./prisma"

export const createOrder = async (userId: string, amount: number) => {
    const order = await prisma.order.create({
        data: {
            userId,
            amount,
            status: OrderStatus.PENDING,
            currency: "USD",
        }
    })

    return { success: true, data: order}
}