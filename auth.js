import NextAuth from "next-auth";
import Resend from "next-auth/providers/resend";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./server/lib/prisma";
import { getUserByEmail } from "./server/lib/user";
import Google from "next-auth/providers/google";

export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth({
    theme: {brandColor: '#1e1b4b'},
    pages: {
        signIn: "/",
        error: "/auth/login",
    },
    adapter: PrismaAdapter(prisma),
    secret: process.env.AUTH_SECRET,
    session: { strategy: "jwt" },
    providers: [
        Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
            allowDangerousEmailAccountLinking: true,
        }),
        Resend({
            from: "admin@imaginebox.me",
            secret: process.env.AUTH_RESEND_KEY,
            maxAge: 5 * 60,
            sendVerificationRequest: async ({ identifier: to, url, provider, theme }) => {
                const { host } = new URL(url)
                const res = await fetch("https://api.resend.com/emails", {
                    method: "POST",
                    headers: {
                    Authorization: `Bearer ${provider.apiKey}`,
                    "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        from: provider.from,
                        to,
                        subject: `Sign in to ${host}`,
                        html: html({ url, host, theme }),
                        text: text({ url, host }),
                    }),
                })
 
                if (!res.ok)
                    throw new Error("Resend error: " + JSON.stringify(await res.json()))
            }
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
                session.user.trialCredits = token.user.trialCredits;
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

function html(params) {
    const { url, host, theme } = params
   
    const escapedHost = host.replace(/\./g, "&#8203;.")
   
    const brandColor = theme.brandColor || "#346df1"
    const color = {
      background: "#f9f9f9",
      text: "#444",
      mainBackground: "#fff",
      buttonBackground: brandColor,
      buttonBorder: brandColor,
      buttonText: theme.buttonText || "#fff",
    }
   
    return `
  <body style="background: ${brandColor};">
    <table width="100%" border="0" cellspacing="20" cellpadding="0"
      style="background: ${color.mainBackground}; max-width: 600px; margin: auto;">
      <tr
        style="width: 100px;"
      >
        <img src="https://ib-project-assets.s3.eu-central-1.amazonaws.com/logo-dark-text.png" alt="ImagineBox" />
      </tr>
      <tr>
        <td align="start"
          style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
          Sign in to <strong>${escapedHost}</strong>
        </td>
      </tr>
      <tr>
        <td align="start"
          style="padding: 10px 0px; font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
          Click the button below to login to ${escapedHost} using your email. This link will expire after 5 minutes.
        </td>
      </tr>
      <tr>
        <td align="start" style="padding: 20px 0;">
          <table border="0" cellspacing="0" cellpadding="0">
            <tr>
              <td align="start" style="border-radius: 5px;" bgcolor="${color.buttonBackground}"><a href="${url}"
                  target="_blank"
                  style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${color.buttonText}; text-decoration: none; border-radius: 5px; padding: 10px 20px; border: 1px solid ${color.buttonBorder}; display: inline-block; font-weight: bold;">Sign
                  in</a></td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td align="start"
          style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
          If you did not request this email you can safely ignore it.
        </td>
      </tr>
    </table>
  </body>
  `
  }
   
  function text({ url, host }) {
    return `Sign in to ${host}\n${url}\n\n`
  }