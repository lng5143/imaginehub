import { insertInitialGeneration, updateImageGeneration } from "@/server/actions/generations";
import { generateDalleImages } from "./openai";
import { generateStabilityImages } from "./stability";
import { validateGenerateImage } from "@/server/actions/users";

export const generateImages = async (userId, data, queryClient) => {
    const validateRes = await validateGenerateImage(userId);
    if (!validateRes.success) {
        return { error: validateRes.error }
    }

    const initialGen = await insertInitialGeneration(data);

    console.log("init gen", initialGen)

    queryClient.invalidateQueries({ queryKey: ["generations", 1] });

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
        console.log(genRes)
        return { error: genRes.error }
    }

    if (genRes.error) {
        return { error: genRes.error }
    }

    const updateRes = await updateImageGeneration(initialGen?.data?.id, data.provider, genRes.data);
    queryClient.invalidateQueries({ queryKey: ["generations", 1] });
}


// export const insertImageGeneration = async (data) => {
//     const currentUserId = await getCurrentUserId();

//     const response = await prisma.imageGeneration.create({
//         data: {
//             userId: currentUserId,
//             ...data
//         }
//     })

//     if (!response.ok) {
//         return { error: "Failed to insert image generation", data: response }
//     }

//     return { success: true, data: response }
// }

// export const uploadGeneratedImages = async (data) => {
//     const currentUserId = await getCurrentUserId();

//     const imageUrls = [];
//     let count = 1;
//     for (const image of data.images) {
//         const { data, error } = await supabase.storage
//             .from('generated-images')
//             .upload(`${currentUserId}/${data.imageGenerationId}/${count}`, image)
//         count++;
//         imageUrls.push(data.path);
//     }

//     return { success: true, data: imageUrls }
// }

// export const insertImages = async (data) => {
//     const currentUserId = await getCurrentUserId();

//     const res = await prisma.image.createMany({
//         data: data.urls.map(url => ({
//             url,
//             imageGenerationId: data.imageGenerationId
//         }))
//     })

//     if (!res.ok) {
//         return { error: "Failed to insert images", data: res }
//     }

//     return { success: true, data: res }
// }