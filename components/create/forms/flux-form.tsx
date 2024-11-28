import { FormControl, FormField, FormItem } from "../../ui/form";
import { useForm } from "react-hook-form";
import { useCurrentModel } from "@/store/use-current-model";
import InputLabel from "../input-label";
import { Input } from "../../ui/input";
import { Model } from "@prisma/client";
import CreateBaseForm from "./create-base-form";
import { CreateFormProps } from "@/types/create-form";
import SliderSelector from "./slider-selector";
import { HINTS } from "@/const/consts";
import AdvancedFormFields from "./advanced-form-fields";
import { Switch } from "@/components/ui/switch";
import { getDefaultValues, getFLUXDimensions, getResolver } from "@/lib/models";
import { NegativePromptInput } from "./stability-form";

export default function FLUXForm({ onSubmit, isSubmitting } : CreateFormProps) {
    const [currentModel] = useCurrentModel();

    const form = useForm({
        resolver: getResolver(currentModel),
        defaultValues: getDefaultValues(currentModel),
        mode: "onSubmit"
    });

    return (
        <CreateBaseForm onSubmit={onSubmit} isSubmitting={isSubmitting} form={form}>
            {/* Size selectors */}
            <>
            <FormField
                control={form.control}
                name="width"
                render={({ field }) => (
                    <WidthSelector field={field} model={currentModel} />
                )}
            />
            <FormField
                control={form.control}
                name="height"
                render={({ field }) => (
                    <HeightSelector field={field} model={currentModel} />
                )}
            />

            {/* Advanced Inputs */}
            <AdvancedFormFields>
                <>
                <FormField
                    control={form.control}
                    name="seed"
                    render={({ field }) => (
                        <SeedSelector field={field} />
                    )}
                />

                {/* <FormField
                    control={form.control}
                    name="samples"
                    render={({ field }) => (
                        <TogetherSamplesSelector field={field} />
                    )}
                /> */}

                <FormField
                    control={form.control}
                    name="steps"
                    render={({ field }) => (
                        <StepsSelector field={field} model={currentModel} />
                    )}
                />

                <FormField
                    control={form.control}
                    name="negative_prompt"
                    render={({ field }) => (
                        <NegativePromptInput field={field} />
                    )}
                />
            </>
            </AdvancedFormFields>
            </>
        </CreateBaseForm>
    );
}

const TogetherSamplesSelector = ({ field }: { field: any }) => (
    <FormItem>
        <InputLabel label="Samples" hint={HINTS.FL_SAMPLES} />
        <FormControl>
            <SliderSelector field={field} min={1} max={4} step={1} />
        </FormControl>
    </FormItem>
)

const WidthSelector = ({ field, model }: { field: any, model: Model }) => {
    const [min, max] = getFLUXDimensions(model);

    return (
        <FormItem>
            <InputLabel label="Width" hint={HINTS.FL_WIDTH} />
            <FormControl>
                <SliderSelector
                    field={field}
                    min={min}
                    max={max}
                    step={32}
                />
            </FormControl>
        </FormItem>
    )
}

const HeightSelector = ({ field, model }: { field: any, model: Model }) => {
    const [min, max] = getFLUXDimensions(model);

    return (
        <FormItem>
            <InputLabel label="Height" hint={HINTS.FL_HEIGHT} />
            <FormControl>
                <SliderSelector
                    field={field}
                    min={min}
                    max={max}
                    step={32}
                />
            </FormControl>
        </FormItem>
    )
}

const SeedSelector = ({ field }: { field: any }) => (
    <FormItem>
        <InputLabel label="Seed" hint={HINTS.FL_SEED} />
        <FormControl>
            <Input 
                type="number"
                {...field}
                onChange={(e) => {
                    let value = e.target.value ? parseInt(e.target.value) : undefined;
                    if (value)
                        value = Math.max(Math.min(value, 99999999), 0);
                    field.onChange(value);
                }}
                className="bg-white"
            />
        </FormControl>
    </FormItem>
)

const StepsSelector = ({ field, model }: { field: any, model: Model }) => {
    const maxStep = model === Model.FLUX_1_SCHNELL ? 4 : 50;

    return (
        <FormItem>
            <InputLabel label="Steps" hint={HINTS.FL_STEPS} />
            <FormControl>
                <SliderSelector
                    field={field}
                    min={1}
                    max={maxStep}
                    step={1}
                />
            </FormControl>
        </FormItem>
    )
}

