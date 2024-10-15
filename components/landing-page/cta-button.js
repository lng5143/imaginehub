import Link from "next/link";
import { Button } from "../ui/button";

export default function CTAButton({variant = "ibDark"}) {
    return (
        <Button variant={variant} className="w-60 text-lg font-semibold">
            <Link href="/create">
                Get Started
            </Link>
        </Button>
    )
}