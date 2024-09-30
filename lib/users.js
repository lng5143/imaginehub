import { prisma } from "@/lib/prisma";

export const getUserByEmail = async (email) => {
    const user = await prisma.user.findUnique({
        where: {
            email: email
        }
    })
}