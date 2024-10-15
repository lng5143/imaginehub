"use client"

import CardWrapper from "@/components/auth/card-wrapper";
import AuthForm from "@/components/auth/login-form";
import { useSearchParams } from "next/navigation";

export default function LoginPage() {
    const searchParams = useSearchParams();
    const error = searchParams.get("error");
    const urlError = error === "Verification" ? "Your verification link has expired. Please login again." : null;

    return (
        <div className="flex h-screen p-40">
            <CardWrapper headerLabel="Login">
                <AuthForm urlError={urlError} />
            </CardWrapper>
        </div>
    )
}