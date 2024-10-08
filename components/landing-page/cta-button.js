import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
export default function CTAButton({variant = "dark"}) {
    const session = useSession();
    return (
        <Button 
            className={cn("hover:scale-105 transition-all duration-300  hover:bg-amber-500 hover:text-slate-950", {
                "bg-indigo-950 text-white": variant === "dark",
                "bg-white text-slate-950": variant === "light",
            })}
        >
            <Link href={session.data ? "/create" : "/auth/signin"}>
                Get Started
            </Link>
        </Button>
    )
}