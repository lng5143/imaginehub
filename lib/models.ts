import { Model, Provider } from "@prisma/client"
import { zodResolver } from "@hookform/resolvers/zod"
import * as Schema from "@/types/image-generation"
import { LSConsts, SD_RATIOS } from "@/const/consts"
import { Resolver } from "react-hook-form"

export const getAllModels = () => {
    return Object.values(Model).filter((model) => model !== Model.FLUX_1_1_PRO_ULTRA);
}

export const getProviderFromModel = (model: Model | undefined) : Provider | undefined => {
    switch (model) {
        case Model.DALL_E_2:
        case Model.DALL_E_3:
            return Provider.OPENAI
        case Model.STABLE_DIFFUSION_3_MEDIUM:
        case Model.STABLE_DIFFUSION_3_LARGE:
        case Model.STABLE_DIFFUSION_3_LARGE_TURBO:
        case Model.STABLE_IMAGE_CORE:
        case Model.STABLE_IMAGE_ULTRA:
            return Provider.STABILITY
        case Model.FLUX_1_1_PRO:
        case Model.FLUX_1_PRO:
        case Model.FLUX_1_SCHNELL:
            return Provider.TOGETHER
        default:
           return undefined;
    }
}

export const getProviderName = (provider: Provider | undefined) : string | undefined => {
    switch (provider) {
        case Provider.OPENAI:
            return "OpenAI"
        case Provider.STABILITY: 
            return "Stability AI"
        case Provider.REPLICATE:
            return "Replicate"
        case Provider.TOGETHER:
            return "Together AI"
        default:
            return undefined;

    }
}

export const getModelName = (model: Model) : string | undefined => {
    switch (model) {
        case Model.DALL_E_2:
            return "DALL-E 2";
        case Model.DALL_E_3:
            return "DALL-E 3";
        case Model.STABLE_DIFFUSION_3_LARGE:
            return "Stable Diffusion 3.5 Large";
        case Model.STABLE_DIFFUSION_3_MEDIUM:
            return "Stable Diffusion 3.5 Medium";
        case Model.STABLE_DIFFUSION_3_LARGE_TURBO:
            return "Stable Diffusion 3.5 Large Turbo";
        case Model.STABLE_IMAGE_CORE:
            return "Stable Image Core";
        case Model.STABLE_IMAGE_ULTRA:
            return "Stable Image Ultra";
        case Model.FLUX_1_1_PRO:
            return "FLUX 1.1 [pro]"
        case Model.FLUX_1_PRO:
            return "FLUX.1 [pro]"
        case Model.FLUX_1_1_PRO_ULTRA:
            return "FLUX 1.1 [pro] Ultra"
        case Model.FLUX_1_SCHNELL:
            return "FLUX.1 [schnell] (Free)"
        default:
            return undefined;
    }
}

export const getResolver = (model: Model) : Resolver | undefined => {
    switch (model) {
        case Model.STABLE_DIFFUSION_3_LARGE:
            return zodResolver(Schema.SD3LargeFormSchema);
        case Model.STABLE_DIFFUSION_3_LARGE_TURBO:
            return zodResolver(Schema.SD3LargeTurboFormSchema);
        case Model.STABLE_DIFFUSION_3_MEDIUM:
            return zodResolver(Schema.SD3MediumFormSchema);
        case Model.STABLE_IMAGE_CORE:
            return zodResolver(Schema.SICoreFormSchema);
        case Model.STABLE_IMAGE_ULTRA:
            return zodResolver(Schema.SIUltraFormSchema);
        case Model.FLUX_1_1_PRO:
            return zodResolver(Schema.FLUX_1_1_Pro_FormSchema);
        case Model.FLUX_1_PRO:
            return zodResolver(Schema.FLUX_1_Pro_FormSchema);
        case Model.FLUX_1_SCHNELL:
            return zodResolver(Schema.FLUX_1_SCHNELL_FormSchema);
        case Model.DALL_E_2:
            return zodResolver(Schema.DE2FormSchema);
        case Model.DALL_E_3:
            return zodResolver(Schema.DE3FormSchema);
        default: 
            return undefined;
    }
}

export const getDefaultValues = (model: Model) => {
    switch (model) {
        case Model.STABLE_DIFFUSION_3_LARGE:
            return {
                aspectRatio: SD_RATIOS[0],
                seed: 0,
                negativePrompt: "",
                prompt: ""
            }
        case Model.STABLE_DIFFUSION_3_LARGE_TURBO:
            return {
                aspectRatio: SD_RATIOS[0],
                seed: 0,
                negativePrompt: "",
                prompt: ""
            }
        case Model.STABLE_DIFFUSION_3_MEDIUM:
            return {
                aspectRatio: SD_RATIOS[0],
                seed: 0,
                negativePrompt: "",
                prompt: ""
            }
        case Model.STABLE_IMAGE_CORE:
            return {
                aspectRatio: SD_RATIOS[0],
                seed: 0,
                negativePrompt: "",
                stylePreset: undefined,
                prompt: ""
            }
        case Model.STABLE_IMAGE_ULTRA:
            return {
                aspectRatio: SD_RATIOS[0],
                seed: 0,
                negativePrompt: "",
                prompt: ""
            }
        case Model.FLUX_1_1_PRO:
            return {
                width: 1024,
                height: 1024,
                seed: undefined,
                negative_prompt: "",
                steps: 20,
                samples: 1,
                prompt: ""
            }
        case Model.FLUX_1_PRO:
            return {
                width: 1024,
                height: 1024,
                seed: undefined,
                negative_prompt: "",
                steps: 20,
                samples: 1,
                prompt: ""
            }
        case Model.FLUX_1_SCHNELL:
            return {
                width: 1024,
                height: 1024,
                seed: undefined,
                negative_prompt: "",
                steps: 4,
                samples: 1,
                prompt: ""
            }
        case Model.DALL_E_2:
            return {
                size: "1024x1024",
                samples: 1,
                prompt: ""
            }
        case Model.DALL_E_3:
            return {
                size: "1024x1024",
                quality: "standard",
                prompt: ""
            }
        default: 
            return undefined;
    }
}

export const getModelDescription = (model: Model) : string | undefined => {
    switch (model) {
        case Model.FLUX_1_1_PRO:
        case Model.FLUX_1_PRO:
        case Model.FLUX_1_1_PRO_ULTRA:
        case Model.FLUX_1_SCHNELL:
            return "via together.ai"
        default:
            return undefined;
    }
}

export const getModelIcon = (model: Model) : string | undefined => {
    switch (model) {
        case Model.FLUX_1_1_PRO:
        case Model.FLUX_1_PRO:
        case Model.FLUX_1_1_PRO_ULTRA:
        case Model.FLUX_1_SCHNELL:
            return "/logo/bfl-logo.png"
        case Model.STABLE_DIFFUSION_3_LARGE:
        case Model.STABLE_DIFFUSION_3_LARGE_TURBO:
        case Model.STABLE_DIFFUSION_3_MEDIUM:
        case Model.STABLE_IMAGE_CORE:
        case Model.STABLE_IMAGE_ULTRA:
            return "/logo/stability-logo.png"
        case Model.DALL_E_2:
        case Model.DALL_E_3:
            return "/logo/openai-logo.png"
        default:
            return undefined;
    }
}

export const getFLUXDimensions = (model: Model) : [number, number] => {
    switch (model) {
        case Model.FLUX_1_SCHNELL:
            return [256, 1792];
        default:
            return [256, 1440];
    }
}

export const getProviderKey = (provider: Provider | undefined) : string => {
    switch (provider) {
        case Provider.STABILITY:
            return localStorage.getItem(LSConsts.STABILITY_API_KEY) || "";
        case Provider.OPENAI:
            return localStorage.getItem(LSConsts.OPEN_AI_API_KEY) || "";
        case Provider.TOGETHER:
            return localStorage.getItem(LSConsts.TOGETHER_API_KEY) || "";
        default:
            return "";
    }
}