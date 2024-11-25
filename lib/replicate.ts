import { CreateOrEditImageGenerationDTO } from "@/types/image-generation";
import { ApiResponse, ResponseFactory } from "@/types/response";
import { toFormData } from "./images";
import { Model } from "@prisma/client";

const FLUX_ENDPOINT = "https://api.replicate.com/v1/models/black-forest-labs/";

export const generateFLUXImages = async (data: CreateOrEditImageGenerationDTO, apiKey: string) : Promise<ApiResponse<FormData>> => {
    const payload = getFLUXPayload(data);
    const modelEndpoint = getFLUXModelEndPoint(data.model);
    if (!payload || !modelEndpoint) return ResponseFactory.fail({ message: "Invalid model" });

    const response = await fetch(FLUX_ENDPOINT + modelEndpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify(payload)
    })

    const resData = await response.json();

    if (resData?.error) {
        return { success: false, message: resData?.error?.message }
    }

    const urls = resData?.data.map((d: any) => d?.url);
    const imageBlobs : Blob[] = await Promise.all(urls.map(async (url: string) => {
        const imageRes = await fetch(url);
        return imageRes.blob();
    }));

    const formData = toFormData(imageBlobs);
    
    return ResponseFactory.success({ data: formData });
}

const getFLUXModelEndPoint = (model: Model) : string | undefined => {
    switch(model) {
        case Model.FLUX_1_1_PRO:
            return "flux-1.1-pro/predictions"
        case Model.FLUX_1_1_PRO_ULTRA:
            return "flux-1.1-pro-ultra/predictions"
        case Model.FLUX_1_PRO:
            return "flux-pro/predictions"
        default:
            return undefined;
    }
}

const getFLUXPayload = (data: CreateOrEditImageGenerationDTO) : any | undefined => {
    switch(data.model) {
        case Model.FLUX_1_1_PRO:
            return {
                width: data.fluxGenerationConfigs?.width,
                height: data.fluxGenerationConfigs?.height,
                prompt_upsampling: data.fluxGenerationConfigs?.prompt_upsampling,
                seed: data.fluxGenerationConfigs?.seed,
                safety_tolerance: data.fluxGenerationConfigs?.safety_tolerance,
                output_format: "png",
                prompt: data.prompt,
            }
        case Model.FLUX_1_1_PRO_ULTRA:
            return {
                width: data.fluxGenerationConfigs?.width,
                height: data.fluxGenerationConfigs?.height,
                seed: data.fluxGenerationConfigs?.seed,
                safety_tolerance: data.fluxGenerationConfigs?.safety_tolerance,
                raw: data.fluxGenerationConfigs?.raw,
                output_format: "png",
                prompt: data.prompt,
            }
        case Model.FLUX_1_PRO:
            return {
                width: data.fluxGenerationConfigs?.width,
                height: data.fluxGenerationConfigs?.height,
                seed: data.fluxGenerationConfigs?.seed,
                guidance: data.fluxGenerationConfigs?.guidance,
                steps: data.fluxGenerationConfigs?.steps,
                interval: data.fluxGenerationConfigs?.interval,
                safety_tolerance: data.fluxGenerationConfigs?.safety_tolerance,
                output_format: "png",
                prompt: data.prompt,
            }
        default:
            return undefined;
    }
}