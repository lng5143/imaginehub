import NextAuth from "next-auth";
import Resend from "next-auth/providers/resend";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "./auth.config";
import { prisma } from "./server/lib/prisma";
import { getUserByEmail } from "./server/lib/user";

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
            if (token.user && session.user) {
                session.user.id = token.user.id;
                session.user.tier = token.user.tier;
                session.user.name = token.user.name;
                session.user.email = token.user.email;
                session.user.image = token.user.image;
            }

            return session;
        },
        async jwt({ token }) {
            if (!token.sub) 
                return token;

            const existingUser = await getUserByEmail(token.email);
            if (!existingUser) 
                return token;

            token.user = existingUser;

            return token;
        }
    }
});