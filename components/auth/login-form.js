"use client"

import { LoginSchema } from "@/schemas/index";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormLabel, FormControl, FormItem } from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import SocialLogin from "./social-login";
import { useState, useTransition } from "react";
import { login } from "@/actions/login";
import FormError from "../form-error";
import FormSuccess from "../form-success";

export default function LoginForm({ urlError }) {
    const [error, setError] = useState(urlError);
    const [success, setSuccess] = useState(null);
    const [isPending, startTransition] = useTransition();

    const form = useForm({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
        }
    })

    function onSubmit(values) {
        setError(null);
        setSuccess(null);

        startTransition(async () => {
            await login(values)
            .then(data => {
                console.log("Login form submitted");
                console.log(data);
                form.reset();

                if (data.error) {
                    setError(data.error);
                }

                if (data.success) {
                    setSuccess(data.success);
                }
            })
        })
    }
    
    return (
        <div className="flex flex-col gap-8">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="email@xample.com" {...field} disabled={isPending} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormError error={error} />
                    <FormSuccess success={success} />
                    <Button className="w-full" type="submit" disabled={isPending}>Login with email</Button>
                </form>
            </Form>
            <SocialLogin />
        </div>
    )
}