import { prisma } from "@/server/lib/prisma";

export async function getUserById(id) {
    return await prisma.user.findUnique({
        where: {
            id
        }
    })
}

export async function getUserByEmail(email) {
    return await prisma.user.findFirst({
        where: {
            email
        }
    })
}