"use server"

import { prisma } from "@/server/lib/prisma";
import { PAGE_SIZE } from "@/const/consts";
import { updateUserCredits } from "./users";
import { uploadFileToS3AndGetUrl } from "../lib/aws";
import { Image, ImageGeneration, ImageGenerationStatus, Provider } from "@prisma/client";
import { getCurrentUserId } from "../lib/user";
import { ResponseFactory } from "@/types/response";
import { ApiResponse } from "@/types/response";
import { PagedData } from "@/types/paged-data";
import { CreateOrEditImageGenerationDTO } from "@/types/image-generation";

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

const getImageGenerationById = async (genId: string, includeImages: boolean = false) : Promise<ApiResponse<ImageGeneration>> => {
    const userId = await getCurrentUserId();
    
    if (!userId)
        return ResponseFactory.fail({ message: "User not found" })

    const generation = await prisma.imageGeneration.findUnique({
        where: { id: genId },
        include: {
            images: includeImages
        }
    })

    return ResponseFactory.success({ data: generation })

}

export const createOrEditImageGeneration = async (data: CreateOrEditImageGenerationDTO) => {
    let existingGen;
    if (data.id) {
        const existingGenRes = await getImageGenerationById(data.id);
        if (!existingGenRes.success || !existingGenRes.data)
            return existingGenRes;

        existingGen = existingGenRes.data;
    }

    const validationRes = await validateImageGenerationData(data, existingGen);
    if (!validationRes.success || !validationRes.data)
        return validationRes;

    const validatedData = validationRes.data;

    if (validatedData.id)
        return await editImageGeneration(validatedData!, existingGen!);

    return await createImageGeneration(validatedData!);
}

const validateImageGenerationData = async (data: CreateOrEditImageGenerationDTO, existingGen: ImageGeneration | undefined)
    : Promise<ApiResponse<CreateOrEditImageGenerationDTO>> => {
    const userId = await getCurrentUserId();

    if (!userId)
        return ResponseFactory.fail({ message: "Unauthorized" });

    if (data.id && !existingGen)
        return ResponseFactory.fail({ message: "Old image generation not found" });

    data.userId = userId;

    return ResponseFactory.success({ data: data });
}

const createImageGeneration = async (data: CreateOrEditImageGenerationDTO): Promise<ApiResponse<ImageGeneration>> => {
    const { id, openAIGenerationConfigs, stabilityGenerationConfigs, ...genData} = data;

    if (data.provider === Provider.OPENAI) {
        const generation = await prisma.imageGeneration.create({
            data: {
                openAIGenerationConfigs : { create: openAIGenerationConfigs },
                ...genData
            }
        })

        return ResponseFactory.success({ data: generation });
    }

    if (data.provider === Provider.STABILITY) {
        const generation = await prisma.imageGeneration.create({
            data: {
                stabilityGenerationConfigs : { create: stabilityGenerationConfigs },
                ...genData
            }
        })

        return ResponseFactory.success({ data: generation });
    }

    return ResponseFactory.fail({ message: "Invalid provider" });
}

const editImageGeneration = async (data: CreateOrEditImageGenerationDTO, existingGen: ImageGeneration) => {
    // TODO: Implement when needed
}

const updateImageGenerationStatus = async (genId: string, status: ImageGenerationStatus): Promise<ApiResponse> => {
    const res = await prisma.imageGeneration.update({
        where: { id: genId },
        data: { status }
    })

    return ResponseFactory.success({ data: res });
}

export const uploadImageAndUpdateGeneration = async (genId: string, provider: Provider, data: any) : Promise<ApiResponse> => {
    const uploadRes = await uploadImages(genId, provider, data);
    if (!uploadRes.success) {
        await updateImageGenerationStatus(genId, ImageGenerationStatus.FAILED);
        return uploadRes;
    }

    await updateImageGenerationStatus(genId, ImageGenerationStatus.COMPLETED);
    await updateUserCredits();

    return ResponseFactory.success({ message: "Image generation completed!" });
}

const uploadImages = async (genId: string, provider: string, data: any) : Promise<ApiResponse> => {
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
        return ResponseFactory.fail({ message: "Failed to upload images." });

    const res = await prisma.image.createMany({
        data: imageUrls.map(url => ({
            url: url,
            imageGenerationId: genId
        }))
    })

    return ResponseFactory.success({ });
}

export const deleteGeneration = async (generationId: string): Promise<ApiResponse> => {
    const userId = await getCurrentUserId();
    
    if (userId)
        return ResponseFactory.fail({ message: "User not found" })

    await prisma.imageGeneration.delete({
        where: { id: generationId }
    })

    return ResponseFactory.success({ message: "Image generation deleted successfully" })
}