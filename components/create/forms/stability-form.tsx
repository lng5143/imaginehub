import { Textarea } from "../../ui/textarea";
import { Button } from "../../ui/button";
import { FormControl, FormField, FormItem, FormMessage } from "../../ui/form";
import CreateBaseForm from "./create-base-form";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useCurrentModel } from "@/store/use-current-model";
import InputLabel from "../input-label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { Command, CommandInput, CommandList, CommandItem, CommandEmpty, CommandGroup } from "../../ui/command";
import { Input } from "../../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { HINTS, SD_PRESETS, SD_RATIOS } from "@/const/consts";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Model } from "@prisma/client";
import { SD3LargeFormSchema, SD3LargeTurboFormSchema, SD3MediumFormSchema, SICoreFormSchema, SIUltraFormSchema } from "@/types/image-generation";
import { CreateFormProps } from "@/types/create-form";

export default function StabilityForm({ onSubmit, isSubmitting } : CreateFormProps) {
    const [currentModel] = useCurrentModel();
    const [openStylePresets, setOpenStylePresets] = useState(false);

    let resolver;
    switch(currentModel) {
        case Model.STABLE_DIFFUSION_3_LARGE:
            resolver = zodResolver(SD3LargeFormSchema);
            break;
        case Model.STABLE_DIFFUSION_3_LARGE_TURBO:
            resolver = zodResolver(SD3LargeTurboFormSchema);
            break;
        case Model.STABLE_DIFFUSION_3_MEDIUM:
            resolver = zodResolver(SD3MediumFormSchema);            
            break;
        case Model.STABLE_IMAGE_CORE:
            resolver = zodResolver(SICoreFormSchema);            
            break;
        case Model.STABLE_IMAGE_ULTRA:
            resolver = zodResolver(SIUltraFormSchema);            
            break;
    }

    const form = useForm({
        resolver: resolver,
        defaultValues: {
            sd_aspectRatio: "1:1",
            // sd_stylePreset: null,
            sd_seed: 0,
            sd_negativePrompt: "",
            prompt: ""
        },
        mode: "onSubmit"
    });

    return (
        <CreateBaseForm
            form={form}
            onSubmit={onSubmit}
            isSubmitting={isSubmitting}
        >
            <FormField
                control={form.control}
                name="sd_aspectRatio"
                render={({ field }) => (
                    <FormItem>
                        <InputLabel label="Aspect Ratio" hint={HINTS.SD_RATIOS} />
                        <FormControl>
                        <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger className="bg-white">
                                <SelectValue placeholder="Select an aspect ratio" />
                            </SelectTrigger>
                            <SelectContent className="shadow-lg p-2">
                                {SD_RATIOS.map((ratio) => (
                                    <SelectItem key={ratio} value={ratio}>
                                        {ratio}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        </FormControl>
                    </FormItem>
                )}
            />
            {currentModel === Model.STABLE_IMAGE_CORE && (
                <FormField
                    control={form.control}
                    name="sd_stylePreset"
                    render={({ field }) => (
                        <FormItem>
                            <InputLabel label="Style Preset" hint={HINTS.SD_PRESETS} />
                            <FormControl>
                                <Popover open={openStylePresets} onOpenChange={setOpenStylePresets}>
                                    <PopoverTrigger asChild>
                                        <Button variant="outline" role="combobox" aria-expanded={openStylePresets} className="w-full justify-between font-normal">
                                            {field.value ? field.value : "Select a style preset"}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="">
                                        <Command>
                                            <CommandInput placeholder="Search style preset..." />
                                            <CommandList>
                                                <CommandEmpty>No preset found.</CommandEmpty>
                                                <CommandGroup>
                                                    {SD_PRESETS.map((preset) => (
                                                        <CommandItem 
                                                            className="flex items-center"
                                                            key={preset} 
                                                            value={preset}
                                                            onSelect={(currentValue) => {
                                                                field.onChange(currentValue === field.value ? "" : currentValue)
                                                                setOpenStylePresets(false)
                                                            }}
                                                        >
                                                            <p className="flex-grow">{preset}</p>
                                                            <Check
                                                                className={cn(
                                                                "mr-2 h-4 w-4",
                                                                field.value === preset ? "opacity-100" : "opacity-0"
                                                                )}
                                                            />
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                            </FormControl>
                        </FormItem>
                    )}
                />
            )}
            <FormField
                control={form.control}
                name="sd_seed"
                render={({ field }) => (
                    <FormItem>
                        <InputLabel label="Seed" hint={HINTS.SD_SEED} />
                        <FormControl>
                            <Input 
                                className="bg-white" 
                                type="number" 
                                {...field} 
                                onSubmit={(e) => {
                                    field.onChange(e.target.valueAsNumber)
                                }}
                                onBlur={() => {
                                    field.onChange(Math.round(field.value));

                                    if (field.value < 0) {
                                        field.onChange(0);
                                    }
                                    if (field.value > 4294967294) {
                                        field.onChange(4294967294);
                                    }
                                }} 
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="negative_prompt"
                render={({ field }) => (
                    <FormItem>
                        <InputLabel label="Negative Prompt" hint={HINTS.SD_NEGATIVE_PROMPT} />
                        <FormControl>
                            <Textarea className="h-16 bg-white" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </CreateBaseForm>
    );
}