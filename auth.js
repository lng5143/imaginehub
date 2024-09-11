import NextAuth from "next-auth";
import Resend from "next-auth/providers/resend";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "./auth.config";
import { prisma } from "./lib/prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        ...authConfig.providers,
        Resend({
            from: "admin@imaginebox.me",
            secret: process.env.AUTH_RESEND_KEY,
        })
    ],
});