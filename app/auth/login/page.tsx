"use client"

import CardWrapper from "@/components/auth/card-wrapper";
import AuthForm from "@/components/auth/login-form";
import { useSearchParams } from "next/navigation";

export default function LoginPage() {
    const searchParams = useSearchParams();
    const error = searchParams.get("error");
    const urlError = error === "Verification" ? "Your verification link has expired. Please login again." : undefined;

    return (
        <div className="flex flex-col gap-4 items-center justify-center h-screen p-40">
            <CardWrapper headerLabel="Login" className="bg-indigo-950">
                <AuthForm />
            </CardWrapper>
            <p className="text-red-500 font-bold">{urlError}</p>
        </div>
    )
}