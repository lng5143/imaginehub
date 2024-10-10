import { Zap } from "lucide-react"


export default function BenefitItem({ title, description, icon }) {
    return (
        <div className="flex flex-col gap-5 basis-1/3 rounded-lg shadow-lg border border-slate-300 p-5 md:p-10">
            <div className="hidden md:block">
                {icon}
            </div>
            <div className="flex flex-col gap-2">
                <h3 className="font-bold text-lg">{title}</h3>
                <p className="text-sm text-gray-800">{description}</p>
            </div>
        </div>
    )
}