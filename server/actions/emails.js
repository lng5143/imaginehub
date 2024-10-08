"use server"

import { EmailFormSchema } from "@/schemas"
import { prisma } from "../lib/prisma"

export const saveEmail = async (email) => {
    const validatedFields = EmailFormSchema.safeParse({ email });

    if (!validatedFields.success) {
        return { error: validatedFields.error.errors[0].message }
    }

    const emailExists = await prisma.email.findUnique({
        where: {
            email: email
        }
    })

    if (emailExists) {
        return { error: "You are already subscribed using this email!" }
    }

    await prisma.email.create({
        data: {
            email: email
        }
    })

    return { success: "You have been subscribed to our newsletter!" }
}