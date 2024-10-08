import BenefitItem from "./benefit-item";
import { BENEFITS } from "@/static-data/landing-page-data";

export default function BenefitsSection() {
    return (
        <div className="flex flex-col items-center gap-10 w-full px-32 py-32">
            <h2 className="text-3xl font-bold">Free Your Imagination</h2>
            <div className="grid grid-cols-3 grid-rows-2 gap-x-10 gap-y-20">
                {BENEFITS.map((benefit, index) => (
                    <BenefitItem key={index} {...benefit} />
                ))}
            </div>
        </div>
    )
}