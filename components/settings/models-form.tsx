import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { ModelsSettingsSchema } from "@/schemas/index";
import { toast } from "sonner";
import { z } from "zod";
import { LSConsts } from "@/const/consts";

export default function KeysForm() {
    const [isPending, startTransition] = useTransition();

    const form = useForm({
        resolver: zodResolver(ModelsSettingsSchema),
        defaultValues: {
            openai_api_key: localStorage.getItem(LSConsts.OPEN_AI_API_KEY) || "",
            stability_api_key: localStorage.getItem(LSConsts.STABILITY_API_KEY) || "",
            together_api_key: localStorage.getItem(LSConsts.TOGETHER_API_KEY) || "",
        }
    })
    function onSubmit(data: z.infer<typeof ModelsSettingsSchema>) {
        startTransition(async () => {
            const stabilityApiKey = data.stability_api_key;
            const openaiApiKey = data.openai_api_key;
            const togetherApiKey = data.together_api_key;

            if (stabilityApiKey) localStorage.setItem(LSConsts.STABILITY_API_KEY, stabilityApiKey);
            if (openaiApiKey) localStorage.setItem(LSConsts.OPEN_AI_API_KEY, openaiApiKey);
            if (togetherApiKey) localStorage.setItem(LSConsts.TOGETHER_API_KEY, togetherApiKey);
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
                        <FormField
                            control={form.control}
                            name="together_api_key"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="flex flex-col gap-1">
                                        <FormLabel className="font-semibold">Together.AI API Key</FormLabel>
                                        <p className="text-xs text-gray-500">For FLUX models</p>
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