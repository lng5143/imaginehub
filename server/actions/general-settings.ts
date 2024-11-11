'use server'

import { prisma } from "@/server/lib/prisma";
import { GeneralSettingsSchema } from "@/schemas";
import z from 'zod'
import { getCurrentUserId } from "../lib/user";
import { ResponseFactory } from "@/types/response";

export async function updateGeneralSettings(values: z.infer<typeof GeneralSettingsSchema>) {
    const userId = await getCurrentUserId();
    if (!userId) {
        return ResponseFactory.fail({ message: "User not found" })
    }

    const validatedValues = GeneralSettingsSchema.safeParse(values);
    
    if (!validatedValues.success) {
        return { error: "Invalid values"}
    }

    const { name } = validatedValues.data;

    await prisma.user.update({
        where: { id: userId },
        data: { name}
    })

    return { success: "Settings updated successfully" }
}