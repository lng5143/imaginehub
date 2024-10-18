import { insertInitialGeneration, updateImageGeneration } from "@/server/actions/generations";
import { generateDalleImages } from "./openai";
import { generateStabilityImages } from "./stability";
import { validateGenerateImage } from "@/server/actions/users";

export const generateImages = async (userId, inputData, queryClient, handleInitInsertComplete, handleFinalUpdateComplete) => {
    const validateRes = await validateGenerateImage(userId, inputData);
    if (!validateRes.success) {
        return validateRes;
    }

    const validatedData = validateRes?.data;

    const initialGen = await insertInitialGeneration(validatedData);

    queryClient.refetchQueries({ queryKey: ["generations", 1] })
    .then(() => {
        handleInitInsertComplete();
    })

    try {
        let genRes;
        switch (validatedData.provider) {
            case "openai":
                genRes = await generateDalleImages(validatedData);
                break;
            case "stability":
                genRes = await generateStabilityImages(validatedData);
                break;
            default:
                return { success: false, message: "Invalid provider!", data: { genId: initialGen?.data?.id } }
        }

        if (!genRes.success) {
            return { success: false, message: genRes.message, data: { genId: initialGen?.data?.id } };
        }

        const updateRes = await updateImageGeneration(initialGen?.data?.id, validatedData.provider, genRes.data, userId);
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