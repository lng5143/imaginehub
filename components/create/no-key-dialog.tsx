"use client"

import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "../ui/dialog";
import Link from "next/link";
import { KeyFormSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription } from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { z } from "zod";
import { Provider } from "@prisma/client";
import { LSConsts } from "@/const/consts";
import { getProviderName } from "@/lib/models";
import { useEffect } from "react";

const getProviderKey = (provider: Provider | undefined) : string => {
    switch (provider) {
        case Provider.STABILITY:
            return localStorage.getItem(LSConsts.STABILITY_API_KEY) || "";
        case Provider.OPENAI:
            return localStorage.getItem(LSConsts.OPEN_AI_API_KEY) || "";
        case Provider.TOGETHER:
            return localStorage.getItem(LSConsts.TOGETHER_API_KEY) || "";
        default:
            return "";
    }
}

interface NoKeyDialogProps {
    provider: Provider | undefined,
    open: boolean,
    onOpenChange: (open: boolean) => void
}

export default function NoKeyDialog({ provider, open, onOpenChange } : NoKeyDialogProps)  {
    const form = useForm({
        resolver: zodResolver(KeyFormSchema),
        defaultValues: {
            key: getProviderKey(provider)
        },
        mode: "onSubmit"
    });

    useEffect(() => {
        form.setValue("key", getProviderKey(provider));
    }, [provider, form]);

    const providerName = getProviderName(provider);

    const handleSuccess = () => {
        toast.success("API key saved!");
        onOpenChange(false);
    }

    const onSubmit = (data: z.infer<typeof KeyFormSchema>) => {
        switch (provider) {
            case Provider.STABILITY:
                localStorage.setItem(LSConsts.STABILITY_API_KEY, data.key);
                handleSuccess();
                break;
            case Provider.OPENAI:
                localStorage.setItem(LSConsts.OPEN_AI_API_KEY, data.key);
                handleSuccess();
                break;
            case Provider.TOGETHER:
                localStorage.setItem(LSConsts.TOGETHER_API_KEY, data.key);
                handleSuccess();
                break;
            default:
                break;
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="flex flex-col gap-8">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">No {providerName} API key found</DialogTitle>
                    <DialogDescription>
                        Please enter your API key to continue.
                    </DialogDescription>
                </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name="key"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{providerName} API Key</FormLabel>
                                        <FormControl>
                                            <div className="flex items-center gap-2">
                                                <Input placeholder="sk-..." {...field} />
                                                <Button type="submit" variant="ibDark">Save</Button>
                                            </div>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </form>
                    </Form>
                <DialogFooter>
                    <p className="text-sm">Or check out <Link className="underline text-blue-500 hover:text-blue-600" href="/how-to" target="_blank" rel="noreferrer">our guide on how to get an API key</Link>.</p>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}