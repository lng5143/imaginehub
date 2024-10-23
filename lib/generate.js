import { insertInitialGeneration, updateImageGeneration } from "@/server/actions/generations";
import { generateDalleImages } from "./openai";
import { generateStabilityImages } from "./stability";
import { validateGenerateImage } from "@/server/actions/users";

export const generateImages = async (inputData, queryClient, handleInitInsertComplete, handleFinalUpdateComplete) => {
    const apiKeyRes = validateAPIKey(inputData.provider);
    if (!apiKeyRes.success) {
        return apiKeyRes;
    }

    const validateRes = await validateGenerateImage(inputData.userId, inputData);
    if (!validateRes.success) {
        return validateRes;
    }

    const validatedData = validateRes?.data;
    validatedData.provider = inputData.provider;
    validatedData.userId = inputData.userId;
    validatedData.model = inputData.model;
    validatedData.samples = parseInt(validatedData.samples) || 1;

    const initialGen = await insertInitialGeneration(validatedData);

    queryClient.refetchQueries({ queryKey: ["generations", 1] })
    .then(() => {
        handleInitInsertComplete();
    })

    try {
        let genRes;
        switch (validatedData.provider) {
            case "openai":
                genRes = await generateDalleImages(validatedData, apiKeyRes.data);
                break;
            case "stability":
                genRes = await generateStabilityImages(validatedData, apiKeyRes.data);
                break;
            default:
                return { success: false, message: "Invalid provider!", data: { genId: initialGen?.data?.id } }
        }

        if (!genRes.success) {
            return { success: false, message: genRes.message, data: { genId: initialGen?.data?.id } };
        }

        const updateRes = await updateImageGeneration(initialGen?.data?.id, validatedData.provider, genRes.data, validatedData.userId);
        if (!updateRes.success) {
            return { success: false, message: updateRes.message, data: { genId: initialGen?.data?.id } };
        }

        queryClient.refetchQueries({ queryKey: ["generations", 1] })
        .then(() => {
            handleFinalUpdateComplete();
        })

        return { success: true, data: updateRes.data }
    } catch (error) {
        return { success: false, message: "Failed to generate images!", data: { genId: initialGen?.data?.id } }
    }
}

const validateAPIKey = (provider) => {
    let apiKey;
    switch (provider) {
        case "openai":
            apiKey = localStorage.getItem("ib_openai_api_key");
            break;
        case "stability":
            apiKey = localStorage.getItem("ib_stability_api_key");
            break;
    }

    if (!apiKey && provider === "openai") {
        return { success: false, message: "No OpenAI API key found. Please enter your API key in settings.", data: { isNoKey: true } }
    }
    if (!apiKey && provider === "stability") {
        return { success: false, message: "No Stability AI API key found. Please enter your API key in settings.", data: { isNoKey: true } }
    }

    return { success: true, data: apiKey }
}