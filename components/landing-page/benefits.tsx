import { FolderUp, KeyRound, ShieldCheck, Wallet, Zap, Infinity } from "lucide-react";
import BenefitItem from "./benefit-item";
import { BENEFITS } from "@/static-data/landing-page-data";

export default function BenefitsSection() {
    return (
        <div className="flex flex-col items-center gap-10 w-full px-10 py-20 md:px-32 md:py-32">
            <h2 className="text-3xl font-bold text-center">Free Your Imagination</h2>
            <div className="flex flex-col gap-4 lg:grid lg:grid-cols-3 lg:grid-rows-2 lg:gap-x-10 lg:gap-y-10">
                <BenefitItem 
                    title={BENEFITS[0].title}
                    description={BENEFITS[0].description}
                    iconComp={<KeyRound className="w-10 h-10" />}
                />
                <BenefitItem 
                    title={BENEFITS[1].title}
                    description={BENEFITS[1].description}
                    iconComp={<Infinity className="w-10 h-10" />}
                />
                <BenefitItem 
                    title={BENEFITS[2].title}
                    description={BENEFITS[2].description}
                    iconComp={<ShieldCheck className="w-10 h-10" />}
                />
                <BenefitItem 
                    title={BENEFITS[3].title}
                    description={BENEFITS[3].description}
                    iconComp={<Wallet className="w-10 h-10" />}
                />
                <BenefitItem 
                    title={BENEFITS[4].title}
                    description={BENEFITS[4].description}
                    iconComp={<Zap className="w-10 h-10" />}
                />
                <BenefitItem 
                    title={BENEFITS[5].title}
                    description={BENEFITS[5].description}
                    iconComp={<FolderUp className="w-10 h-10" />}
                />
            </div>
        </div>
    )
}