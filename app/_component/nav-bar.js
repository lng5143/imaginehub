import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NavBar() {
  return (
    <div className="w-full px-10 py-3 fixed top-0 left-0 flex justify-end bg-indigo-950 z-10 backdrop-blur-sm">
      <Button className="bg-white text-indigo-950">
          <Link href="/pricing">Pricing</Link>
      </Button>
    </div>
  );
}