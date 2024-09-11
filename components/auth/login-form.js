import LoginSchema from "@/schemas/index";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormLabel, FormControl, FormItem } from "../ui/form";
import { Button } from "../ui/button";
import CardWrapper from "./card-wrapper";
import { Input } from "../ui/input";
import SocialLogin from "./social-login";

export default function LoginForm() {
    const form = useForm({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
        }
    })

    function onSubmit(values) {
        console.log(values)
    }
    
    return (
        <div className="flex flex-col gap-4">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="email@xample.com" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Login with email</Button>
                </form>
            </Form>
            <SocialLogin />
        </div>
    )
}