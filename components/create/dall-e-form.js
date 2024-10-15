import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { useForm } from "react-hook-form";
import { Slider } from "../ui/slider";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { useCurrentModel } from "@/store/use-current-model";
import { Label } from "../ui/label";
import InputLabel from "./input-label";
import { Input } from "../ui/input";
import { DE2FormSchema, DE3FormSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { DE2_SIZES, DE3_SIZES } from "@/const/imagine-box-consts";
import useCurrentUser from "@/hooks/use-current-user";
import { generateImages } from "@/lib/generate";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useState } from "react";

export default function DallEForm() {
    const queryClient = useQueryClient();
    const currentUser = useCurrentUser();
    const [currentModel, _setCurrentModel] = useCurrentModel();
    const [isInitInsertInProgress, setIsInitInsertInProgress] = useState(false);

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
            de_size: currentModel.code === "de-3" ? "1024x1024" : "256x256",
            de_quality: "standard",
            samples: [1],
            prompt: ""
        }
    });

    const handleInitInsertComplete = (data) => {
        console.log("init insert complete", data);
        setIsInitInsertInProgress(false);
        toast.info("Image generation started, please wait...")
    }

    const handleUpdateComplete = (data) => {
        console.log("update complete");
        toast.success("Image generation complete!")
    }

    const onSubmit = async (data) => {
        data.model = currentModel.code;
        data.provider = currentModel.provider;
        data.userId = currentUser.id;
        data.samples = data.samples[0]

        try {
            setIsInitInsertInProgress(true);
            const res = await generateImages(currentUser.id, data, queryClient, handleInitInsertComplete, handleUpdateComplete);

            if (!res.success) {
                toast.error("Failed to generate images");
            }

            if (res.success) {
                handleUpdateComplete(res.data);
            }
        } catch (error) {
            toast.error("Failed to generate images");
        } finally {
            setIsInitInsertInProgress(false);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-10">
                <FormField
                    control={form.control}
                    name="de_size"
                    render={({ field }) => (
                        <FormItem className="">
                            <InputLabel label="Size" hint={`The size of the image to generate. \nDall-E 3 supports 1024x1024, 1024x1792, and 1792x1024. Dall-E 2 only supports 256x256, 512x512, and 1024x1024.`} />
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
                            <InputLabel label="Quality" hint={`The quality of the image to generate. \nHD is only supported on Dall-E 3.`} />
                            <FormControl>
                                <RadioGroup defaultValue="standard" onValueChange={field.onChange} required>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="standard" id="standard" />
                                        <Label htmlFor="standard">Standard</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="hd" id="hd" />
                                        <Label htmlFor="hd">HD</Label>
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
                            <InputLabel label="Samples" hint={`The number of images to generate. \nDall-E 2 supports up to 10 samples. Dall-E 3 only support 1 at a time.`} />
                            <FormControl>
                                <div className="flex items-center gap-x-4">
                                    <Slider 
                                        value={[field.value]} 
                                        max={10} 
                                        min={1} 
                                        step={1} 
                                        onValueChange={field.onChange}
                                    />
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
                                        className="w-[40px] text-xs text-center bg-white"/>
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
                            <InputLabel label="Prompt" hint={`Description of what you want to generate. \nEg. "A photograph of a white Siamese cat"`} />
                            <FormControl>
                                <Textarea required className="h-28 bg-white" {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={isInitInsertInProgress} variant="ibDark">Generate</Button>
            </form>
        </Form>
    );
}