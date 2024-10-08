import { cn } from "@/lib/utils"

export default function StepNumber({ variant, number }) {
    return (
        <div className="relative w-full">
            <div className="flex w-full h-2">
                <div className={cn("basis-1/2", variant === "left" ? "bg-transparent" : "bg-indigo-950")} />
                <div className={cn("basis-1/2", variant === "right" ? "bg-transparent" : "bg-indigo-950")} />
            </div>
            <div 
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 shadow-lg bg-amber-500 text-black text-2xl font-bold flex items-center justify-center rounded-full">
                {number}
            </div>
        </div>
    )
} 