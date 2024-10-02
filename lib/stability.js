import { insertImageGeneration, uploadGeneratedImages } from "./generate";
import supabase from "../server/lib/supabase";

const STABILITY_ENDPOINT = "https://api.stability.ai/v2beta/stable-image/generate/";

export const generateStabilityImages = async (data) => {
    const stabilityKey = localStorage.getItem("ib_stability_api_key");
    if (!stabilityKey) {
        return { error: "No API key found" }
    }

    let modelEndpoint;
    switch(data?.model) {
        case "sd-3":
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
            "Content-Type": "multipart/form-data",
            "Accept": "image/*",
            "Authorization": `Bearer ${stabilityKey}`
        },
        body: JSON.stringify({
            // TODO: map data
        })
    })

    if (!response.ok) {
        return { error: "Failed to generate images" }
    }

    const resData = await response.json();
    if (resData.errors) {
        return { error: "Failed to generate images", data: resData }
    }

    return { success: true }
}