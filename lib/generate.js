import { insertInitialGeneration, updateImageGeneration } from "@/server/actions/generations";
import { generateDalleImages } from "./openai";
import { generateStabilityImages } from "./stability";
import { validateGenerateImage } from "@/server/actions/users";

export const generateImages = async (userId, data, queryClient, handleInitInsertComplete, handleFinalUpdateComplete) => {
    const validateRes = await validateGenerateImage(userId);
    if (!validateRes.success) {
        return validateRes;
    }

    const initialGen = await insertInitialGeneration(data);

    queryClient.refetchQueries({ queryKey: ["generations", 1] })
    .then(() => {
        handleInitInsertComplete();
    })

    let genRes;
    switch (data.provider) {
        case "openai":
            genRes = await generateDalleImages(data);
            break;
        case "stability":
            genRes = await generateStabilityImages(data);
            break;
    }

    if (!genRes.success) {
        return genRes;
    }

    const updateRes = await updateImageGeneration(initialGen?.data?.id, data.provider, genRes.data, userId);
    if (!updateRes.success) {
        return updateRes;
    }

    queryClient.refetchQueries({ queryKey: ["generations", 1] })
    .then(() => {
        handleFinalUpdateComplete();
    })

    return { success: true, data: updateRes.data }
}