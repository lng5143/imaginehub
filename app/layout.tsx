import { DM_Sans, JetBrains_Mono, Josefin_Sans, Lato, Nunito, Plus_Jakarta_Sans, Poppins, Raleway } from "next/font/google";
import "./globals.css";
import { auth } from "../auth";
import { Toaster } from "sonner";
import Providers from "@/components/providers";
import Script from "next/script";

const dmSans = DM_Sans({
  subsets: ["latin"]
});

export const metadata = {
  title: "ImagineBox",
  description: "Simple tool to use your favorite image generation model",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children } : RootLayoutProps) {
  const session = await auth();

  return (
    <Providers session={session}>
      <html lang="en">
        <body className={`${dmSans.className} h-screen flex flex-col`}>
          {children}
          <Toaster richColors />
          <Script src="https://scripts.simpleanalyticscdn.com/latest.js" />
          <Script defer src="https://cloud.umami.is/script.js" data-website-id="1e31543c-e121-4086-be58-a65e1559ca14"></Script>
        </body>
      </html>
    </Providers>
  );
}
