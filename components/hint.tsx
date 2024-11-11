import React from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

interface HintProps {
    children: React.ReactNode
    text: string, 
    side: "top" | "right" | "bottom" | "left"
    sideOffset: number,
    align: "center" | "end" | "start"
}

export default function Hint({ children, text, side, sideOffset, align }: HintProps) {
    return (
        <TooltipProvider delayDuration={100}>
            <Tooltip>
                <TooltipTrigger>{children}</TooltipTrigger>
                <TooltipContent 
                    side={side} 
                    sideOffset={sideOffset}
                    align={align} 
                    className="bg-white text-black border-none shadow-lg"
                >
                    <div className="flex flex-col gap-y-1">
                        {text.split('\n').map((line, index) => (
                            <p key={index} className="font-medium text-xs text-gray-800">{line}</p>
                        ))}
                    </div>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}