import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

export default function Hint({ children, text, side, sideOffset, align }) {
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