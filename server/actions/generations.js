"use server"

import { prisma } from "@/server/lib/prisma";
import { auth } from "@/auth";
import { generateStabilityImages } from "@/lib/stability";
import { uploadFileAndGetUrl } from "../lib/supabase";
import { IMAGE_BUCKET_NAME } from "@/const/imagine-box-consts";
import { PAGE_SIZE } from "@/const/imagine-box-consts";

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

export const updateImageGeneration = async (id, provider, data) => {
    const session = await auth();
    
    if (!session)
        throw new Error("Unauthorized");

    const existingGen = await prisma.imageGeneration.findUnique({
        where: { id: id }
    })

    if (!existingGen)
        throw new Error("Image generation not found");

    await prisma.imageGeneration.update({
        where: { id: id },
        data: { status: "SUCCESS"}
    })

    await insertImages(id, provider, data);

    console.log("done update")
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
        include: {
            images: {
                take: 1,
                orderBy: {
                    createdAt: "desc"
                }
            }
        },
        orderBy: {
            createdAt: "desc"
        }
    })

    return { totalCount: totalCount, data: generations };
}

export const getImages = async (generationId) => {
    const session = await auth();
    
    if (!session)
        throw new Error("Unauthorized");

    const images = await prisma.image.findMany({
        where: { generationId: generationId }
    })

    return { data: images}
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