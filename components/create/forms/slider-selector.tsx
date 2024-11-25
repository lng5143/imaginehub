import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";

interface SliderSelectorProps {
    field: any, 
    defaultValue: [number],
    min: number,
    max: number,
    step: number
}

export default function SliderSelector({ field, ...sliderProps } : SliderSelectorProps) {

    return (
        <div className="flex items-center gap-2 text-sm">
            <Slider {...sliderProps} />
            <Input>
            </Input>
        </div>
    )
}