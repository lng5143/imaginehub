"use client"

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function HeroNavBar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  return (
    <div className={cn("w-full px-10 md:px-20 py-3 fixed top-0 left-0 flex items-center bg-transparent z-10 ", {
      "border-b border-gray-200 shadow-xl backdrop-blur-md": isScrolled,
    })}>
      <Link href="/" className="flex items-center w-40">
        <Image src="/logo/logo-dark-text.png" alt="logo" width={160} height={40} />
      </Link>
      <div className="flex-grow" />
      <div className="hidden md:flex gap-5 items-center">
        <Button variant="ghost" className="text-black hover:bg-amber-500 hover:text-slate-950 hover:scale-105 transition-all duration-300">
          <Link href="/models">Models</Link>
        </Button>
        <Button variant="ghost" className="text-black hover:bg-amber-500 hover:text-slate-950 hover:scale-105 transition-all duration-300">
          <Link href="/blog">Blog</Link>
        </Button>
        <Button className="shadow-xl bg-indigo-950 text-white hover:bg-amber-500 hover:text-slate-950 hover:scale-105 transition-all duration-300">
            <Link href="/pricing">Pricing</Link>
        </Button>
      </div>
    </div>
  );
}