import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import IBButton from "../ib-button";
export default function CTAButton({variant = "dark"}) {
    const session = useSession();

    return (
        <IBButton variant={variant}>
            <Link href={session.data ? "/create" : "/auth/signin"}>
                Get Started
            </Link>
        </IBButton>
    )
}