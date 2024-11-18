import { Model, Provider } from "@prisma/client"

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
    }       return undefined;
}

export const getProviderName = (provider: Provider | null) : string | undefined => {
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
        default:
            return undefined;
    }
}
