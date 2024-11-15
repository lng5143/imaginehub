import { createOrEditImageGeneration, uploadImageAndUpdateGeneration } from "@/server/actions/generations";
import { generateDalleImages } from "./openai";
import { generateStabilityImages } from "./stability";
import { CreateOrEditImageGenerationDTO } from "@/types/image-generation";
import { ApiResponse, ResponseFactory } from "@/types/response";
import { QueryClient } from "@tanstack/react-query";
import { Provider } from "@prisma/client";

export const generateImages = async (
    inputData: CreateOrEditImageGenerationDTO, 
    queryClient: QueryClient, 
    handleInitInsertComplete: () => void, 
    handleFinalUpdateComplete: () => void)
    : Promise<ApiResponse> => {
    const apiKeyRes = validateAPIKey(inputData.provider);
    if (!apiKeyRes.success) {
        return apiKeyRes;
    }

    const initialGen = await createOrEditImageGeneration(inputData);
    await queryClient.refetchQueries({ queryKey: ["generations", 1] })
    handleInitInsertComplete();

    try {
        let genRes : ApiResponse<FormData>;
        switch (inputData.provider) {
            case Provider.OPENAI:
                genRes = await generateDalleImages(inputData, apiKeyRes.data?.key!);
                break;
            case Provider.STABILITY:
                genRes = await generateStabilityImages(inputData, apiKeyRes.data?.key!);
                break;
            default:
                return ResponseFactory.fail({ message: "Invalid provider!", data: { genId: initialGen?.data?.id } });
        }

        if (!genRes || !genRes.success || !genRes.data) {
            return ResponseFactory.fail({ message: genRes?.message, data: { genId: initialGen?.data?.id } });
        }

        const res = await uploadImageAndUpdateGeneration(initialGen?.data?.id!, genRes.data!);
        if (!res.success) {
            return ResponseFactory.fail({ message: res.message, data: { genId: initialGen?.data?.id } });
        }

        queryClient.refetchQueries({ queryKey: ["generations", 1] })
        .then(() => {
            handleFinalUpdateComplete();
        })

        return ResponseFactory.success({ data: res.data });
    } catch (error) {
        return ResponseFactory.fail({ message: "Failed to generate images!", data: { genId: initialGen?.data?.id } });
    }
}

const validateAPIKey = (provider: string) : ApiResponse<{ key: string }> => {
    let apiKey;
    switch (provider) {
        case "openai":
            apiKey = localStorage.getItem("ib_openai_api_key");
            break;
        case "stability":
            apiKey = localStorage.getItem("ib_stability_api_key");
            break;
    }

    if (!apiKey && provider === "openai") {
        return ResponseFactory.fail({ message: "No OpenAI API key found. Please enter your API key in settings." });
    }
    if (!apiKey && provider === "stability") {
        return ResponseFactory.fail({ message: "No Stability AI API key found. Please enter your API key in settings." })
    }

    return { success: true, data: { key: apiKey! } }
}