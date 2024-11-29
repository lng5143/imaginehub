"use client"

import { LoginSchema } from "@/schemas/index";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormControl, FormItem } from "../ui/form";
import { Input } from "../ui/input";
import SocialLogin from "./social-login";
import { useTransition } from "react";
import { login } from "@/server/actions/login";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { z } from "zod";

export default function AuthForm() {
    const [isPending, startTransition] = useTransition();

    const form = useForm({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
        }
    })

    function onSubmit(data: z.infer<typeof LoginSchema>) {
        startTransition(async () => {
            await login(data)
            .then(data => {
                form.reset();

                if (!data.success) {
                    toast.error(data.message);
                }

                if (data.success) {
                    toast.success(data.message);
                }
            })
        })
    }
    
    return (
        <div className="flex flex-col gap-8">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder="email@xample.com" {...field} disabled={isPending} className="bg-white text-black text-xs border-2 rounded-md p-2" />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <Button variant="ibLight" className="w-full hover:scale-[1.02]" type="submit" disabled={isPending}>Login with email</Button>
                </form>
            </Form>
            <SocialLogin />
        </div>
    )
}