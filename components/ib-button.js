import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

export default function IBButton({variant = "dark", children, className}) {
    return (
        <Button 
            className={cn(`shadow-xl hover:scale-105 transition-all duration-300  hover:bg-amber-500 hover:text-slate-950 ${className}`, {
                "bg-indigo-950 text-white": variant === "dark",
                "bg-white text-slate-950": variant === "light",
            })}
        >
            {children}
        </Button>
    )
}