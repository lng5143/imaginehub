"use server"

import { prisma } from "@/server/lib/prisma";
import { auth } from "@/auth";
import { generateStabilityImages } from "@/lib/stability";
import { uploadFileAndGetUrl } from "../lib/supabase";
import { IMAGE_BUCKET_NAME } from "@/const/imagine-box-consts";
import { PAGE_SIZE } from "@/const/imagine-box-consts";
import { updateUserCredits } from "./users";

export const insertInitialGeneration = async (data) => {
    console.log(data);

    const response = await prisma.imageGeneration.create({
        data: {
            status: "PROCESSING",
            ...data
        }
    })

    console.log("done initial insert")

    return { success: true, data: response }
}

export const updateImageGeneration = async (id, provider, data, userId) => {
    const existingGen = await prisma.imageGeneration.findUnique({
        where: { id: id }
    })

    if (!existingGen)
        throw new Error("Image generation not found");

    await insertImages(id, provider, data);

    await prisma.imageGeneration.update({
        where: { id: id },
        data: { status: "SUCCESS"}
    })

    console.log("done update")

    await updateUserCredits(userId);

    return { success: true }
}

const insertImages = async (genId, provider, data) => {
    if (provider === "openai") {
        let count = 1;
        let imageUrls = [];
        for (const item of data) {
            const response = await fetch(item.url);

            if (!response.ok) 
                return { error: "Failed to fetch image"}

            const imageBlob = await response.blob();
            console.log(imageBlob);

            const url = await uploadFileAndGetUrl(IMAGE_BUCKET_NAME, `${genId}/${count}`, imageBlob);
            imageUrls.push(url);
            count++;
        }

        console.log("done upload")

        const res = await prisma.image.createMany({
            data: imageUrls.map(url => ({
                url: url,
                imageGenerationId: genId
            }))
        })

        return { success: true, data: res }
    }

    if (provider === "stability") {
        let count = 1;
        let imageUrls = [];

        const images = data.values();

        for (const item of images) {
            const url = await uploadFileAndGetUrl(IMAGE_BUCKET_NAME, `${genId}/${count}`, item);
            imageUrls.push(url);
            count++;
        }

        const res = await prisma.image.createMany({
            data: imageUrls.map(url => ({
                url: url,
                imageGenerationId: genId
            }))
        })

        return { success: true, data: res }
    }
}

export const getGenerations = async (page) => {
    const session = await auth();
    
    if (!session)
        throw new Error("Unauthorized");

    const totalCount = await prisma.imageGeneration.count({
        where: { userId: session.user.id }
    });

    const generations = await prisma.imageGeneration.findMany({
        skip: (page - 1) * PAGE_SIZE,
        take: PAGE_SIZE,
        where: { userId: session.user.id },
        orderBy: {
            createdAt: "desc"
        },
        select: {
            id: true,
            images: {
                take: 1,
                orderBy: {
                    createdAt: "desc"
                }
            },
            samples: true,
            status: true
        }
    })

    return { totalCount: totalCount, data: generations };
}

export const getGenerationDetails = async (generationId) => {
    const session = await auth();
    
    if (!session)
        throw new Error("Unauthorized");

    const generation = await prisma.imageGeneration.findUnique({
        where: { id: generationId }
    })

    const imagesRes = await getImages(generationId);

    return { data: { ...generation, images: imagesRes.data } }
}

const getImages = async (generationId) => {
    const images = await prisma.image.findMany({
        where: { imageGenerationId: generationId }
    })

    return { success: true, data: images }
}

export const generateImages = async ( data ) => {
    const session = await auth();
    
    if (!session)
        throw new Error("Unauthorized");

    const initialRes = await prisma.imageGeneration.create({
        status: "PROCESSING",
        ...data
    })

    data.id = initialRes.id;

    let genRes;

    switch (data?.provider) {
        case "stability":
            genRes = await generateStabilityImages(data);
            break;
        case "openai":
            genRes = await generateDalleImages(data);
            break;
        default:
            genRes = null;
    }

    if (genRes.success) {
        await prisma.imageGeneration.update({
            where: { id: initialRes.id },
            data: {
                status: "SUCCESS",
            }
        })
    }
}