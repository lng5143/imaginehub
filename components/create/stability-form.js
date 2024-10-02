import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useCurrentModel } from "@/store/use-current-model";
import InputLabel from "./input-label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Command, CommandInput, CommandList, CommandItem, CommandEmpty, CommandGroup } from "../ui/command";
import { Input } from "../ui/input";
import { SD3FormSchema, SICoreFormSchema, SIUltraFormSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { SD_PRESETS, SD_RATIOS, SD3_MODELS } from "@/const/imagine-box-consts";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export default function StabilityForm() {
    const [currentModel, _setCurrentModel] = useCurrentModel();
    const [openStylePresets, setOpenStylePresets] = useState(false);
    
    let resolver;
    switch(currentModel) {
        case "sd-3":
            resolver = zodResolver(SD3FormSchema);
            break;
        case "si-core":
            resolver = zodResolver(SICoreFormSchema);
            break;
        case "si-ultra":
            resolver = zodResolver(SIUltraFormSchema);
            break;
        default:
            resolver = zodResolver(SD3FormSchema);
    }

    const form = useForm({
        resolver: resolver,
        defaultValues: {
            sd_model: "sd3-large",
            sd_aspectRatio: "1:1",
            sd_stylePreset: "",
            sd_seed: 0,
            sd_negativePrompt: "",
            prompt: ""
        },
    });

    const onSubmit = (data) => {
        console.log(data);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-10">
                {currentModel === "sd-3" && (
                    <FormField
                        control={form.control}
                        name="sd_model"
                        render={({ field }) => (
                            <FormItem>
                                <InputLabel label="Model" hint={`Model to use for generation. Only available for Stable Diffusion 3`} />
                                <FormControl>
                                <Select value={field.value} onValueChange={field.onChange}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a SD3 model" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {SD3_MODELS.map((model) => (
                                            <SelectItem key={model} value={model}>
                                                {model}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                )}
                <FormField
                    control={form.control}
                    name="aspect_ratio"
                    render={({ field }) => (
                        <FormItem>
                            <InputLabel label="Aspect Ratio" hint={`Aspect ratio of the image to generate.`} />
                            <FormControl>
                            <Select value={field.value} onValueChange={field.onChange}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select an aspect ratio" />
                                </SelectTrigger>
                                <SelectContent>
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
                {currentModel === "si-core" && (
                    <FormField
                        control={form.control}
                        name="style_preset"
                        render={({ field }) => (
                            <FormItem>
                                <InputLabel label="Style Preset" hint={`Style preset to use for generation. Only available for Stable Image Core`} />
                                <FormControl>
                                    <Popover open={openStylePresets} onOpenChange={setOpenStylePresets}>
                                        <PopoverTrigger asChild>
                                            <Button variant="outline" role="combobox" aria-expanded={openStylePresets} className="w-full justify-between">
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
                                                                key={preset} 
                                                                value={preset}
                                                                onSelect={(currentValue) => {
                                                                    field.onChange(currentValue === field.value ? "" : currentValue)
                                                                    setOpenStylePresets(false)
                                                                }}
                                                            >
                                                                <Check
                                                                    className={cn(
                                                                    "mr-2 h-4 w-4",
                                                                    field.value === preset ? "opacity-100" : "opacity-0"
                                                                    )}
                                                                />
                                                                {preset}
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
                            <InputLabel label="Seed" hint={`A specific value that is used to guide the 'randomness' of the generation: [0 .. 4294967294]`} />
                            <FormControl>
                                <Input type="number" {...field} onBlur={() => {
                                    if (field.value < 0) {
                                        field.onChange(0);
                                    }
                                    if (field.value > 4294967294) {
                                        field.onChange(4294967294);
                                    }
                                }} />
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
                            <InputLabel label="Negative Prompt" hint={`Description of what you want to generate. \nEg. "A photograph of a white Siamese cat"`} />
                            <FormControl>
                                <Textarea required className="h-16 bg-white" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="prompt"
                    render={({ field }) => (
                        <FormItem>
                            <InputLabel label="Prompt" hint={`Description of what you want to generate. \nEg. "A photograph of a white Siamese cat"`} />
                            <FormControl>
                                <Textarea required className="h-28 bg-white" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Generate</Button>
            </form>
        </Form>
    );
}