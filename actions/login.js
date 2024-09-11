"use server"

import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schemas/index"
import { AuthError } from "next-auth";

export async function loginWithEmail(values) {
    const validatedFields = LoginSchema.safeParse(values)

    if (!validatedFields.success) {
            return { error: "Invalid email!"};
    }

    const { email } = validatedFields.data;

    try {
        await signIn("resend", { 
            email,
            redirectTo: DEFAULT_LOGIN_REDIRECT
        })
    } catch (error) {
        console.log(error);
        throw error;
    }
    
    return { success: "Email sent!"};
}