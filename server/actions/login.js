"use server"

import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schemas/index"

export async function login(values) {
    const validatedFields = LoginSchema.safeParse(values)

    if (!validatedFields.success) {
            return { success: false, message: "Invalid email!"};
    }

    const { email } = validatedFields.data;

    try {
        await signIn("resend", { 
            email,
            redirect: false,
            redirectTo: DEFAULT_LOGIN_REDIRECT
        })
    } catch (error) {
        throw error;
    }
    
    return { success: true, message: "Email sent!"};
}