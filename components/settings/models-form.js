import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { ModelsSettingsSchema } from "@/schemas/index";
export default function ModelsForm() {
    const [isPending, startTransition] = useTransition();

    const form = useForm({
        resolver: zodResolver(ModelsSettingsSchema),
        defaultValues: {
            models: [
                {
                    name: "DALL-E",
                    active: true
                }
            ],
        }
    })

    function onSubmit(values) {
        startTransition(async () => {
            console.log(values);
            //const res = await updateGeneralSettings(values);
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-col">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>OpenAI API Key</FormLabel>
                            <FormControl>
                                <Input placeholder="sk-..." {...field} disabled={isPending} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>StabilityAI API Key</FormLabel>
                            <FormControl>
                                <Input placeholder="sk-..." {...field} disabled={isPending} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button className="w-40 self-end" type="submit" disabled={isPending}>Save</Button>
            </form>
        </Form>
    )
}