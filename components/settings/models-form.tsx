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
import Link from "next/link";

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
            localStorage.setItem(LSConsts.STABILITY_API_KEY, data.stability_api_key || "");
            localStorage.setItem(LSConsts.OPEN_AI_API_KEY, data.openai_api_key || "");
            localStorage.setItem(LSConsts.TOGETHER_API_KEY, data.together_api_key || "");
        })

        toast.success("API keys saved!");
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="gap-6 flex flex-col">
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-6">
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
                <Link href="/how-to" target="_blank" className="text-sm text-blue-500 cursor-pointer hover:underline">How to get API keys</Link>
                <Button variant="ibDark" className="w-40 self-end" type="submit" disabled={isPending}>Save</Button>
            </form>
        </Form>
    )
}