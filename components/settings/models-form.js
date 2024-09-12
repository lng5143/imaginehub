import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { ModelsSettingsSchema } from "@/schemas/index";
import { useState } from "react";
import { MODELS } from "@/.seed-data/models";
import SwitchItem from "./switch-item";

export default function ModelsForm() {
    const [isPending, startTransition] = useTransition();
    const [models, setModels] = useState(MODELS);

    const form = useForm({
        resolver: zodResolver(ModelsSettingsSchema),
        defaultValues: {
            ...models
        }
    })

    function onSubmit(values) {
        startTransition(async () => {
            console.log(values);
            
            // save API keys to localStorage 

            // save models settings to DB 
        })
    }

    function handleModelToggle(id, checked) {
        setModels(prev => prev.map(model => 
            model.id === id ? { ...model, active: checked } : model
        ));
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="gap-10 flex flex-col">
                <div className="flex flex-col gap-10">
                    <div className="flex flex-col gap-2">
                        <h2 className="font-semibold">Models</h2>
                        <ul className="flex flex-col gap-2">
                            {models.map((model) => (
                                <li key={model.id}>
                                    <SwitchItem 
                                        id={model.id} 
                                        name={model.name} 
                                        value={model.active} 
                                        onChange={(id, checked) => handleModelToggle(id, checked)} 
                                        disabled={isPending}
                                    />
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex flex-col gap-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-semibold text-base">OpenAI API Key</FormLabel>
                                    <FormControl>
                                        <Input placeholder="sk-..." {...field} disabled={isPending} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-semibold text-base">StabilityAI API Key</FormLabel>
                                    <FormControl>
                                        <Input placeholder="sk-..." {...field} disabled={isPending} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <Button className="w-40 self-end" type="submit" disabled={isPending}>Save</Button>
            </form>
        </Form>
    )
}