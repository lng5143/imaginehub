import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HeroNavBar() {
  return (
    <div className="w-full px-10 py-3 fixed top-0 left-0 flex justify-end bg-transparent z-10 backdrop-blur-sm">
      <Button className="bg-indigo-950 text-white hover:bg-amber-500 hover:text-slate-950 hover:scale-105 transition-all duration-300">
          <Link href="/pricing">Pricing</Link>
      </Button>
    </div>
  );
}