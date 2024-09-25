import { useTransition } from "react"
import { useForm } from "react-hook-form"
import { GeneralSettingsSchema } from "@/schemas"
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { updateGeneralSettings } from "@/actions/general-settings";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function GeneralForm() {
    const [isPending, startTransition] = useTransition();
    const { update, data: session } = useSession();

    const form = useForm({
        resolver: zodResolver(GeneralSettingsSchema),
        defaultValues: {
            name: "",
        }
    })

    function onSubmit(values) {
        startTransition(async () => {
            const res = await updateGeneralSettings(values);

            if (res?.error) {
                toast.error(res?.error);
            } else {
                toast.success(res?.success);
            }
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

                {/* <FormField
                    control={form.control}
                    name="theme"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Theme</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a theme" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="light">Light</SelectItem>
                                        <SelectItem value="dark">Dark</SelectItem>
                                    </SelectContent>
                                </Select>
                        </FormItem>
                    )}
                /> */}
                <Button className="w-40 self-end" type="submit" disabled={isPending}>Save</Button>
            </form>
        </Form>
    )
}