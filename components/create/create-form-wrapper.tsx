import { useQueryClient } from "@tanstack/react-query";
import { ImageGenerationStatus, Model } from "@prisma/client";
import { useState } from "react";
import { CreateOrEditImageGenerationDTO } from "@/types/image-generation";
import { toast } from "sonner";
import DallEForm from "./forms/dall-e-form";
import StabilityForm from "./forms/stability-form";
import NoKeyDialog from "./no-key-dialog";
import { getProviderFromModel } from "@/lib/models";
import { generateImages } from "@/lib/generate";
import { ERROR_TYPES } from "@/lib/error";
import { updateImageGenerationStatus } from "@/server/actions/generations";

export default function CreateFormWrapper() {
    const queryClient = useQueryClient();
    const [currentModel, _setCurrentModel] = useState<Model | undefined>(undefined);
    const [isNoKeyDialogOpen, setIsNoKeyDialogOpen] = useState(false);
    const [isInitInsertInProgress, setIsInitInsertInProgress] = useState(false);

    const provider = getProviderFromModel(currentModel);

    const handleInitComplete = () => {
        setIsInitInsertInProgress(false);
        toast.info("Image generation started, please wait...")
    }

    const handleFinalUpdateComplete = () => {
        toast.success("Image generation complete!")
    }

    const handleNoKeyError = () => {
        setIsNoKeyDialogOpen(true);
    }

    const handleSubmit = async (data: CreateOrEditImageGenerationDTO) => {
        console.log(data);

        try {
            const res = await generateImages(data, queryClient, {
                onInitComplete: handleInitComplete,
                onFinalUpdateComplete: handleFinalUpdateComplete,
            })

            if (!res.success) {
                if (res.errorType === ERROR_TYPES.NO_API_KEY) {
                    handleNoKeyError();
                } else {
                    toast.error(res.message);
                    if (res.data?.genId) {
                        await updateImageGenerationStatus(res.data?.genId, ImageGenerationStatus.FAILED);
                    }
                }
            }
        } catch (error) {
            toast.error("Failed to generate images");
        } finally {
            setIsInitInsertInProgress(false);
        }
    }

    const CreateForm = () => {
        switch(currentModel) {
            case Model.STABLE_DIFFUSION_3_LARGE:
            case Model.STABLE_DIFFUSION_3_LARGE_TURBO:
            case Model.STABLE_DIFFUSION_3_MEDIUM:
            case Model.STABLE_IMAGE_CORE:
            case Model.STABLE_IMAGE_ULTRA:
                return <StabilityForm onSubmit={handleSubmit} isSubmitting={isInitInsertInProgress} />
            case Model.DALL_E_2:
            case Model.DALL_E_3:
                return <DallEForm onSubmit={handleSubmit} isSubmitting={isInitInsertInProgress} />
            }
        }

    return (
        <>
            <NoKeyDialog provider={provider} open={isNoKeyDialogOpen} onOpenChange={setIsNoKeyDialogOpen}/>
            <CreateForm />
        </>
    )
}