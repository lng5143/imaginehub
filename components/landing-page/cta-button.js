import Link from "next/link";
import IBButton from "../ib-button";

export default function CTAButton({variant = "dark"}) {
    return (
        <IBButton variant={variant} className="w-60 text-lg font-semibold">
            <Link href="/create">
                Get Started
            </Link>
        </IBButton>
    )
}