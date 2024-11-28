import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function NavBar() {
  return (
    <div className="w-full px-10 md:px-20 py-3 fixed top-0 left-0 flex items-center bg-indigo-950 z-10 backdrop-blur-sm">
      <Link href="/" className="flex items-center flex-grow w-40">
        <Image src="/logo/logo-white-text.png" alt="logo" className="w-40" width={160} height={40} />
      </Link>
      <div className="flex gap-5 items-center">
        <Button variant="ghost" className="text-white hover:bg-amber-500 hover:text-slate-950 hover:scale-105 transition-all duration-300">
          <Link href="/models">Models</Link>
        </Button>
        <Button variant="ghost" className="text-white hover:bg-amber-500 hover:text-slate-950 hover:scale-105 transition-all duration-300">
          <Link href="/blog">Blog</Link>
        </Button>
        <Button className="bg-white text-indigo-950 hover:bg-amber-500 hover:scale-105 transition-all duration-300">
          <Link href="/pricing">Pricing</Link>
        </Button>
      </div>
    </div>
  );
}