import { createOrEditImageGeneration, uploadImageAndUpdateGeneration } from "@/server/actions/generations";
import { generateDalleImages } from "./openai";
import { generateStabilityImages } from "./stability";
import { CreateOrEditImageGenerationDTO } from "@/types/image-generation";
import { ApiResponse, ResponseFactory } from "@/types/response";
import { QueryClient } from "@tanstack/react-query";
import { Provider } from "@prisma/client";
import { ERROR_TYPES, LSConsts } from "@/const/consts";
import { generateFLUXImages } from "./together-ai";

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
    console.log("inputData", inputData);

    const apiKeyRes = validateAPIKey(inputData.provider);
    if (!apiKeyRes.success) {
        return apiKeyRes;
    }

    const initialGen = await createOrEditImageGeneration(inputData);
    if (!initialGen.success) {
        return initialGen;
    }
    await queryClient.refetchQueries({ queryKey: ["generations", 1] })
    callbacks.onInitComplete();

    try {
        let genRes : ApiResponse<FormData | string[]>;
        switch (inputData.provider) {
            case Provider.OPENAI:
                genRes = await generateDalleImages(inputData, apiKeyRes.data?.key!);
                break;
            case Provider.STABILITY:
                genRes = await generateStabilityImages(inputData, apiKeyRes.data?.key!);
                break;
            case Provider.TOGETHER:
                genRes = await generateFLUXImages(inputData, apiKeyRes.data?.key!);
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

const validateAPIKey = (provider: Provider) : ApiResponse<{ key: string }> => {
    let apiKey;
    switch (provider) {
        case Provider.OPENAI:
            apiKey = localStorage.getItem(LSConsts.OPEN_AI_API_KEY);
            break;
        case Provider.STABILITY:
            apiKey = localStorage.getItem(LSConsts.STABILITY_API_KEY);
            break;
        case Provider.REPLICATE:
            apiKey = localStorage.getItem(LSConsts.REPLICATE_API_KEY);
            break;
        case Provider.TOGETHER:
            apiKey = localStorage.getItem(LSConsts.TOGETHER_API_KEY);
            break;
    }

    if (!apiKey) {
        switch (provider) {
            case Provider.OPENAI:
                return ResponseFactory.fail({ message: "No OpenAI API key found. Please enter your API key in settings.", errorType: ERROR_TYPES.NO_API_KEY });
            case Provider.STABILITY:
                return ResponseFactory.fail({ message: "No Stability AI API key found. Please enter your API key in settings.", errorType: ERROR_TYPES.NO_API_KEY });
            case Provider.REPLICATE:
                return ResponseFactory.fail({ message: "No Replicate API key found. Please enter your API key in settings.", errorType: ERROR_TYPES.NO_API_KEY });
            case Provider.TOGETHER:
                return ResponseFactory.fail({ message: "No Together AI API key found. Please enter your API key in settings.", errorType: ERROR_TYPES.NO_API_KEY });
            default: 
                return ResponseFactory.fail({ message: "Invalid provider" });
        }
    }

    return ResponseFactory.success({ data: { key: apiKey! } });
}