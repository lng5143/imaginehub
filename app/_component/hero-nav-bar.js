import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HeroNavBar() {
  return (
    <div className="w-full px-10 py-3 fixed top-0 left-0 flex justify-end bg-transparent z-10 backdrop-blur-sm border-b border-slate-950/20">
      <Button className="bg-indigo-950 text-white">
          <Link href="/pricing">Pricing</Link>
      </Button>
    </div>
  );
}