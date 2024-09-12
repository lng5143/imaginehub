import NextAuth from "next-auth";
import Resend from "next-auth/providers/resend";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "./auth.config";
import { prisma } from "./lib/prisma";
import { getUserByEmail } from "./data/user";

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
    callbacks: {
        async session({ session, token }) {
            if (token.sub && session.user)
                session.user.id = token.sub;

            if (token.tier && session.user)
                session.user.tier = token.tier;

            return session;
        },
        async jwt({ token }) {
            if (!token.sub) 
                return token;

            const existingUser = await getUserByEmail(token.email);
            if (!existingUser) 
                return token;

            token.tier = existingUser.tier;

            return token;
        }
    }
});