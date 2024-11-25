import { Textarea } from "../../ui/textarea";
import { Button } from "../../ui/button";
import { FormControl, FormField, FormItem, FormMessage } from "../../ui/form";
import CreateBaseForm from "./create-base-form";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useCurrentModel } from "@/store/use-current-model";
import InputLabel from "../input-label";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { Command, CommandInput, CommandList, CommandItem, CommandEmpty, CommandGroup } from "../../ui/command";
import { Input } from "../../ui/input";
import { HINTS, SD_PRESETS, SD_RATIOS } from "@/const/consts";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Model } from "@prisma/client";
import { CreateFormProps } from "@/types/create-form";
import { Badge } from "@/components/ui/badge";
import AdvancedFormFields from "./advanced-form-fields";
import { getDefaultValues, getResolver } from "@/lib/models";

export default function StabilityForm({ onSubmit, isSubmitting } : CreateFormProps) {
    const [currentModel] = useCurrentModel();

    const form = useForm({
        resolver: getResolver(currentModel),
        defaultValues: getDefaultValues(currentModel),
        mode: "onSubmit"
    });

    return (
        <CreateBaseForm
            form={form}
            onSubmit={onSubmit}
            isSubmitting={isSubmitting}
        >
            {/* Common field */}
            <FormField
                control={form.control}
                name="sd_aspectRatio"
                render={({ field }) => (
                    <RatioSelector field={field} />
                )}
            />

            <AdvancedFormFields>
                {/* Stable Image Core style preset */}
                {currentModel === Model.STABLE_IMAGE_CORE && (
                    <FormField
                        control={form.control}
                        name="sd_stylePreset"
                        render={({ field }) => (
                            <SICOREPresetSelector field={field} />
                        )}
                    />
                )}

                <FormField
                    control={form.control}
                    name="sd_seed"
                    render={({ field }) => (
                        <SeedInput field={field} />
                    )}
                />

                <FormField
                    control={form.control}
                    name="negative_prompt"
                    render={({ field }) => (
                        <NegativePromptInput field={field} />
                    )}
                />
            </AdvancedFormFields>
        </CreateBaseForm>
    );
}

const RatioSelector = ({ field }: { field: any }) => (
    <FormItem>
        <InputLabel label="Aspect Ratio" hint={HINTS.SD_RATIOS} />
        <FormControl>
            {SD_RATIOS.map((item, index) => (
                <Badge
                    key={index}
                    variant={field.value === item ? "ibLightChosen" : "outline"}
                    onClick={() => field.onChange(item)}
                >
                    {item}
                </Badge>
            ))}
        </FormControl>
    </FormItem>
)

const NegativePromptInput = ({ field }: { field: any }) => (
    <FormItem>
        <InputLabel label="Negative Prompt" hint={HINTS.SD_NEGATIVE_PROMPT} />
        <FormControl>
            <Textarea className="h-16 bg-white" {...field} />
        </FormControl>
    </FormItem>
)

const SeedInput = ({ field }: { field: any }) => (
    <FormItem>
        <InputLabel label="Seed" hint={HINTS.SD_SEED} />
        <FormControl>
            <Input
                type="number"
                min={0}
                max={4294967294}
                value={field.value}
                onChange={(e) => {
                    const value = e.target.value === '' ? 0 : parseInt(e.target.value);
                    if (!isNaN(value)) {
                        field.onChange(Math.min(Math.max(value, 0), 4294967294));
                    }
                }}
            />
        </FormControl>
        <FormMessage />
    </FormItem>
)

const SICOREPresetSelector = ({ field }: { field: any }) => {
    const [open, setOpen] = useState(false);

    return (
        <FormItem>
            <InputLabel label="Style Preset" hint={HINTS.SD_PRESETS} />
            <FormControl>
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between font-normal">
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
                                                setOpen(false)
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
    )
}