import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import NavigationBar from "../components/nav/nav"

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"]
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${jetbrainsMono.className} flex flex-col h-screen`}>
        <NavigationBar />
        {children}
      </body>
    </html>
  );
}
