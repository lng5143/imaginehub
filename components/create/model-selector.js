import { useCurrentModel } from "@/store/use-current-model";
import { MODELS } from "@/const/imagine-box-consts";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function ModelSelector() {
    const [currentModel, setCurrentModel] = useCurrentModel();
    const [openModelSelector, setOpenModelSelector] = useState(false);

    const handleSelectModel = (model) => {
        
    }

    return (
        // <Select value={currentModel} onValueChange={setCurrentModel}>
        //     <SelectTrigger>
        //         <SelectValue placeholder="Select a model" />
        //     </SelectTrigger>
        //     <SelectContent>
        //         <SelectItem value="de-3">DALL-E 3</SelectItem>
        //         <SelectItem value="de-2">DALL-E 2</SelectItem>
        //         <SelectItem value="sd-3">Stable Diffusion 3</SelectItem>
        //         <SelectItem value="si-ultra">Stable Image Ultra</SelectItem>
        //         <SelectItem value="si-core">Stable Image Core</SelectItem>
        //     </SelectContent>
        // </Select>
        <Popover open={openModelSelector} onOpenChange={setOpenModelSelector}>
            <PopoverTrigger asChild>
                <Button variant="outline" role="combobox" aria-expanded={openModelSelector} className="w-full justify-between">
                    {currentModel.name ? currentModel.name : "Select a model"}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="">
                <Command>
                    <CommandInput placeholder="Search model..." />
                    <CommandList>
                        <CommandEmpty>No model found.</CommandEmpty>
                        <CommandGroup>
                            {MODELS.map((model) => (
                                <CommandItem 
                                    key={model.code} 
                                    value={model.name}
                                    onSelect={() => {
                                        setCurrentModel(model)
                                        setOpenModelSelector(false)
                                    }}
                                >
                                    <Check
                                        className={cn(
                                        "mr-2 h-4 w-4",
                                        currentModel === model.code ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {model.name}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}