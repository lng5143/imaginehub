import { FormControl, FormField, FormItem } from "../../ui/form";
import { useForm } from "react-hook-form";
import { useCurrentModel } from "@/store/use-current-model";
import InputLabel from "../input-label";
import { Model } from "@prisma/client";
import { DE2_SIZES, DE3_QUALITIES, DE3_SIZES, HINTS } from "@/const/consts";
import CreateBaseForm from "./create-base-form";
import { CreateFormProps } from "@/types/create-form";
import { Badge } from "@/components/ui/badge";
import SliderSelector from "./slider-selector";
import AdvancedFormFields from "./advanced-form-fields";
import { getDefaultValues, getResolver } from "@/lib/models";

export default function DallEForm({ onSubmit, isSubmitting } : CreateFormProps) {
    const [currentModel] = useCurrentModel();

    const form = useForm({
        resolver: getResolver(currentModel),
        defaultValues: getDefaultValues(currentModel),
        mode: "onSubmit"
    });

    return (
        <CreateBaseForm onSubmit={onSubmit} isSubmitting={isSubmitting} form={form}>
            <FormField
                control={form.control}
                name="size"
                render={({ field }) => (
                    <SizeSelector field={field} model={currentModel} />
                )}
            />

            <AdvancedFormFields>
                {/* DALL-E 3 Quality Selector */}
                {currentModel === Model.DALL_E_3 && (
                    <FormField
                        control={form.control}
                        name="quality"
                        render={({ field }) => (
                            <DE3QualitySelector field={field} />
                        )}
                    />
                )}

                {/* DALL-E 2 Samples Selector */}
                {currentModel === Model.DALL_E_2 && (
                    <FormField
                        control={form.control}
                        name="samples"
                        render={({ field }) => (
                            <DE2SamplesSelector field={field} />
                        )}
                    />
                )}
            </AdvancedFormFields>
        </CreateBaseForm>
    );
}

const SizeSelector = ({ field, model }: { field: any, model: Model }) => {
    const sizeOptions = model === Model.DALL_E_2 ? DE2_SIZES : DE3_SIZES;

    return (
        <FormItem>
            <InputLabel label="Size" hint={HINTS.DE_SIZE} />
            <FormControl>
            {sizeOptions.map((size, index) => (
                <Badge
                    key={index}
                    // className="flex items-center justify-center"
                    variant={field.value === size ? "ibLightChosen" : "outline"}
                    onClick={() => field.onChange(size)}
                >
                    {size}
                </Badge>
            ))}
            </FormControl>
        </FormItem>
    )
}

const DE3QualitySelector = ({ field }: { field: any }) => (
    <FormItem>
        <InputLabel label="Quality" hint={HINTS.DE_QUALITY} />
        <FormControl className="flex flex-wrap gap-2">
            {DE3_QUALITIES.map((quality, index) => (
                <Badge
                    key={index}
                    // className="flex items-center justify-center"
                    variant={field.value === quality ? "ibLightChosen" : "outline"}
                    onClick={() => field.onChange(quality)}
                >
                    {quality}
                </Badge>
            ))}
        </FormControl>
    </FormItem>
)

const DE2SamplesSelector = ({ field }: { field: any }) => (
    <FormItem>
        <InputLabel label="Samples" hint={HINTS.DE_SAMPLES} />
        <FormControl>
            <SliderSelector 
                field={field}
                defaultValue={[1]}
                min={1}
                max={10}
                step={1}
            />
        </FormControl>
    </FormItem>
)