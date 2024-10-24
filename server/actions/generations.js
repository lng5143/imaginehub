"use server"

import { prisma } from "@/server/lib/prisma";
import { auth } from "@/auth";
import { PAGE_SIZE } from "@/const/imagine-box-consts";
import { updateUserCredits } from "./users";
import { uploadFileToS3AndGetUrl } from "../lib/aws";
import { ImageGenerationStatus } from "@prisma/client";

export const insertInitialGeneration = async (data) => {
    const response = await prisma.imageGeneration.create({
        data: {
            status: ImageGenerationStatus.PROCESSING,
            ...data
        }
    })

    return { success: true, data: response }
}

export const updateImageGeneration = async (genId, provider, data, userId) => {
    await insertImages(genId, provider, data);

    await prisma.imageGeneration.update({
        where: { id: genId },
        data: { status: ImageGenerationStatus.COMPLETED}
    })

    await updateUserCredits(userId);

    return { success: true }
}

const insertImages = async (genId, provider, data) => {
    let imageUrls = [];

    if (provider === "openai") {
        for (const item of data) {
            const response = await fetch(item.url);
            if (!response.ok) 
                continue;

            const buffer = await response.arrayBuffer();

            const urlRes = await uploadFileToS3AndGetUrl(process.env.AWS_S3_BUCKET, genId, buffer);
            if (!urlRes.success) {
                console.log("error uploading image", urlRes);
                continue;
            }

            imageUrls = [...imageUrls, urlRes.data];
        }
    }

    if (provider === "stability") {
        const imageBlobs = data.values();

        for (const item of imageBlobs) {
            const buffer = await item.arrayBuffer();

            const urlRes = await uploadFileToS3AndGetUrl(process.env.AWS_S3_BUCKET, genId, buffer);
            if (!urlRes.success) {
                console.log("error uploading image", urlRes);
                continue;
            }

            imageUrls = [...imageUrls, urlRes.data];
        }
    }

    const res = await prisma.image.createMany({
        data: imageUrls.map(url => ({
            url: url,
            imageGenerationId: genId
        }))
    })

    return { success: true, data: res }
}

export const getGenerations = async (page) => {
    const session = await auth();
    
    if (!session)
        return { success: false, message: "Unauthorized" }

    const totalCount = await prisma.imageGeneration.count({
        where: { userId: session.user.id, status: { not: ImageGenerationStatus.FAILED } }
    });

    const generations = await prisma.imageGeneration.findMany({
        skip: (page - 1) * PAGE_SIZE,
        take: PAGE_SIZE,
        where: { 
            userId: session.user.id,
            status: { not: ImageGenerationStatus.FAILED }
        },
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
        return { success: false, message: "Unauthorized" }

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

export const deleteGeneration = async (generationId) => {
    await prisma.imageGeneration.delete({
        where: { id: generationId }
    })

    return { success: true, message: "Image generation deleted successfully!" }
}

export const markGenerationAsFailed = async (generationId) => {
    const res = await prisma.imageGeneration.update({
        where: { id: generationId },
        data: { status: ImageGenerationStatus.FAILED }
    })

    return { success: true, data: res }
}