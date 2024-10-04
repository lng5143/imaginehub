const STABILITY_ENDPOINT = "https://api.stability.ai/v2beta/stable-image/generate/";

export const generateStabilityImages = async (data) => {
    const stabilityKey = localStorage.getItem("ib_stability_api_key");
    if (!stabilityKey) {
        return { error: "No API key found" }
    }

    let modelEndpoint;
    switch(data?.model) {
        case "sd-3-medium":
        case "sd-3-large":
        case "sd-3-large-turbo":
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
            // formData.append("aspect_ratio", data?.sd_aspect_ratio);
            // formData.append("model", data?.model);
            // formData.append("seed", data?.sd_seed);
            // formData.append("negative_prompt", data?.sd_negative_prompt);
            // formData.append("style_preset", data?.sd_style_preset);
            return formData;
        })(),
    })

    console.log(response)

    if (!response.ok) {
        return { error: "Failed to generate images" }
    }

    const imageBlob = await response.blob();
    const images = [imageBlob];
    const formData = new FormData();
    images.forEach((blob, index) => {
        formData.append(`file${index}`, blob);
    })

    return { success: true, data: formData }
}