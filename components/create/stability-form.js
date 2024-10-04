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
import { SD_PRESETS, SD_RATIOS } from "@/const/imagine-box-consts";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import useCurrentUser from "@/hooks/use-current-user";
import { useQueryClient } from "@tanstack/react-query";
import { generateImages } from "@/lib/generate";

export default function StabilityForm() {
    const queryClient = useQueryClient();
    const currentUser = useCurrentUser();
    const [currentModel, _setCurrentModel] = useCurrentModel();
    const [openStylePresets, setOpenStylePresets] = useState(false);
    
    let resolver;
    switch(currentModel.code) {
        case "sd-3-medium":
        case "sd-3-large":
        case "sd-3-turbo":
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
            sd_aspectRatio: "1:1",
            sd_stylePreset: "",
            sd_seed: 0,
            sd_negativePrompt: "",
            prompt: ""
        },
    });

    const onSubmit = async (data) => {
        console.log(data)
        data.model = currentModel.code;
        data.provider = currentModel.provider;
        data.userId = currentUser.id;
        data.samples = 1;

        const res = await generateImages(currentUser.id, data, queryClient);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-10">
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
                {currentModel.code === "si-core" && (
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
                                <Textarea className="h-16 bg-white" {...field} />
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