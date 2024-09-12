import BenefitItem from "./benefit-item";
import { BENEFITS } from "@/static-data/landing-page-data";

export default function BenefitsSection() {
    return (
        <div className="flex flex-col items-center gap-10 w-full px-32 py-10">
            <h2 className="text-2xl font-bold">Benefits</h2>
            <div className="flex gap-20 text-center">
                {BENEFITS.map((benefit, index) => (
                    <BenefitItem key={index} {...benefit} />
                ))}
            </div>
        </div>
    )
}