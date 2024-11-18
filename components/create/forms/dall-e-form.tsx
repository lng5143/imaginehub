import { Textarea } from "../../ui/textarea";
import { Form, FormControl, FormField, FormItem } from "../../ui/form";
import { useForm } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";
import { useCurrentModel } from "@/store/use-current-model";
import { Label } from "../../ui/label";
import InputLabel from "../input-label";
import { Input } from "../../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import CreateFormSubmitButton from "../create-form-submit-button";
import { Model } from "@prisma/client";
import { DE2FormSchema, DE3FormSchema } from "@/types/image-generation";
import { HINTS } from "@/const/consts";

export default function DallEForm({ onSubmit, isSubmitting } : CreateFormProps) {
    const [currentModel] = useCurrentModel();
    const isDallE2 = currentModel === Model.DALL_E_2;

    const form = useForm({
        resolver: isDallE2 ? zodResolver(DE2FormSchema) : zodResolver(DE3FormSchema),
        defaultValues: {
            de_size: "1024x1024",
            de_quality: "standard",
            samples: 1,
            prompt: ""
        },
        mode: "onSubmit"
    });

    return (
        <>
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
                    {currentModel === Model.DALL_E_3 && (
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
                    {currentModel === Model.DALL_E_2 && (
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
                    <CreateFormSubmitButton isSubmitting={isSubmitting} />
                </form>
            </Form>
        </>
    );
}