import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";

interface SliderSelectorProps {
    field: any, 
    min: number,
    max: number,
    step: number
}

export default function SliderSelector({ field, min, max, step } : SliderSelectorProps) {
    return (
        <div className="flex items-center gap-3 text-sm">
            <Slider 
                value={[field.value]}
                min={min}
                max={max}
                step={step}
                onValueChange={(value) => {
                    field.onChange(value[0]);
                }}
                className="flex-grow"
            />
            <Input
                value={field.value}
                onChange={(e) => {field.onChange(e.target.value)}}
                onBlur={(e) => {
                    const value = parseFloat(e.target.value);
                    const roundedValue = Math.round(value / step) * step;
                    field.onChange(Math.min(Math.max(roundedValue, min), max));
                }}
                className="w-[80px] bg-white text-xs truncate"
            />
        </div>
    )
}