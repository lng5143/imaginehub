import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

export default function IBButton({variant = "dark", children, ...props}) {
    return (
        <Button 
            className={cn("hover:scale-105 transition-all duration-300  hover:bg-amber-500 hover:text-slate-950", {
                "bg-indigo-950 text-white": variant === "dark",
                "bg-white text-slate-950": variant === "light",
                ...props.className
            })}
            {...props}
        >
            {children}
        </Button>
    )
}