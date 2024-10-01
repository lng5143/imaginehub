import { insertImageGeneration, uploadGeneratedImages } from "./common";
import supabase from "./supabase";

const STABILITY_ENDPOINT = "https://api.stability.ai/v2beta/stable-image/generate/";

export const generateStabilityImages = async (data) => {
    const stabilityKey = localStorage.getItem("stability_key");
    if (!stabilityKey) {
        throw new Error("No API key found");
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

    const uploadRes = await uploadGeneratedImages({ images: [resData], imageGenerationId: data.id });
    if (uploadRes.error) {
        return { error: "Failed to upload images", data: uploadRes }
    }

    await prisma.imageGeneration.update({
        where: { id: data.id },
        data: {
            status: "SUCCESS",
        }
    })

    return { success: true }
}