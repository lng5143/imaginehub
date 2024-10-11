import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { Toaster } from "sonner";
import HeroNavBar from "./_component/hero-nav-bar";
import Script from "next/script";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"]
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }) {
  const session = await auth();

  return (
    <>
    <Script
      src="https://app.lemonsqueezy.com/js/lemon.js"
      strategy="lazyOnload"
    />
    <SessionProvider session={session}>
      <html lang="en">
        <body className={`${jetbrainsMono.className} h-screen flex flex-col`}>
          {children}
          <Toaster richColors />
        </body>
      </html>
    </SessionProvider>
    </>
  );
}
