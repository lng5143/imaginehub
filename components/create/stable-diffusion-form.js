import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useForm } from "react-hook-form";
import { Slider } from "../ui/slider";
import { useCurrentModel } from "@/store/use-current-model";
import InputLabel from "./input-label";
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";
export default function StableDiffusionForm() {
    const [currentModel, _setCurrentModel] = useCurrentModel();

    const form = useForm({
        defaultValues: {
            width: 512,
            height: 512, 
            safety_checker: true,
            upscale: false,
            samples: [1],
            negative_prompt: "",
            prompt: ""
        }
    });

    const onSubmit = (data) => {
        console.log(data);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-10">
                <div className="flex flex-col gap-4">
                <FormField
                    control={form.control}
                    name="width"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Width</FormLabel>
                            <FormControl className="">
                                <div className="flex items-center gap-x-2 w-full">
                                    <Slider 
                                        defaultValue={[field.value]} 
                                        max={1024} 
                                        min={256} 
                                        step={1} 
                                        onValueChange={field.onChange}
                                    />
                                    <div className="flex gap-1 items-center">
                                        <Input type="text" value={field.value} onChange={field.onChange} className="w-[54px] text-xs" />
                                        <p className="text-xs">px</p>
                                    </div>
                                </div>
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="height"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Height</FormLabel>
                            <FormControl className="">
                                <div className="flex items-center gap-x-2 w-full">
                                    <Slider 
                                        defaultValue={[field.value]} 
                                        max={1024} 
                                        min={256} 
                                        step={1} 
                                        onValueChange={field.onChange}
                                    />
                                    <div className="flex gap-1 items-center">
                                        <Input type="text" value={field.value} onChange={field.onChange} className="w-[54px] text-xs" />
                                        <p className="text-xs">px</p>
                                    </div>
                                </div>
                            </FormControl>
                        </FormItem>
                    )}
                />
                </div>  
                <FormField
                    control={form.control}
                    name="upscale"
                    render={({ field }) => (
                        <FormItem>
                            <InputLabel label="Upscale" hint={`Upscale the image to a higher quality.`} />
                            <FormControl>
                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="safety_checker"
                    render={({ field }) => (
                        <FormItem>
                            <InputLabel label="Safety Checker" hint={`Enable the safety checker to prevent generating harmful images.`} />
                            <FormControl>
                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="samples"
                    render={({ field }) => (
                        <FormItem>
                            <InputLabel label="Samples" hint={`The number of images to generate. \nDall-E 2 supports up to 10 samples. Dall-E 3 only support 1 at a time.`} />
                            <FormControl>
                                <div className="flex items-center gap-x-4">
                                    <Slider 
                                        defaultValue={[field.value]} 
                                        max={4} 
                                        min={1} 
                                        step={1} 
                                        value={[field.value]}
                                        onValueChange={field.onChange}
                                    />
                                    <p className="text-sm font-medium">{field.value}</p>
                                </div>
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