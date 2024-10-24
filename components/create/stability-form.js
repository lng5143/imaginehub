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
import { HINTS, PROVIDERS, SD_PRESETS, SD_RATIOS } from "@/const/imagine-box-consts";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import useCurrentUser from "@/hooks/use-current-user";
import { useQueryClient } from "@tanstack/react-query";
import { generateImages } from "@/lib/generate";
import { toast } from "sonner";
import NoKeyDialog from "./no-key-dialog";
import { markGenerationAsFailed } from "@/server/actions/generations";

export default function StabilityForm() {
    const queryClient = useQueryClient();
    const currentUser = useCurrentUser();
    const [currentModel, _setCurrentModel] = useCurrentModel();
    const [openStylePresets, setOpenStylePresets] = useState(false);
    const [isInitInsertInProgress, setIsInitInsertInProgress ] = useState(false);
    const [isNoKeyDialogOpen, setIsNoKeyDialogOpen] = useState(false);

    let resolver;
    switch(currentModel.code) {
        case "sd3-medium":
        case "sd3-large":
        case "sd3-large-turbo":
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
            // sd_stylePreset: null,
            sd_seed: 0,
            sd_negativePrompt: "",
            prompt: ""
        },
        mode: "onSubmit"
    });

    const handleInitInsertComplete = () => {
        setIsInitInsertInProgress(false);
        toast.info("Image generation started, please wait...")
    }

    const handleFinalUpdateComplete = () => {
        toast.success("Image generation complete!")
    }

    const handleNoKeyError = (res) => {
        setIsNoKeyDialogOpen(true);
    }

    const onSubmit = async (data) => {
        data.model = data.model ?? currentModel.code;
        data.provider = currentModel.provider;
        data.userId = currentUser.id;
        data.samples = 1;

        try {
            setIsInitInsertInProgress(true);
            const res = await generateImages(data, queryClient, handleInitInsertComplete, handleFinalUpdateComplete);

            if (!res.success) {
                if (res.data?.isNoKey) {
                    handleNoKeyError(res);
                } else {
                    toast.error(res.message);
                    if (res.data?.genId) {
                        await markGenerationAsFailed(res.data?.genId);
                    }
                }
            }
        } catch (error) {
            toast.error("Failed to generate images");
        } finally {
            setIsInitInsertInProgress(false);
        }
    }

    return (
        <>
            <NoKeyDialog provider={PROVIDERS.stability} open={isNoKeyDialogOpen} onOpenChange={setIsNoKeyDialogOpen} />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-10">
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
                    {currentModel.code === "si-core" && (
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
                    <FormField
                        control={form.control}
                        name="prompt"
                        render={({ field }) => (
                            <FormItem>
                                <InputLabel label="Prompt" hint={HINTS.PROMPT} />
                                <FormControl>
                                    <Textarea required className="h-28 bg-white" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" disabled={isInitInsertInProgress} variant="ibDark">Generate</Button>
                </form>
            </Form>
        </>
    );
}