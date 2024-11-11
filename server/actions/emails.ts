"use server"

import { EmailFormSchema } from "@/schemas"
import { prisma } from "../lib/prisma"
import { z } from "zod";

export const saveEmail = async (data: z.infer<typeof EmailFormSchema>) => {
    const emailExists = await prisma.email.findUnique({
        where: {
            email: data.email
        }
    })

    if (emailExists) {
        return { error: "You are already subscribed using this email!" }
    }

    await prisma.email.create({
        data: {
            email: data.email
        }
    })

    return { success: "You have been subscribed to our newsletter!" }
}