import useCurrentUser from "@/hooks/use-current-user";
import { useQueryClient } from "@tanstack/react-query";
import { Model } from "@prisma/client";
import { useState } from "react";
import { CreateOrEditImageGenerationDTO } from "@/types/image-generation";
import { toast } from "sonner";

export default function CreateFormWrapper() {
    const queryClient = useQueryClient();
    const currentUser = useCurrentUser();
    const [currentModel, _setCurrentModel] = useState<Model | null>(null);

    const handleInitComplete = () => {
        setIsInitInsertInProgress(false);
        toast.info("Image generation started, please wait...")
    }

    const handleFinalUpdateComplete = () => {
        toast.success("Image generation complete!")
    }

    const handleNoKey = () => {
        setIsNoKeyDialogOpen(true);
    }

    const handleSubmit = async (data: CreateOrEditImageGenerationDTO) => {
        console.log(data);

        try {
            setIsInitInsertInProgress(true);
            const res = await generateImages(data, queryClient, handleInitInsertComplete, handleFinalUpdateComplete);

            if (!res.success) {
                if (res.data?.isNoKey) {
                    handleNoKeyError(res);
                } else {
                    toast.error(res.message);
                    if (res.data?.genId) {
                        await markGenerationAsFailed(res.data?.genId);
                    }
                }
            }
        } catch (error) {
            toast.error("Failed to generate images");
        } finally {
            setIsInitInsertInProgress(false);
        }
    }

    return (
        <></>
    )
}