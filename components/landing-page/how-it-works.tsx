import { HOW_IT_WORKS } from "@/const/consts";
import HowItem from "./how-item";
import StepNumber from "./step-number";
import { FolderKey, KeyRound, PackagePlus } from "lucide-react";

export default function HowItWorksSection() {
    return (
        <div className="flex flex-col items-center gap-10 md:gap-20 w-full px-10 md:px-20 py-20 md:py-32">
            <h2 className="text-3xl font-bold text-center">Start Generating In Minutes</h2>
            <div className="flex flex-col gap-10">
                <div className="hidden md:flex w-full ">
                    <StepNumber variant="left" number="1" />
                    <StepNumber variant="middle" number="2" />
                    <StepNumber variant="right" number="3" />
                </div>
                <div className="flex flex-col md:flex-row gap-5 md:gap-10">
                    {<HowItem 
                        title={HOW_IT_WORKS[0].title} 
                        description={HOW_IT_WORKS[0].description} 
                        iconComp={<KeyRound className="w-20 h-20" />} 
                        // className="w-60 h-60"
                    />}
                    {<HowItem 
                        title={HOW_IT_WORKS[1].title} 
                        description={HOW_IT_WORKS[1].description} 
                        iconComp={<FolderKey className="w-20 h-20" />} 
                        // className="w-60 h-60"
                    />}
                    {<HowItem 
                        title={HOW_IT_WORKS[2].title} 
                        description={HOW_IT_WORKS[2].description} 
                        iconComp={<PackagePlus className="w-20 h-20" />} 
                        // className="w-60 h-60"
                    />}
                </div>
            </div>
        </div>
    )
}