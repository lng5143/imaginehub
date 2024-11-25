import { createOrEditImageGeneration, uploadImageAndUpdateGeneration } from "@/server/actions/generations";
import { generateDalleImages } from "./openai";
import { generateStabilityImages } from "./stability";
import { CreateOrEditImageGenerationDTO } from "@/types/image-generation";
import { ApiResponse, ResponseFactory } from "@/types/response";
import { QueryClient } from "@tanstack/react-query";
import { Provider } from "@prisma/client";
import { ERROR_TYPES } from "@/const/consts";

interface GenerationCallbacks {
    onInitComplete: () => void;
    onGenerateComplete?: () => void;
    onFinalUpdateComplete: () => void;
}

export const generateImages = async (
    inputData: CreateOrEditImageGenerationDTO, 
    queryClient: QueryClient, 
    callbacks: GenerationCallbacks
    ) : Promise<ApiResponse> => {

    const apiKeyRes = validateAPIKey(inputData.provider);
    if (!apiKeyRes.success) {
        return apiKeyRes;
    }

    const initialGen = await createOrEditImageGeneration(inputData);
    await queryClient.refetchQueries({ queryKey: ["generations", 1] })
    callbacks.onInitComplete();

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
            callbacks.onFinalUpdateComplete();
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

    if (!apiKey) {
        switch (provider) {
            case Provider.OPENAI:
                return ResponseFactory.fail({ message: "No OpenAI API key found. Please enter your API key in settings.", errorType: ERROR_TYPES.NO_API_KEY });
            case Provider.STABILITY:
                return ResponseFactory.fail({ message: "No Stability AI API key found. Please enter your API key in settings.", errorType: ERROR_TYPES.NO_API_KEY });
            case Provider.BFL:
                return ResponseFactory.fail({ message: "No BFL API key found. Please enter your API key in settings.", errorType: ERROR_TYPES.NO_API_KEY });
            default: 
                return ResponseFactory.fail({ message: "Invalid provider" });
        }
    }

    return ResponseFactory.success({ data: { key: apiKey! } });
}