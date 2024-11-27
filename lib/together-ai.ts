import Together from "together-ai";
import { ApiResponse, ResponseFactory } from "@/types/response";
import { toFormData } from "./images";
import { CreateOrEditImageGenerationDTO } from "@/types/image-generation";
import { Model } from "@prisma/client";
import { ERROR_TYPES } from "@/const/consts";

interface TogetherFLUXPayload {
    steps: number;
    n: number;
    height: number;
    width: number;
    model: string;
    prompt: string;
}

export const generateFLUXImages = async (data : CreateOrEditImageGenerationDTO, apiKey : string) : Promise<ApiResponse<string[]>> => {
    const together = new Together({
        apiKey: apiKey
    })

    let res;
    try {
        const payload = getFLUXPayload(data);
        res = await together.images.create(payload);
        console.log(res);
    } catch (error: any) {
        const errorData = await JSON.parse(error.message.split(" ").slice(1).join(" "));
        const errorMessage = errorData.error.message;

        if (error.message.includes("500")) {
            return ResponseFactory.fail({ message: "Something went wrong with Together AI server. Please try again later." });
        }

        return ResponseFactory.fail({ message: errorMessage });
    }

    //@ts-ignore
    const urls = res.data.map((image) => image.url);

    return ResponseFactory.success({ data: urls });
    // return ResponseFactory.success({ data: res });
}

const getFLUXPayload = (data: CreateOrEditImageGenerationDTO) : TogetherFLUXPayload => {
    return {
        steps: data.fluxGenerationConfigs?.steps || 4,
        n: data.samples || 1,
        height: data.fluxGenerationConfigs?.height || 1024,
        width: data.fluxGenerationConfigs?.width || 1024,
        model: getTogetherModelString(data.model),
        prompt: data.prompt
    }
}

const getFLUXExamplePayload = () : any => {
    return {
        prompt: 'paper planes',
        // model: 'black-forest-labs/FLUX.1-schnell-Free',
        model : 'black-forest-labs/FLUX.1-pro',
        // model: 'black-forest-labs/FLUX.1.1-pro',
        steps: 1,
        seed: 0,
        n: 1,
        height: 1024,
        width: 1024,
        negative_prompt: 'cloud'
      }
}

const getTogetherModelString = (model: Model) : string => {
    switch(model) {
        case Model.FLUX_1_SCHNELL:
            return "black-forest-labs/FLUX.1-schnell-Free";
        case Model.FLUX_1_1_PRO:
            return "black-forest-labs/FLUX.1.1-pro";
        case Model.FLUX_1_PRO:
            return "black-forest-labs/FLUX.1-pro";
        default:
            return "";
    }
}