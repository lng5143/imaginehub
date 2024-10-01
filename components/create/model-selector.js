import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCurrentModel } from "@/store/use-current-model";

export default function ModelSelector() {
    const [currentModel, setCurrentModel] = useCurrentModel();

    const handleSelectModel = (model) => {
        
    }

    return (
        <Select value={currentModel} onValueChange={setCurrentModel}>
            <SelectTrigger>
                <SelectValue placeholder="Select a model" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="de-3">DALL-E 3</SelectItem>
                <SelectItem value="de-2">DALL-E 2</SelectItem>
                <SelectItem value="sd-3">Stable Diffusion 3</SelectItem>
                <SelectItem value="si-ultra">Stable Image Ultra</SelectItem>
                <SelectItem value="si-core">Stable Image Core</SelectItem>
            </SelectContent>
        </Select>
    );
}