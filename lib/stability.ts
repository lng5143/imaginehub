import { CreateOrEditImageGenerationDTO } from "@/types/image-generation";
import { toFormData } from "./images";
import { ApiResponse, ResponseFactory } from "@/types/response";
import { Model, Provider } from "@prisma/client";

const STABILITY_ENDPOINT = "https://api.stability.ai/v2beta/stable-image/generate/";

export const generateStabilityImages = async (data: CreateOrEditImageGenerationDTO, apiKey: string) : Promise<ApiResponse<FormData>> => {
    const modelEndpoint = getStabilityModelEndpoint(data.model);
    if (!modelEndpoint) return ResponseFactory.fail({ message: "Invalid model" });

    const response = await fetch(`${STABILITY_ENDPOINT}${modelEndpoint}`, {
        method: "POST",
        headers: {
            "Accept": "image/*",
            "Authorization": `Bearer ${apiKey}`
        },
        body: getStabilityPayload(data),
    })

    if (!response.ok) {
        const resData = await response.json();
        if (resData?.errors?.length > 0)
            return ResponseFactory.fail({ message: resData?.errors[0] });
        else
            return ResponseFactory.fail({ message: "Failed to generate image" });
    }

    const imageBlob = await response.blob();
    const images = [imageBlob];
    const formData = toFormData(images);

    return ResponseFactory.success({ data: formData });
}

const getStabilityModelEndpoint =(model: Model) : string | undefined => {
    switch(model) {
        case Model.STABLE_DIFFUSION_3_LARGE:
        case Model.STABLE_DIFFUSION_3_LARGE_TURBO:
        case Model.STABLE_DIFFUSION_3_MEDIUM:
            return "sd3";
        case Model.STABLE_IMAGE_ULTRA:
            return  "ultra";
        case Model.STABLE_IMAGE_CORE:
            return "core";
        default:
            return undefined;
    }
}

const getStabilityPayload = (data: CreateOrEditImageGenerationDTO) : FormData => {
    const formData = new FormData();
    formData.append("prompt", data.prompt);
    formData.append("model", data.model);
    formData.append("seed", data?.stabilityGenerationConfigs?.seed.toString()!);
    formData.append("aspect_ratio", data?.stabilityGenerationConfigs?.aspectRatio.toString()!);

    const negativePrompt = data?.stabilityGenerationConfigs?.negativePrompt;
    if (negativePrompt && negativePrompt.trim().length > 0) formData.append("negative_prompt", negativePrompt);

    const stylePreset = data?.stabilityGenerationConfigs?.stylePreset;
    if (stylePreset) formData.append("style_preset", stylePreset);

    return formData;
}