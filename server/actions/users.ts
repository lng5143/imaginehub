'use server';

import { prisma } from "@/server/lib/prisma";
import { auth } from "@/auth";
import { User, UserTier } from "@prisma/client";
import { ApiResponse } from "@/types/response";
import { getCurrentUserId, getUserById } from "../lib/user";

export const getCurrentUserInfo = async () : Promise<User | null> => {
    const userId = await getCurrentUserId();

    if (!userId) {
        return null;
    }

    const user = await prisma.user.findUnique({
        where: { id: userId }
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
