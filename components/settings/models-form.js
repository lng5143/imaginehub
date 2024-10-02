import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { ModelsSettingsSchema } from "@/schemas/index";
import { toast } from "sonner";

export default function ModelsForm() {
    const [isPending, startTransition] = useTransition();

    const form = useForm({
        resolver: zodResolver(ModelsSettingsSchema),
        defaultValues: {
            openai_api_key: localStorage.getItem("ib_openai_api_key") || "",
            stability_api_key: localStorage.getItem("ib_stability_api_key") || "",
        }
    })

    function onSubmit(values) {
        startTransition(async () => {
            console.log(values);
            const stabilityApiKey = values.stability_api_key;
            const openaiApiKey = values.openai_api_key;

            localStorage.setItem("ib_stability_api_key", stabilityApiKey);
            localStorage.setItem("ib_openai_api_key", openaiApiKey);
        })

        toast.success("API keys saved");
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="gap-10 flex flex-col">
                <div className="flex flex-col gap-10">
                    <div className="flex flex-col gap-8">
                        <FormField
                            control={form.control}
                            name="openai_api_key"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-semibold text-base">OpenAI API Key</FormLabel>
                                    <FormControl>
                                        <Input placeholder="sk-..." {...field} disabled={isPending} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="stability_api_key"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-semibold text-base">StabilityAI API Key</FormLabel>
                                    <FormControl>
                                        <Input placeholder="sk-..." {...field} disabled={isPending} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <Button className="w-40 self-end" type="submit" disabled={isPending}>Save</Button>
            </form>
        </Form>
    )
}