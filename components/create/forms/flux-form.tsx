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
import { getDefaultValues, getResolver } from "@/lib/models";

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
                <>
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
            </>
            </AdvancedFormFields>
            </>
        </CreateBaseForm>
    );
}

const WidthSelector = ({ field }: { field: any }) => (
    <FormItem>
        <InputLabel label="Width" hint={HINTS.FL_WIDTH} />
        <FormControl>
            <SliderSelector
                field={field}
                defaultValue={1024}
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
                defaultValue={1024}
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
                defaultValue={0}
                min={0}
                max={6}
                step={1}
            />
        </FormControl>
    </FormItem>
)

const StepsSelector = ({ field }: { field: any }) => (
    <FormItem>
        <InputLabel label="Steps" hint={HINTS.FL_STEPS} />
        <FormControl>
            <SliderSelector
                field={field}
                defaultValue={1}
                min={1}
                max={50}
                step={1}
            />
        </FormControl>
    </FormItem>
)

const GuidanceSelector = ({ field }: { field: any }) => (
    <FormItem>
        <InputLabel label="Safety Tolerance" hint={HINTS.FL_GUIDANCE} />
        <FormControl>
            <SliderSelector
                field={field}
                defaultValue={1.5}
                min={1.5}
                max={5}
                step={0.5}
            />
        </FormControl>
    </FormItem>
)

const IntervalSelector = ({ field }: { field: any }) => (
    <FormItem>
        <InputLabel label="Safety Tolerance" hint={HINTS.FL_INTERVAL} />
        <FormControl>
            <SliderSelector
                field={field}
                defaultValue={2}
                min={1}
                max={4}
                step={1}
            />
        </FormControl>
    </FormItem>
)

const RawToggle = ({ field }: { field: any }) => (
    <FormItem>
        <InputLabel label="Raw" hint={HINTS.FL_RAW} />
        <FormControl>
            <Switch 
                {...field}
                onCheckedChange={(checked) => field.onChange(checked)}
            />
        </FormControl>
    </FormItem>
)