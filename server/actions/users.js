'use server';

import { prisma } from "@/server/lib/prisma";
import { auth } from "@/auth";
import { UserTier } from "@prisma/client";
import { DE2FormSchema, DE3FormSchema, SD3FormSchema, SICoreFormSchema, SIUltraFormSchema } from "@/schemas";

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

export const validateGenerateImage = async (userId, data) => {
    const user = await prisma.user.findUnique({
        where: { id: userId }
    })

    if (!user) {
        return { success: false, message: "User not found" }
    }

    if (user.trialCredits <= 0 && user.tier === UserTier.FREE) {
        return { success: false, message: "You have run out of trial credits. Please upgrade to continue generating images." }
    }

    let validatedFields;
    switch (data.model) {
        case "de-2": 
            validatedFields = DE2FormSchema.safeParse(data);
            break;
        case "de-3":
            validatedFields = DE3FormSchema.safeParse(data);
            break;
        case "sd3-medium":
        case "sd3-large":
        case "sd3-large-turbo":
            validatedFields = SD3FormSchema.safeParse(data);
            break;
        case "si-core":
            validatedFields = SICoreFormSchema.safeParse(data);
            break;
        case "si-ultra":
            validatedFields = SIUltraFormSchema.safeParse(data);
            break;
        default:
            return { success: false, message: "Invalid model" }
    }

    if (!validatedFields.success) {
        return { success: false, message: validatedFields.error.errors[0].message }
    }

    return { success: true, data: validatedFields.data }
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
