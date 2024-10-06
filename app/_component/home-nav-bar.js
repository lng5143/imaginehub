import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomeNavBar() {
  return (
    <div className="w-full px-10 py-5 fixed top-0 left-0 flex justify-end bg-white z-10 bg-opacity-50 backdrop-blur-sm border-b border-gray-300">
      <Button className="">
          <Link href="/pricing">Pricing</Link>
      </Button>
    </div>
  );
}