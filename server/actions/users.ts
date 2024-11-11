'use server';

import { prisma } from "@/server/lib/prisma";
import { auth } from "@/auth";
import { UserTier } from "@prisma/client";

export const getCurrentUserInfo = async () => {
    const session = await auth();

    if (!session?.user) {
        return null;
    }

    const user = await prisma.user.findUnique({
        where: { id: session.user.id }
    })

    return user;
}

export const updateUserCredits = async (userId: string) => {
    const user = await prisma.user.findUnique({
        where: { id: userId }
    })

    if (!user) {
        return { error: "User not found" }
    }

    if (user.tier === UserTier.PAID) {
        return { success: true }
    }

    await prisma.user.update({
        where: { id: userId },
        data: {
            trialCredits: user.trialCredits - 1
        }
    })
    
    return { success: true }
}
