'use server'

import useCurrentUser from "@/hooks/use-current-user";
import { prisma } from "@/lib/prisma";
import { GeneralSettingsSchema } from "@/schemas";
import { auth } from "@/auth"

export async function updateGeneralSettings(values) {
    const session = await auth();

    if (!session.user) {
        return { error: "Unauthorized" }
    }

    const validatedValues = GeneralSettingsSchema.safeParse(values);
    
    if (!validatedValues.success) {
        return { error: "Invalid values"}
    }

    const { name } = validatedValues.data;

    await prisma.user.update({
        where: { id: session.user.id },
        data: { name}
    })

    return { success: "Settings updated successfully" }
}