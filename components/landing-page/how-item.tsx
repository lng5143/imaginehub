import React from "react";

interface HowItemProps {
    title: string;
    description: string;
    iconComp: React.ReactNode
}

export default function HowItem({ title, description, iconComp } : HowItemProps) {
    return (
        <div className="flex flex-col gap-5 basis-1/3 rounded-lg p-6 lg:p-12 items-center">
            {iconComp}
            <div className="flex flex-col gap-2 text-center">
                <h3 className="text-lg font-bold">{title}</h3>
                <p className="text-sm text-gray-800">{description}</p>
            </div>
        </div>
    )
}