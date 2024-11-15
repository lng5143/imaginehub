'use server';

import { prisma } from "@/server/lib/prisma";
import { auth } from "@/auth";
import { User, UserTier } from "@prisma/client";
import { ApiResponse } from "@/types/response";
import { getCurrentUserId, getUserById } from "../lib/user";
import { ResponseFactory } from "@/types/response";

export const getCurrentUser = async () : Promise<User | null> => {
    const userId = await getCurrentUserId();
    if (!userId) {
        return null;
    }

    const user = await prisma.user.findUnique({
        where: { id: userId }
    })

    return user;
}

export const updateUserCredits = async () : Promise<ApiResponse<User>> => {
    const user = await getCurrentUser();
    if (!user) return ResponseFactory.fail({ message: "User not found" });


    if (user.tier === UserTier.PAID) {
        return ResponseFactory.success({});
    }

    await prisma.user.update({
        where: { id: user.id },
        data: {
            trialCredits: user.trialCredits - 1
        }
    })
    
    return ResponseFactory.success({});
}
