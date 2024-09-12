import NextAuth from "next-auth";
import Resend from "next-auth/providers/resend";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "./auth.config";
import { prisma } from "./lib/prisma";

export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth({
    pages: {
        signIn: "/",
        error: "/auth/login",
    },
    adapter: PrismaAdapter(prisma),
    secret: process.env.AUTH_SECRET,
    session: { strategy: "jwt" },
    providers: [
        ...authConfig.providers,
        Resend({
            from: "admin@imaginebox.me",
            secret: process.env.AUTH_RESEND_KEY,
            maxAge: 5 * 60
        })
    ],
});