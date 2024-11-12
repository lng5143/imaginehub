import { Zap } from "lucide-react"

interface BenefitItemProps {
    title: string;
    description: string;
    iconComp: React.ReactNode;
}

export default function BenefitItem({ title, description, iconComp } : BenefitItemProps) {
    return (
        <div className="flex flex-col gap-5 basis-1/3 rounded-lg shadow-lg border border-slate-300 p-5 md:p-10">
            <div className="hidden md:block">
                {iconComp}
            </div>
            <div className="flex flex-col gap-2">
                <h3 className="font-bold text-lg">{title}</h3>
                <p className="text-sm text-gray-800">{description}</p>
            </div>
        </div>
    )
}