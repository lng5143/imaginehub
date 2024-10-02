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

export default function DallEForm() {
    const [currentModel, _setCurrentModel] = useCurrentModel();

    let resolver;
    switch(currentModel) {
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
            size: currentModel === "de-3" ? "1024x1024" : "256x256",
            de_quality: "standard",
            samples: [1],
            prompt: ""
        }
    });

    const onSubmit = (data) => {
        console.log("submit")
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
                            {currentModel === "de-2" && (
                                <RadioGroup defaultValue={field.value} value={field.value} onValueChange={field.onChange} required>
                                    {DE2_SIZES.map((size, index) => (
                                        <div key={index} className="flex items-center space-x-2">
                                            <RadioGroupItem value={size} id={`de2-${index + 1}`} />
                                            <Label htmlFor={`de2-${index + 1}`}>{size.replace('x', ' x ')}</Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            )}
                            {currentModel === "de-3" && (
                                <RadioGroup defaultValue="1024x1024" value={field.value} onValueChange={field.onChange} required>
                                    {DE3_SIZES.map((size, index) => (
                                        <div key={index} className="flex items-center space-x-2">
                                            <RadioGroupItem value={size} id={`de3-${index + 1}`} />
                                            <Label htmlFor={`de3-${index + 1}`}>{size.replace('x', ' x ')}</Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            )}
                            </>
                            </FormControl>
                        </FormItem>
                    )}
                />
                {currentModel === "de-3" && (
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
                {currentModel === "de-2" && (
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
                                        disabled={currentModel === "dall-e-3"}
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
                                        className="w-[40px] text-xs text-center" disabled={currentModel === "dall-e-3"}/>
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
                <Button type="submit">Generate</Button>
            </form>
        </Form>
    );
}