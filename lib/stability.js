const STABILITY_ENDPOINT = "https://api.stability.ai/v2beta/stable-image/generate/";

export const generateStabilityImages = async (data) => {
    const stabilityKey = localStorage.getItem("ib_stability_api_key");
    if (!stabilityKey) {
        return { success: false, message: "No Stability AI API key found. Please enter your API key in settings." }
    }

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
            "Authorization": `Bearer ${stabilityKey}`
        },
        body: (() => {
            const formData = new FormData();
            formData.append("prompt", data?.prompt);
            formData.append("model", data?.model);
            formData.append("seed", data?.sd_seed);
            formData.append("aspect_ratio", data?.sd_aspectRatio);
            formData.append("negative_prompt", data?.sd_negativePrompt);
            formData.append("style_preset", data?.sd_stylePreset);
            return formData;
        })(),
    })

    if (!response.ok) {
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