import Hint from "../hint";
import { FormLabel } from "../ui/form";
import { Info } from "lucide-react";

export default function InputLabel({ label, hint }) {
    return (
        <FormLabel className="flex justify-between items-center">
            <p>{label}</p>
            {hint && <Hint 
                text={hint}
                side="right"
                align="start"
            >
                <Info className="size-3.5 text-muted-foreground" />
            </Hint>}
        </FormLabel>
    )
}