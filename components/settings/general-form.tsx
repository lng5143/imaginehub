import { useTransition } from "react"
import { useForm } from "react-hook-form"
import { GeneralSettingsSchema } from "@/schemas"
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { updateGeneralSettings } from "@/server/actions/general-settings";
import { User, UserTier } from "@prisma/client";
import UpgradeButton from "./upgrade-button";
import { TRIAL_IMAGE_COUNT } from "@/const/consts";
import z from 'zod';

interface GeneralFormProps {
    user: User
}

export default function GeneralForm({ user } : GeneralFormProps) {
    const [isPending, startTransition] = useTransition();

    const form = useForm({
        resolver: zodResolver(GeneralSettingsSchema),
        defaultValues: {
            name: user?.name ?? '',
        }
    })

    function onSubmit(data: z.infer<typeof GeneralSettingsSchema>) {
        startTransition(async () => {
            const res = await updateGeneralSettings(data);

            if (!res.success) {
                toast.error(res?.message);
            } else {
                toast.success(res?.message);
            }
        })
    }

    return (
            (<div className="flex flex-col gap-10">
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
                        <Button variant="ibDark" className="w-40 self-end" type="submit" disabled={isPending}>Save</Button>
                    </form>
                </Form>
                {user?.tier === UserTier.FREE && <UpgradeSection user={user} />}
            </div>
        )
    )
}

function UpgradeSection({ user } : { user: User }) {
    return (
        <div className="flex flex-col gap-2">
                <p className="text-sm">Trials: {user?.trialCredits}/{TRIAL_IMAGE_COUNT}</p>
                <p className="text-sm">Upgrade for unlimited generations and storage.</p>
                <UpgradeButton className="w-40" />
        </div>
    )
}