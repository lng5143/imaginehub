import { CreateOrEditImageGenerationDTO } from "@/types/image-generation";

const STABILITY_ENDPOINT = "https://api.stability.ai/v2beta/stable-image/generate/";

export const generateStabilityImages = async (data: CreateOrEditImageGenerationDTO, apiKey: string) => {
    let modelEndpoint;
    switch(data?.model) {
        case "sd3-medium":
        case "sd3-large":
        case "sd3-large-turbo":
            modelEndpoint = "sd3";
            break;
        case "si-ultra":
            modelEndpoint = "ultra";
            break;
        case "si-core":
            modelEndpoint = "core";
    }

    const response = await fetch(`${STABILITY_ENDPOINT}${modelEndpoint}`, {
        method: "POST",
        headers: {
            "Accept": "image/*",
            "Authorization": `Bearer ${apiKey}`
        },
        body: (() => {
            const formData = new FormData();
            formData.append("prompt", data.prompt);
            formData.append("model", data.model);
            formData.append("seed", data?.sd_seed?.toString()!);
            if (data?.sd_aspectRatio) formData.append("aspect_ratio", data?.sd_aspectRatio);
            if (data?.sd_negativePrompt) formData.append("negative_prompt", data?.sd_negativePrompt);
            if (data?.sd_stylePreset) formData.append("style_preset", data?.sd_stylePreset);
            return formData;
        })(),
    })

    if (!response.ok) {
        const resData = await response.json();
        if (resData?.errors?.length > 0)
            return { success: false, message: resData?.errors[0] }
        else
            return { success: false, message: "Failed to generate images" }
    }

    const imageBlob = await response.blob();
    const images = [imageBlob];
    const formData = new FormData();
    images.forEach((blob, index) => {
        formData.append(`file${index}`, blob);
    })

    return { success: true, data: formData }
}