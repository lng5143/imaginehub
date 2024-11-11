import { CreateOrEditImageGenerationDTO } from "@/types/image-generation";

const DALLE_ENDPOINT = "https://api.openai.com/v1/images/generations";

export const generateDalleImages = async (data: CreateOrEditImageGenerationDTO, apiKey: string) => {
    let modelName;
    switch(data.model) {
        case "de-2":
            modelName = "dall-e-2";
            break;
        case "de-3":
            modelName = "dall-e-3";
            break;
    }

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
            size: data?.de_size,
            quality: data?.de_quality
        })
    })

    const resData = await response.json();

    if (resData?.error) {
        return { success: false, message: resData?.error?.message }
    }

    return { success: true, data: resData?.data }
}