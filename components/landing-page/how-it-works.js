import { HOW_IT_WORKS } from "@/static-data/landing-page-data";
import HowItem from "./how-item";
import StepNumber from "./step-number";

export default function HowItWorksSection() {
    return (
        <div className="flex flex-col items-center gap-20 w-full px-20 py-32">
            <h2 className="text-3xl font-bold">Start Generating In Minutes</h2>
            <div className="flex flex-col gap-10">
                <div className="flex w-full ">
                    <StepNumber variant="left" number="1" />
                    <StepNumber variant="middle" number="2" />
                    <StepNumber variant="right" number="3" />
                </div>
                <div className="flex">
                    {HOW_IT_WORKS.map((item, index) => (
                        <HowItem key={index} title={item.title} description={item.description} />
                    ))}
                </div>
            </div>
        </div>
    )
}