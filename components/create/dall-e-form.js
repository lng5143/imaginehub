import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { useForm } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { useCurrentModel } from "@/store/use-current-model";
import { Label } from "../ui/label";
import InputLabel from "./input-label";
import { Input } from "../ui/input";
import { DE2FormSchema, DE3FormSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { DE2_SIZES, DE3_SIZES, HINTS, PROVIDERS } from "@/const/imagine-box-consts";
import useCurrentUser from "@/hooks/use-current-user";
import { generateImages } from "@/lib/generate";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useState } from "react";
import { markGenerationAsFailed } from "@/server/actions/generations";
import NoKeyDialog from "./no-key-dialog";

export default function DallEForm() {
    const queryClient = useQueryClient();
    const currentUser = useCurrentUser();
    const [currentModel, _setCurrentModel] = useCurrentModel();
    const [isInitInsertInProgress, setIsInitInsertInProgress] = useState(false);
    const [isNoKeyDialogOpen, setIsNoKeyDialogOpen] = useState(false);

    let resolver;
    switch(currentModel.code) {
        case "de-2":
            resolver = zodResolver(DE2FormSchema);
            break;
        case "de-3":
            resolver = zodResolver(DE3FormSchema);
            break;
        default:
            resolver = zodResolver(DE3FormSchema);
    }

    const form = useForm({
        resolver: resolver,
        defaultValues: {
            de_size: "1024x1024",
            de_quality: "standard",
            samples: 1,
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

    const handleNoKeyError = () => {
        setIsNoKeyDialogOpen(true);
    }

    const onSubmit = async (data) => {
        data.model = currentModel.code;
        data.provider = currentModel.provider;
        data.userId = currentUser.id;

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
            <NoKeyDialog provider={PROVIDERS.openai} open={isNoKeyDialogOpen} onOpenChange={setIsNoKeyDialogOpen} />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-10">
                    <FormField
                        control={form.control}
                        name="de_size"
                        render={({ field }) => (
                            <FormItem className="">
                                <InputLabel label="Size" hint={HINTS.DE_SIZE} />
                                <FormControl>
                                <>
                                {currentModel.code === "de-2" && (
                                    <RadioGroup defaultValue={field.value} value={field.value} onValueChange={field.onChange} required>
                                        {DE2_SIZES.map((size, index) => (
                                            <div key={index} className="flex items-center space-x-2">
                                                <RadioGroupItem className="bg-white border-none" value={size} id={`de2-${index + 1}`} />
                                                <Label className="font-normal" htmlFor={`de2-${index + 1}`}>{size.replace('x', ' x ')}</Label>
                                            </div>
                                        ))}
                                    </RadioGroup>
                                )}
                                {currentModel.code === "de-3" && (
                                    <RadioGroup defaultValue="1024x1024" value={field.value} onValueChange={field.onChange} required>
                                        {DE3_SIZES.map((size, index) => (
                                            <div key={index} className="flex items-center space-x-2">
                                                <RadioGroupItem className="bg-white border-none" value={size} id={`de3-${index + 1}`} />
                                                <Label className="font-normal" htmlFor={`de3-${index + 1}`}>{size.replace('x', ' x ')}</Label>
                                            </div>
                                        ))}
                                    </RadioGroup>
                                )}
                                </>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    {currentModel.code === "de-3" && (
                        <FormField
                            control={form.control}
                            name="de_quality"
                            render={({ field }) => (
                            <FormItem>
                                <InputLabel label="Quality" hint={HINTS.DE_QUALITY} />
                                <FormControl>
                                    <RadioGroup defaultValue="standard" onValueChange={field.onChange} required>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem className="bg-white border-none" value="standard" id="standard" />
                                            <Label className="font-normal" htmlFor="standard">Standard</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem className="bg-white border-none" value="hd" id="hd" />
                                            <Label className="font-normal" htmlFor="hd">HD</Label>
                                        </div>
                                    </RadioGroup>
                                </FormControl>
                            </FormItem>
                            )}
                        />
                    )}
                    {currentModel.code === "de-2" && (
                        <FormField
                            control={form.control}
                            name="samples"
                            render={({ field }) => (
                            <FormItem>
                                <InputLabel label="Samples" hint={HINTS.DE_SAMPLES} />
                                <FormControl>
                                    <div className="flex items-center gap-x-4">
                                        <Input 
                                            type="text" 
                                            value={field.value} 
                                            onChange={field.onChange} 
                                            onBlur={e => {
                                                if (e.target.value > 10) {
                                                    field.onChange(10);
                                                }
                                                if (e.target.value < 1) {
                                                    field.onChange(1);
                                                }
                                            }}
                                            className="text-xs bg-white w-full"/>
                                    </div>
                                </FormControl>
                                </FormItem>
                            )}
                        />
                    )}
                    <FormField
                        control={form.control}
                        name="prompt"
                        render={({ field }) => (
                            <FormItem>
                                <InputLabel label="Prompt" hint={HINTS.PROMPT} />
                                <FormControl>
                                    <Textarea required className="h-28 bg-white" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <Button type="submit" disabled={isInitInsertInProgress} variant="ibDark">Generate</Button>
                </form>
            </Form>
        </>
    );
}