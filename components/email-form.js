import IBButton from "./ib-button";
import { saveEmail } from "@/server/actions/emails";
import { EmailFormSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
export default function EmailForm() {

    const form = useForm({
        resolver: zodResolver(EmailFormSchema),
        defaultValues: {
            email: ""
        }
    })

    const handleSubmitEmail = async (e) => {
        e.preventDefault();

        const { email } = form.getValues();
        const { error, success } = await saveEmail(email);

        if (error) {
            toast.error(error);
        }

        if (success) {
            toast.success(success);
        }
    }

    return (
        <div className="flex flex-col gap-3">
            <p className="text-sm">Subscribe to receive updates</p>
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
                                        className="bg-white text-slate-950 text-xs border-2 rounded-md p-2"
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <IBButton variant="light" type="submit">Submit</IBButton>
                </form>
            </Form>
        </div>
    )
}