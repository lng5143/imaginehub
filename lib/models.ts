import { Model, Provider } from "@prisma/client"
import { zodResolver } from "@hookform/resolvers/zod"
import * as Schema from "@/types/image-generation"
import { SD_RATIOS } from "@/const/consts"
import { Resolver } from "react-hook-form"

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
            return "Stable Diffusion 3 Large";
        case Model.STABLE_DIFFUSION_3_MEDIUM:
            return "Stable Diffusion 3 Medium";
        case Model.STABLE_DIFFUSION_3_LARGE_TURBO:
            return "Stable Diffusion 3 Large Turbo";
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
            return zodResolver(Schema.FLUX_1_1_ProFormSchema);
        case Model.FLUX_1_PRO:
            return zodResolver(Schema.FLUX_1_ProFormSchema);
        case Model.FLUX_1_1_PRO_ULTRA:
            return zodResolver(Schema.FLUX_1_1_Pro_UltraFormSchema);
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
                safety_tolerance: undefined,
                prompt_upsampling: false,
                prompt: ""
            }
        case Model.FLUX_1_PRO:
            return {
                width: 1024,
                height: 1024,
                seed: undefined,
                safety_tolerance: undefined,
                prompt_upsampling: false,
                steps: undefined,
                guidance: undefined, 
                interval: undefined,
                prompt: ""
            }
        case Model.FLUX_1_1_PRO_ULTRA:
            return {
                width: 1024,
                height: 1024,
                seed: undefined,
                safety_tolerance: undefined,
                raw: false,
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
