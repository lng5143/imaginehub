import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

export default function Hint({ children, text, side, align }) {
    return (
        <TooltipProvider delayDuration={100}>
            <Tooltip>
                <TooltipTrigger>{children}</TooltipTrigger>
                <TooltipContent 
                    side={side} 
                    align={align} 
                    className="bg-black text-white border"
                >
                    <div className="flex flex-col gap-y-1">
                        {text.split('\n').map((line, index) => (
                            <p key={index} className="font-medium text-xs">{line}</p>
                        ))}
                    </div>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}