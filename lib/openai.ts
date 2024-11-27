import { CreateOrEditImageGenerationDTO } from "@/types/image-generation";
import { ApiResponse, ResponseFactory } from "@/types/response";
import { toFormData } from "./images";
import { Model } from "@prisma/client";

const DALLE_ENDPOINT = "https://api.openai.com/v1/images/generations";

export const generateDalleImages = async (data: CreateOrEditImageGenerationDTO, apiKey: string) : Promise<ApiResponse<string[]>> => {
    const modelName = getOpenAIModelName(data.model);
    if (!modelName) return ResponseFactory.fail({ message: "Invalid model" });

    const response = await fetch(DALLE_ENDPOINT, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: modelName,
            prompt: data?.prompt,
            n: data?.samples,
            size: data?.openAIGenerationConfigs?.size,
            quality: data?.openAIGenerationConfigs?.quality,
        })
    })

    const resData = await response.json();

    if (resData?.error) {
        return { success: false, message: resData?.error?.message }
    }

    const urls = resData?.data.map((d: any) => d?.url);

    return ResponseFactory.success({ data: urls });
}

const getOpenAIModelName = (model: Model) : string | undefined => {
    switch(model) {
        case Model.DALL_E_2:
            return "dall-e-2";
        case Model.DALL_E_3:
            return "dall-e-3";
        default: 
            return undefined;
    }
}