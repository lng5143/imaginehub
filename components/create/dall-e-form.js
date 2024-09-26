import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { useForm } from "react-hook-form";
import { Slider } from "../ui/slider";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { useCurrentModel } from "@/store/use-current-model";
import { Label } from "../ui/label";
import InputLabel from "./input-label";

export default function DallEForm() {
    const [currentModel, _setCurrentModel] = useCurrentModel();

    const form = useForm({
        defaultValues: {
            size: currentModel === "dall-e-3" ? "1024x1024" : "256x256",
            quality: "standard",
            samples: 1,
            prompt: ""
        }
    });

    const onSubmit = (data) => {
        console.log(data);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-10">
                <FormField
                    control={form.control}
                    name="size"
                    render={({ field }) => (
                        <FormItem>
                            <InputLabel label="Size" hint={`The size of the image to generate. \nDall-E 3 supports 1024x1024, 1024x1792, and 1792x1024. Dall-E 2 only supports 256x256, 512x512, and 1024x1024.`} />
                            <FormControl>
                            <>
                            {currentModel === "dall-e-2" && (
                                <RadioGroup defaultValue={field.value} value={field.value} onValueChange={field.onChange} required>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="256x256" id="1" />
                                        <Label htmlFor="1">256 x 256</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="512x512" id="2" />
                                        <Label htmlFor="2">512 x 512</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="1024x1024" id="3" />
                                        <Label htmlFor="3">1024 x 1024</Label>
                                    </div>
                                </RadioGroup>
                            )}
                            {currentModel === "dall-e-3" && (
                                <RadioGroup defaultValue="1024x1024" value={field.value} onValueChange={field.onChange} required>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="1024x1024" id="1" />
                                        <Label htmlFor="1">1024 x 1024</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="1024x1792" id="2" />
                                        <Label htmlFor="2">1024 x 1792</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="1792x1024" id="3" />
                                        <Label htmlFor="3">1792 x 1024</Label>
                                    </div>
                                </RadioGroup>
                            )}
                            </>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="quality"
                    render={({ field }) => (
                        <FormItem>
                            <InputLabel label="Quality" hint={`The quality of the image to generate. \nHD is only supported on Dall-E 3.`} />
                            <FormControl>
                                <RadioGroup defaultValue="standard" onValueChange={field.onChange} required disabled={currentModel !== "dall-e-3"}>
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
                                        max={10} 
                                        min={1} 
                                        step={1} 
                                        value={[field.value]}
                                        onValueChange={field.onChange}
                                        disabled={currentModel === "dall-e-3"}
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
                    name="prompt"
                    render={({ field }) => (
                        <FormItem>
                            <InputLabel label="Prompt" hint={`Description of what you want to generate. \nEg. "A photograph of a white Siamese cat"`} />
                            <FormControl>
                                <Textarea required className="h-28" {...field} />
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