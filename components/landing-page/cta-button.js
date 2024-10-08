import { useSession } from "next-auth/react";
import Link from "next/link";
import IBButton from "../ib-button";

export default function CTAButton({variant = "dark", ...props}) {
    const session = useSession();

    return (
        <IBButton variant={variant} className="w-60 text-lg font-semibold">
            <Link href={session.data ? "/create" : "/auth/signin"}>
                Get Started
            </Link>
        </IBButton>
    )
}