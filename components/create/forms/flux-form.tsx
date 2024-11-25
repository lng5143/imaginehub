import { FormControl, FormField, FormItem } from "../../ui/form";
import { useForm } from "react-hook-form";
import { useCurrentModel } from "@/store/use-current-model";
import InputLabel from "../input-label";
import { Input } from "../../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Model } from "@prisma/client";
import { FLUX_1_1_Pro_UltraFormSchema, FLUX_1_1_ProFormSchema, FLUX_1_ProFormSchema } from "@/types/image-generation";
import CreateBaseForm from "./create-base-form";
import { CreateFormProps } from "@/types/create-form";
import SliderSelector from "./slider-selector";
import { HINTS } from "@/const/consts";
import AdvancedFormFields from "./advanced-form-fields";
import { Switch } from "@/components/ui/switch";

export default function FLUXForm({ onSubmit, isSubmitting } : CreateFormProps) {
    const [currentModel] = useCurrentModel();

    let resolver;
    let defaultValues;
    switch (currentModel) {
        case (Model.FLUX_1_1_PRO): 
            resolver = zodResolver(FLUX_1_1_ProFormSchema);
            defaultValues = {
                width: 1024,
                height: 1024,
                seed: undefined,
                safety_tolerance: undefined,
                prompt_upsampling: false,
                prompt: ""
            }
            break;
        case (Model.FLUX_1_PRO):
            resolver = zodResolver(FLUX_1_ProFormSchema);
            defaultValues = {
                width: 1024,
                height: 1024,
                seed: undefined,
                safety_tolerance: undefined,
                prompt_upsampling: false,
                steps: undefined,
                guidance: undefined, 
                interval: undefined,
                prompt: ""
            }
            break;
        case (Model.FLUX_1_1_PRO_ULTRA):
            resolver = zodResolver(FLUX_1_1_Pro_UltraFormSchema);
            defaultValues = {
                width: 1024,
                height: 1024,
                seed: undefined,
                safety_tolerance: undefined,
                raw: false,
                prompt: ""
            }
            break;
    }

    const form = useForm({
        resolver: resolver,
        defaultValues: defaultValues,
        mode: "onSubmit"
    });

    return (
        <CreateBaseForm onSubmit={onSubmit} isSubmitting={isSubmitting} form={form}>
            {/* Size selectors */}
            <FormField
                control={form.control}
                name="width"
                render={({ field }) => (
                    <WidthSelector field={field} />
                )}
            />
            <FormField
                control={form.control}
                name="height"
                render={({ field }) => (
                    <HeightSelector field={field} />
                )}
            />

            {/* Advanced Inputs */}
            <AdvancedFormFields>

                <FormField
                    control={form.control}
                    name="seed"
                    render={({ field }) => (
                        <SeedSelector field={field} />
                    )}
                />

                <FormField
                    control={form.control}
                    name="safety_tolerance"
                    render={({ field }) => (
                        <SafetyToleranceSelector field={field} />
                    )}
                />

                {(currentModel === Model.FLUX_1_1_PRO || currentModel === Model.FLUX_1_PRO) && (
                    <FormField
                        control={form.control}
                        name="prompt_upsampling"
                        render={({ field }) => (
                            <UpsamplingToggle field={field} />
                        )}
                    />
                )}

                {currentModel === Model.FLUX_1_PRO && (
                    <>
                        <FormField
                            control={form.control}
                            name="steps"
                            render={({ field }) => (
                                <StepsSelector field={field} />
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="guidance"
                            render={({ field }) => (
                                <GuidanceSelector field={field} />
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="interval"
                            render={({ field }) => (
                                <IntervalSelector field={field} />
                            )}
                        />
                    </>
                )}

                {currentModel === Model.FLUX_1_1_PRO_ULTRA && (
                    <FormField
                        control={form.control}
                        name="raw"
                        render={({ field }) => (
                            <RawToggle field={field} />
                        )}
                    />
                )}

            </AdvancedFormFields>
        </CreateBaseForm>
    );
}

const WidthSelector = ({ field }: { field: any }) => (
    <FormItem>
        <InputLabel label="Width" hint={HINTS.FL_WIDTH} />
        <FormControl>
            <SliderSelector
                field={field}
                defaultValue={[1024]}
                min={256}
                max={1024}
                step={32}
            />
        </FormControl>
    </FormItem>
)

const HeightSelector = ({ field }: { field: any }) => (
    <FormItem>
        <InputLabel label="Height" hint={HINTS.FL_HEIGHT} />
        <FormControl>
            <SliderSelector
                field={field}
                defaultValue={[1024]}
                min={256}
                max={1024}
                step={32}
            />
        </FormControl>
    </FormItem>
)

const SeedSelector = ({ field }: { field: any }) => (
    <FormItem>
        <InputLabel label="Seed" hint={HINTS.FL_SEED} />
        <FormControl>
            <Input 
                type="number"
                {...field}
                onChange={(e) => {
                    const value = e.target.value ? parseInt(e.target.value) : undefined;
                    field.onChange(value);
                }}
            />
        </FormControl>
    </FormItem>
)

const UpsamplingToggle = ({ field }: { field: any }) => (
    <FormItem>
        <InputLabel label="Prompt Upsampling" hint={HINTS.FL_UPSAMPLING} />
        <FormControl>
            <Switch 
                {...field}
                onCheckedChange={(checked) => field.onChange(checked)}
            />
        </FormControl>
    </FormItem>
)

const SafetyToleranceSelector = ({ field }: { field: any }) => (
    <FormItem>
        <InputLabel label="Safety Tolerance" hint={HINTS.FL_SAFETY} />
        <FormControl>
            <SliderSelector
                field={field}
                defaultValue={[0]}
                min={0}
                max={6}
                step={1}
            />
        </FormControl>
    </FormItem>
)

const StepsSelector = ({ field }: { field: any }) => (
    <FormItem>
        <InputLabel label="Safety Tolerance" hint={HINTS.FL_SAFETY} />
        <FormControl>
            <SliderSelector
                field={field}
                defaultValue={[1]}
                min={1}
                max={50}
                step={1}
            />
        </FormControl>
    </FormItem>
)

const GuidanceSelector = ({ field }: { field: any }) => (
    <FormItem>
        <InputLabel label="Safety Tolerance" hint={HINTS.FL_SAFETY} />
        <FormControl>
            <SliderSelector
                field={field}
                defaultValue={[1.5]}
                min={1.5}
                max={5}
                step={0.5}
            />
        </FormControl>
    </FormItem>
)

const IntervalSelector = ({ field }: { field: any }) => (
    <FormItem>
        <InputLabel label="Safety Tolerance" hint={HINTS.FL_SAFETY} />
        <FormControl>
            <SliderSelector
                field={field}
                defaultValue={[1]}
                min={1}
                max={4}
                step={1}
            />
        </FormControl>
    </FormItem>
)

const RawToggle = ({ field }: { field: any }) => (
    <FormItem>
        <InputLabel label="Raw" hint={HINTS.FL_UPSAMPLING} />
        <FormControl>
            <Switch 
                {...field}
                onCheckedChange={(checked) => field.onChange(checked)}
            />
        </FormControl>
    </FormItem>
)