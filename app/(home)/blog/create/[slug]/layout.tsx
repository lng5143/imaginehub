'use client'

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface CreatePostLayoutProps {
    children: React.ReactNode
}

export default function CreatePostLayout({ children } : CreatePostLayoutProps) {
    const session = useSession();
    const userTier = session.data?.user?.tier;
    const router = useRouter();

    if (!userTier || userTier !== "ADMIN") {
        router.push("/blog");
    }

    return (
            {children}
    )
}