import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { Toaster } from "sonner";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"]
});

export const metadata = {
  title: "ImagineBox",
  description: "Simple tool to use your favorite image generation model",
};

export default async function RootLayout({ children }) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={`${jetbrainsMono.className} h-screen flex flex-col`}>
          {children}
          <Toaster richColors />
        </body>
      </html>
    </SessionProvider>
  );
}
