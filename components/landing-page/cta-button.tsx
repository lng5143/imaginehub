import Link from "next/link";
import { Button } from "../ui/button";

interface CTAButtonProps {
    variant?: "ibDark" | "ibLight"
}

export default function CTAButton({ variant } : CTAButtonProps) {
    return (
        <Button variant={variant} className="w-60 text-lg font-semibold" asChild>
            <Link href="/create">
                Get Started
            </Link>
        </Button>
    )
}