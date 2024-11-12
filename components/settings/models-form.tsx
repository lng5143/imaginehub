import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { ModelsSettingsSchema } from "@/schemas/index";
import { toast } from "sonner";
import { z } from "zod";

export default function KeysForm() {
    const [isPending, startTransition] = useTransition();

    const form = useForm({
        resolver: zodResolver(ModelsSettingsSchema),
        defaultValues: {
            openai_api_key: localStorage.getItem("ib_openai_api_key") || "",
            stability_api_key: localStorage.getItem("ib_stability_api_key") || "",
        }
    })

    function onSubmit(data: z.infer<typeof ModelsSettingsSchema>) {
        startTransition(async () => {
            const stabilityApiKey = data.stability_api_key;
            const openaiApiKey = data.openai_api_key;

            if (stabilityApiKey) localStorage.setItem("ib_stability_api_key", stabilityApiKey);
            if (openaiApiKey) localStorage.setItem("ib_openai_api_key", openaiApiKey);
        })

        toast.success("API keys saved");
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="gap-10 flex flex-col">
                <div className="flex flex-col gap-10">
                    <div className="flex flex-col gap-10">
                        <FormField
                            control={form.control}
                            name="openai_api_key"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="flex flex-col gap-1">
                                        <FormLabel className="font-semibold">OpenAI API Key</FormLabel>
                                        <p className="text-xs text-gray-500">For DALL-E models</p>
                                    </div>
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
                                    <div className="flex flex-col gap-1">
                                        <FormLabel className="font-semibold">Stability AI API Key</FormLabel>
                                        <p className="text-xs text-gray-500">For Stable Diffusion, Stable Image models</p>
                                    </div>
                                    <FormControl>
                                        <Input placeholder="sk-..." {...field} disabled={isPending} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <Button variant="ibDark" className="w-40 self-end" type="submit" disabled={isPending}>Save</Button>
            </form>
        </Form>
    )
}