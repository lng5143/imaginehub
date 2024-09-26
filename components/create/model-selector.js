import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCurrentModel } from "@/store/use-current-model";

export default function ModelSelector() {
    const [currentModel, setCurrentModel] = useCurrentModel();

    return (
        <Select defaultValue={currentModel} onValueChange={setCurrentModel}>
            <SelectTrigger>
                <SelectValue placeholder="Select a model" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="dall-e-3">DALL-E 3</SelectItem>
                <SelectItem value="dall-e-2">DALL-E 2</SelectItem>
                <SelectItem value="stable-diffusion">Stable Diffusion</SelectItem>
            </SelectContent>
        </Select>
    );
}