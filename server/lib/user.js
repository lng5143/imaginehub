import { prisma } from "@/server/lib/prisma";
import { auth } from "@/auth";

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

export async function getCurrentUserId() {
    const session = await auth();
    return session?.user?.id;
}