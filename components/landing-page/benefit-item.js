import { Zap } from "lucide-react"


export default function BenefitItem({ title, description, icon }) {
    return (
        <div className="flex flex-col gap-5 basis-1/3 rounded-lg shadow-md border border-slate-300 p-10">
            <Zap className="w-10 h-10" />
            <div className="flex flex-col gap-2">
                <h3 className="font-bold">{title}</h3>
                <p className="text">{description}</p>
            </div>
        </div>
    )
}