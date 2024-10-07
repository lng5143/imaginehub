import { useSession } from "next-auth/react";
import Link from "next/link";

export default function CTAButton() {
    const session = useSession();
    return (
        <Link href={session.data ? "/create" : "/auth/signin"} className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Get Started
        </Link>
    )
}