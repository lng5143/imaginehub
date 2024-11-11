'use client'

import { SessionProvider } from "next-auth/react"
import { Session } from "next-auth"
import { Provider as JotaiProvider } from "jotai"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

interface ProvidersProps {
    children: React.ReactNode,
    session: Session
}

const queryClient = new QueryClient();

export default function Providers({ children, session } : ProvidersProps) {
    return (
        <SessionProvider session={session}>
            <JotaiProvider>
                <QueryClientProvider client={queryClient}>
                    {children}
                </QueryClientProvider>
            </JotaiProvider>
        </SessionProvider>
    )
}