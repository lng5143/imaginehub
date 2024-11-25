import { CreateOrEditImageGenerationDTO } from "@/types/image-generation";
import { UseFormReturn } from "react-hook-form";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import InputLabel from "../input-label";
import { Textarea } from "@/components/ui/textarea";
import { HINTS } from "@/const/consts";
import { Button } from "@/components/ui/button";

interface CreateBaseFormProps {
    children: React.ReactNode;
    onSubmit: (data: CreateOrEditImageGenerationDTO) => void;
    isSubmitting: boolean;
    form: UseFormReturn<any>;
}

export default function CreateBaseForm({ children, onSubmit, isSubmitting, form } : CreateBaseFormProps) {
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                
                {children}

                <FormField
                    control={form.control}
                    name="prompt"
                    render={({ field }) => (
                        <FormItem>
                            <InputLabel label="Prompt" hint={HINTS.PROMPT} />
                            <FormControl>
                                <Textarea 
                                    required 
                                    className="h-28 bg-white" 
                                    {...field} 
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    variant="ibDark"
                >
                    Generate
                </Button>
            </form>
        </Form>
    )
}