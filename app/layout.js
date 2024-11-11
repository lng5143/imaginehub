import { DM_Sans, JetBrains_Mono, Josefin_Sans, Lato, Nunito, Plus_Jakarta_Sans, Poppins, Raleway } from "next/font/google";
import "./globals.css";
import { auth } from "../auth";
import { Toaster } from "sonner";
import Providers from "@/components/providers";

const dmSans = DM_Sans({
  subsets: ["latin"]
});

export const metadata = {
  title: "ImagineBox",
  description: "Simple tool to use your favorite image generation model",
};

export default async function RootLayout({ children }) {
  const session = await auth();

  return (
    <Providers session={session}>
      <html lang="en">
        <body className={`${dmSans.className} h-screen flex flex-col`}>
          {children}
          <Toaster richColors />
        </body>
      </html>
    </Providers>
  );
}
