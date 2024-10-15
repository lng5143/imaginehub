import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";

const IBButton = forwardRef(({ variant = "dark", children, ...props }, ref) => {
    return (
        <Button 
            ref={ref}
            className={cn(`shadow-xl hover:scale-105 transition-all duration-300  hover:bg-amber-500 hover:text-slate-950`, {
                "bg-indigo-950 text-white": variant === "dark",
                "bg-white text-black": variant === "light",
            })}
            {...props}
        >
            {children}
        </Button>
    )
});

IBButton.displayName = "IBButton";

export default IBButton;