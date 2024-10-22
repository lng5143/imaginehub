'use client'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const queryClient = new QueryClient();

export default function CreatePostLayout({ children }) {
    const session = useSession();
    const router = useRouter();

    if (session?.data?.user?.tier !== "ADMIN") {
        router.push("/blog");
    }

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}