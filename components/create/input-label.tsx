import Hint from "../hint";
import { FormLabel } from "../ui/form";
import { Info } from "lucide-react";

interface InputLabelProps {
    label: string,
    hint: string
}

export default function InputLabel({ label, hint } : InputLabelProps) {
    return (
        <FormLabel className="flex justify-between items-center">
            <p className="">{label}</p>
            {hint && <Hint 
                text={hint}
                side="right"
                sideOffset={8}
                align="start"
            >
                <Info className="size-3.5 text-muted-foreground" />
            </Hint>}
        </FormLabel>
    )
}