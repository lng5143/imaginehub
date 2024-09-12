import { useTransition } from "react"
import { useForm } from "react-hook-form"
import { GeneralSettingsSchema } from "@/schemas"
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";

export default function GeneralForm() {
    const [isPending, startTransition] = useTransition();

    const form = useForm({
        resolver: zodResolver(GeneralSettingsSchema),
        defaultValues: {
            name: "",
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
                            <FormLabel>Display Name</FormLabel>
                            <FormControl>
                                <Input placeholder="John Doe" {...field} disabled={isPending} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button className="w-40 self-end" type="submit" disabled={isPending}>Save</Button>
            </form>
        </Form>
    )
}