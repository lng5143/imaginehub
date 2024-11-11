"use server"

import { prisma } from "@/server/lib/prisma";
import { auth } from "@/auth";
import { PAGE_SIZE } from "@/const/consts";
import { updateUserCredits } from "./users";
import { uploadFileToS3AndGetUrl } from "../lib/aws";
import { Image, ImageGeneration, ImageGenerationStatus } from "@prisma/client";
import { getCurrentUserId, getUserById } from "../lib/user";
import { ResponseFactory } from "@/types/response";
import { ApiResponse } from "@/types/response";
import { PagedData } from "@/types/paged-data";
import { CreateOrEditImageGenerationDTO } from "@/types/image-generation";

export const createOrEditImageGeneration = async (data: CreateOrEditImageGenerationDTO) => {
    let existingGen;
    if (data.id)
        existingGen = await getImageGenerationById(data.id);

    const validationRes = await validateImageGenerationData(data, existingGen);

    if (!validationRes.success)
        return validationRes;

    const validatedData = validationRes.data;

    if (existingGen)
        return await editImageGeneration(validatedData!, existingGen);

    return await createImageGeneration(validatedData!);
}

const validateImageGenerationData = async (data: CreateOrEditImageGenerationDTO, existingGen: ImageGeneration)
    : Promise<ApiResponse<CreateOrEditImageGenerationDTO>> => {
    const userId = await getCurrentUserId();

    if (!userId)
        return ResponseFactory.fail({ message: "Unauthorized" });

    data.userId = userId;

    return ResponseFactory.success({ data: data });
}

const createImageGeneration = async (data: CreateOrEditImageGenerationDTO): Promise<ApiResponse<ImageGeneration>> => {
    const generation = await prisma.imageGeneration.create({
        data: data
    })

    return ResponseFactory.success({ data: generation });
}

const editImageGeneration = async (data: CreateOrEditImageGenerationDTO, existingGen: ImageGeneration) => {
    // TODO: Implement
}

const getImageGenerationById = async (genId: string) => {
    return await prisma.imageGeneration.findUnique({
        where: { id: genId }
    })
}

const updateImageGenerationStatus = async (genId: string, status: ImageGenerationStatus): Promise<ApiResponse> => {
    const res = await prisma.imageGeneration.update({
        where: { id: genId },
        data: { status }
    })

    return ResponseFactory.success({ data: res });
}

export const insertInitialGeneration = async (data: CreateOrEditImageGenerationDTO) => {
    const response = await prisma.imageGeneration.create({
        data: {
            ...data
        }
    })

    return { success: true, data: response }
}

export const updateImageGeneration = async (genId: string, provider: string, data: any, userId: string) => {
    await insertImages(genId, provider, data);

    await prisma.imageGeneration.update({
        where: { id: genId },
        data: { status: ImageGenerationStatus.COMPLETED}
    })

    await updateUserCredits(userId);

    return { success: true }
}

export const uploadImageAndUpdateGeneration = async () : Promise<ApiResponse> => {

    return ResponseFactory.success({});
}

const insertImages = async (genId: string, provider: string, data: any) => {
    let imageUrls: string[] = [];

    if (provider === "openai") {
        for (const item of data) {
            const response = await fetch(item.url);
            if (!response.ok) 
                continue;

            const buffer = await response.arrayBuffer();

            const urlRes = await uploadFileToS3AndGetUrl(process.env.AWS_S3_BUCKET, genId, buffer);
            if (!urlRes.success || !urlRes.data) {
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
            if (!urlRes.success || !urlRes.data) {
                console.log("error uploading image", urlRes);
                continue;
            }

            imageUrls = [...imageUrls, urlRes.data];
        }
    }

    if (imageUrls.length === 0)
        return { success: false, message: "Failed to save images." }

    const res = await prisma.image.createMany({
        data: imageUrls.map(url => ({
            url: url,
            imageGenerationId: genId
        }))
    })

    return { success: true, data: res }
}

export const getGenerations = async (page: number): Promise<ApiResponse<PagedData<ImageGeneration>>> => {
    const userId = await getCurrentUserId();
    
    if (!userId)
        return ResponseFactory.fail({ message: "User not found" })

    const totalCount = await prisma.imageGeneration.count({
        where: { userId: userId, status: { not: ImageGenerationStatus.FAILED } }
    });

    const generations = await prisma.imageGeneration.findMany({
        skip: (page - 1) * PAGE_SIZE,
        take: PAGE_SIZE,
        where: { 
            userId: userId,
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

    return ResponseFactory.success({ data: { totalCount: totalCount, data: generations }})
}

export const getGenerationDetails = async (generationId: string): Promise<ApiResponse<ImageGeneration & { images: Image[] } >> => {
    const userId = await getCurrentUserId();
    
    if (!userId)
        return ResponseFactory.fail({ message: "User not found" })

    const generation = await prisma.imageGeneration.findUnique({
        where: { id: generationId },
        include: {
            images: true
        }
    })

    // const imagesRes = await getImages(generationId);

    return ResponseFactory.success({ data: generation })
}

// const getImages = async (generationId) => {
//     const images = await prisma.image.findMany({
//         where: { imageGenerationId: generationId }
//     })

//     return { success: true, data: images }
// }

export const deleteGeneration = async (generationId: string): Promise<ApiResponse> => {
    const userId = await getCurrentUserId();
    
    if (userId)
        return ResponseFactory.fail({ message: "User not found" })

    await prisma.imageGeneration.delete({
        where: { id: generationId }
    })

    return ResponseFactory.success({ message: "Image generation deleted successfully" })
}