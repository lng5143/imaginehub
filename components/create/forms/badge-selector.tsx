import { Badge } from "@/components/ui/badge";

interface BadgeSelectorProps {
    field: any;
    options: string[];
}

export default function BadgeSelector({ field, options } : BadgeSelectorProps) {
    return (
        <div className="flex gap-1 flex-wrap">
            {options.map((item, index) => (
                <Badge
                    key={index}
                    variant={field.value === item ? "ibLightChosen" : "ibLight"}
                    onClick={() => field.onChange(item)}
                >
                    {item}
                </Badge>
            ))}
        </div>
    )
}