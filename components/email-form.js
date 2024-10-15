import { saveEmail } from "@/server/actions/emails";
import { EmailFormSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useTransition } from "react";
import { Button } from "./ui/button";

export default function EmailForm() {
    const [isPending, startTransition] = useTransition();

    const form = useForm({
        resolver: zodResolver(EmailFormSchema),
        defaultValues: {
            email: ""
        }
    })

    const handleSubmitEmail = async () => {
        startTransition(async () => {
            const { email } = form.getValues();
            const { error, success } = await saveEmail(email);

            if (error) {
                toast.error(error);
            }

            if (success) {
                toast.success(success);
            }
        })
    }

    return (
        <div className="flex flex-col gap-3 w-full">
            <p className="text">Subscribe to receive updates</p>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmitEmail)} className="flex items-center gap-2">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        placeholder="Enter your email"
                                        {...field}
                                        className="bg-white text-black text-xs border-2 rounded-md p-2"
                                        disabled={isPending}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <Button variant="ibLight" type="submit" disabled={isPending}>Submit</Button>
                </form>
            </Form>
        </div>
    )
}