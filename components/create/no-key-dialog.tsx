import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "../ui/dialog";
import Link from "next/link";
import { KeyFormSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription } from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { PROVIDERS } from "@/const/consts";
import { toast } from "sonner";
import { z } from "zod";

interface NoKeyDialogProps {
    provider: any,
    open: boolean,
    onOpenChange: (open: boolean) => void
}


export default function NoKeyDialog({ provider, open, onOpenChange } : NoKeyDialogProps)  {
    const form = useForm({
        resolver: zodResolver(KeyFormSchema),
        defaultValues: {
            key: ""
        },
        mode: "onSubmit"
    });

    const handleSuccess = () => {
        toast.success("API key saved!");
        onOpenChange(false);
    }

    const onSubmit = (data: z.infer<typeof KeyFormSchema>) => {
        switch (provider.code) {
            case PROVIDERS.stability.code:
                localStorage.setItem("ib_stability_api_key", data.key);
                handleSuccess();
                break;
            case PROVIDERS.openai.code:
                localStorage.setItem("ib_openai_api_key", data.key);
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
                    <DialogTitle className="text-xl font-semibold">No {provider.name} API key found</DialogTitle>
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
                                        <FormLabel>{provider.name} API Key</FormLabel>
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