import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomeNavBar() {
  return <div className="w-full px-10 py-5 absolute top-0 left-0 flex justify-end">
    <Button className="">
        <Link href="/pricing">Pricing</Link>
    </Button>
  </div>;
}