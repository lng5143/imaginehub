import { FolderUp, KeyRound, ShieldCheck, Wallet, Zap, Infinity } from "lucide-react";
import BenefitItem from "./benefit-item";
import { BENEFITS } from "@/static-data/landing-page-data";

export default function BenefitsSection() {
    return (
        <div className="flex flex-col items-center gap-10 w-full px-32 py-32">
            <h2 className="text-3xl font-bold">Free Your Imagination</h2>
            <div className="grid grid-cols-3 grid-rows-2 gap-x-10 gap-y-10">
                <BenefitItem 
                    title={BENEFITS[0].title}
                    description={BENEFITS[0].description}
                    icon={<KeyRound className="w-10 h-10" />}
                />
                <BenefitItem 
                    title={BENEFITS[1].title}
                    description={BENEFITS[1].description}
                    icon={<Infinity className="w-10 h-10" />}
                />
                <BenefitItem 
                    title={BENEFITS[2].title}
                    description={BENEFITS[2].description}
                    icon={<ShieldCheck className="w-10 h-10" />}
                />
                <BenefitItem 
                    title={BENEFITS[3].title}
                    description={BENEFITS[3].description}
                    icon={<Wallet className="w-10 h-10" />}
                />
                <BenefitItem 
                    title={BENEFITS[4].title}
                    description={BENEFITS[4].description}
                    icon={<Zap className="w-10 h-10" />}
                />
                <BenefitItem 
                    title={BENEFITS[5].title}
                    description={BENEFITS[5].description}
                    icon={<FolderUp className="w-10 h-10" />}
                />
            </div>
        </div>
    )
}