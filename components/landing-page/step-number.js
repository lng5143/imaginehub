import { cn } from "@/lib/utils"

export default function StepNumber({ variant, number }) {
    return (
        <div className="relative w-full">
            <div className="flex w-full h-1.5">
                <div className={cn("basis-1/2", variant === "left" ? "bg-transparent" : "bg-indigo-200")} />
                <div className={cn("basis-1/2", variant === "right" ? "bg-transparent" : "bg-indigo-200")} />
            </div>
            <div 
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 shadow-lg bg-indigo-950 text-white text-xl font-bold flex items-center justify-center rounded-full">
                {number}
            </div>
        </div>
    )
} 