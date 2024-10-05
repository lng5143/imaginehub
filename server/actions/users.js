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
        return { error: "User not found" }
    }

    if (user.trialCredits <= 0 && user.tier === UserTier.FREE) {
        return { error: "You have run out of trial credits" }
    }

    return { success: true }
}