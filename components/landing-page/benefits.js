import BenefitItem from "./benefit-item";
import { BENEFITS } from "@/data/landing-page-data";

export default function BenefitsSection() {
    return (
        <div className="flex gap-20 px-32">
            {BENEFITS.map((benefit, index) => (
                <BenefitItem key={index} {...benefit} />
            ))}
        </div>
    )
}