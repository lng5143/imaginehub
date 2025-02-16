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
import { ERROR_TYPES } from "@/const/consts";
import { updateImageGenerationStatus } from "@/server/actions/generations";
import FLUXForm from "./forms/flux-form";
import { useCurrentModel } from "@/store/use-current-model";

export default function CreateFormWrapper() {
    const queryClient = useQueryClient();
    const [currentModel] = useCurrentModel();
    const [isNoKeyDialogOpen, setIsNoKeyDialogOpen] = useState(false);
    const [isInitInsertInProgress, setIsInitInsertInProgress] = useState(false);

    const provider = getProviderFromModel(currentModel);

    const handleInitComplete = () => {
        setIsInitInsertInProgress(false);
        toast.info("Image generation started, please keep this page open while generation is in progress.")
    }

    const handleFinalUpdateComplete = () => {
        queryClient.invalidateQueries({ queryKey: ["currentUser"] });
        toast.success("Image generation complete!")
    }

    const handleNoKeyError = () => {
        setIsNoKeyDialogOpen(true);
    }

    const handleSubmit = async (data: CreateOrEditImageGenerationDTO) => {
        setIsInitInsertInProgress(true);
        
        try {
            const res = await generateImages(data, queryClient, {
                onInitComplete: handleInitComplete,
                onFinalUpdateComplete: handleFinalUpdateComplete,
            })

            if (!res.success) {
                const isNoApiKeyError = res.errorType === ERROR_TYPES.NO_API_KEY;
                
                if (isNoApiKeyError) {
                    handleNoKeyError();
                    return;
                }
                
                toast.error(res.message);
                
                const generationId = res.data?.genId;
                if (generationId) {
                    await updateImageGenerationStatus(generationId, ImageGenerationStatus.FAILED);
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
            case Model.FLUX_1_1_PRO:
            case Model.FLUX_1_PRO:
            case Model.FLUX_1_SCHNELL:
                return <FLUXForm onSubmit={handleSubmit} isSubmitting={isInitInsertInProgress} />
            default: 
                return null;
            }
        }

    return (
        <>
            <NoKeyDialog provider={provider} open={isNoKeyDialogOpen} onOpenChange={setIsNoKeyDialogOpen}/>
            <CreateForm />
        </>
    )
}