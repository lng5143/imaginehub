import { insertInitialGeneration, updateImageGeneration, uploadImageAndUpdateGeneration } from "@/server/actions/generations";
import { generateDalleImages } from "./openai";
import { generateStabilityImages } from "./stability";
import { CreateOrEditImageGenerationDTO } from "@/types/image-generation";
import { ApiResponse, ResponseFactory } from "@/types/response";
import { QueryClient } from "@tanstack/react-query";

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

    const initialGen = await insertInitialGeneration(inputData);

    await queryClient.refetchQueries({ queryKey: ["generations", 1] })
    handleInitInsertComplete();

    try {
        let genRes;
        switch (inputData.provider) {
            case "openai":
                genRes = await generateDalleImages(inputData, apiKeyRes.data);
                break;
            case "stability":
                genRes = await generateStabilityImages(inputData, apiKeyRes.data);
                break;
            default:
                return { success: false, message: "Invalid provider!", data: { genId: initialGen?.data?.id } }
        }

        if (!genRes.success) {
            return { success: false, message: genRes.message, data: { genId: initialGen?.data?.id } };
        }

        const res = await uploadImageAndUpdateGeneration();
        if (!res.success) {
            return { success: false, message: res.message, data: { genId: initialGen?.data?.id } };
        }

        queryClient.refetchQueries({ queryKey: ["generations", 1] })
        .then(() => {
            handleFinalUpdateComplete();
        })

        return { success: true, data: res.data }
    } catch (error) {
        return { success: false, message: "Failed to generate images!", data: { genId: initialGen?.data?.id } }
    }
}

const validateAPIKey = (provider: string) : ApiResponse<{ isNoKey: boolean }> => {
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
        return ResponseFactory.fail({ message: "No OpenAI API key found. Please enter your API key in settings.", data: { isNoKey: true } });
    }
    if (!apiKey && provider === "stability") {
        return ResponseFactory.fail({ message: "No Stability AI API key found. Please enter your API key in settings.", data: { isNoKey: true } })
    }

    return { success: true, data: apiKey }
}