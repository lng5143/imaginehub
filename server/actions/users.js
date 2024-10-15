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

export const validateGenerateImage = async (userId) => {
    const user = await prisma.user.findUnique({
        where: { id: userId }
    })

    if (!user) {
        return { success: false, message: "User not found" }
    }

    if (user.trialCredits <= 0 && user.tier === UserTier.FREE) {
        return { success: false, message: "You have run out of trial credits" }
    }

    return { success: true }
}

export const updateUserCredits = async (userId) => {

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
