"use server"

import { prisma } from "@/server/lib/prisma";
import { PAGE_SIZE } from "@/const/consts";
import { getCurrentUser, updateUserCredits } from "./users";
import { uploadFileToS3AndGetUrl } from "../lib/aws";
import { Image, ImageGeneration, ImageGenerationStatus, Provider, UserTier } from "@prisma/client";
import { getCurrentUserId } from "../lib/user";
import { ResponseFactory } from "@/types/response";
import { ApiResponse } from "@/types/response";
import { PagedData } from "@/types/paged-data";
import { CreateOrEditImageGenerationDTO } from "@/types/image-generation";
import { OpenAIGenerationConfigs, StabilityGenerationConfigs } from "@prisma/client";

const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
const MAX_IMAGE_COUNT = 10;

export const getGenerations = async (page: number): Promise<ApiResponse<PagedData<ImageGeneration & { images: Image[] }>>> => {
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

export const getImageGenerationById = async (genId: string | undefined, includeImages: boolean = false) 
    : Promise<ApiResponse<ImageGeneration & { 
        images: Image[], 
        openAIGenerationConfigs: OpenAIGenerationConfigs | null, 
        stabilityGenerationConfigs: StabilityGenerationConfigs | null,
        fluxGenerationConfigs: any
      }>> => {
    const userId = await getCurrentUserId();
    
    if (!userId)
        return ResponseFactory.fail({ message: "User not found" })

    const generation = await prisma.imageGeneration.findUnique({
        where: { id: genId },
        include: {
            openAIGenerationConfigs: true,
            stabilityGenerationConfigs: true,
            fluxGenerationConfigs: true,
            images: includeImages
        }
    })

    if (!generation || !generation.images || generation.images.lenght === 0)
        return ResponseFactory.fail({ message: "Image generation not found" });

    return ResponseFactory.success({ data: generation })

}

export const createOrEditImageGeneration = async (data: CreateOrEditImageGenerationDTO) : Promise<ApiResponse<ImageGeneration>> => {
    let existingGen;
    if (data.id) {
        const existingGenRes = await getImageGenerationById(data.id);
        if (!existingGenRes.success || !existingGenRes.data)
            return existingGenRes;

        existingGen = existingGenRes.data;
    }

    const validationRes = await validateImageGenerationData(data, existingGen);
    if (!validationRes.success || !validationRes.data) {
        console.log(validationRes);
        return ResponseFactory.fail({ message: validationRes.message });
    }

    const validatedData = validationRes.data;

    if (validatedData.id)
        return await editImageGeneration(validatedData!, existingGen!);

    return await createImageGeneration(validatedData!);
}

const validateImageGenerationData = async (data: CreateOrEditImageGenerationDTO, existingGen: ImageGeneration | undefined)
    : Promise<ApiResponse<CreateOrEditImageGenerationDTO>> => {
    const user = await getCurrentUser();

    if (!user)
        return ResponseFactory.fail({ message: "User not found" });

    if (data.id && !existingGen)
        return ResponseFactory.fail({ message: "Old image generation not found" });

    if (user.tier === UserTier.FREE && user.trialCredits <= 0)
        return ResponseFactory.fail({ message: "You ran out of free generations. Upgrade to continue generating images." });

    data.userId = user.id;

    return ResponseFactory.success({ data: data });
}

const createImageGeneration = async (data: CreateOrEditImageGenerationDTO): Promise<ApiResponse<ImageGeneration>> => {
    console.log("createImageGeneration", data);
    const { id, openAIGenerationConfigs, stabilityGenerationConfigs, fluxGenerationConfigs, ...genData} = data;

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

    if (data.provider === Provider.TOGETHER) {
        const generation = await prisma.imageGeneration.create({
            data: {
                fluxGenerationConfigs : { create: fluxGenerationConfigs },
                ...genData
            }
        })

        return ResponseFactory.success({ data: generation });
    }

    return ResponseFactory.fail({ message: "Invalid provider" });
}

const editImageGeneration = async (data: CreateOrEditImageGenerationDTO, existingGen: ImageGeneration) : Promise<ApiResponse<ImageGeneration>> => {
    // TODO: Implement when needed
    return ResponseFactory.fail({ message: "Not implemented" });
}

export const updateImageGenerationStatus = async (genId: string, status: ImageGenerationStatus): Promise<ApiResponse> => {
    const res = await prisma.imageGeneration.update({
        where: { id: genId },
        data: { status }
    })

    return ResponseFactory.success({ data: res });
}

export const uploadImageAndUpdateGeneration = async (genId: string, data: FormData | string[] ) : Promise<ApiResponse> => {
    console.log("uploadImageAndUpdateGeneration", data);
    if (Array.isArray(data)) {
        data = await getBlobFormDataFromUrls(data);
    }

    const validateRes = await validateUploadImages(data);
    if (!validateRes.success) {
        console.log(validateRes);
        return validateRes;
    }

    const uploadRes = await uploadImages(genId, data);
    if (!uploadRes.success) {
        await updateImageGenerationStatus(genId, ImageGenerationStatus.FAILED);
        console.log(uploadRes);
        return uploadRes;
    }

    // TODO: use transaction to create Image records, update generation and update usercredits
    await updateImageGenerationStatus(genId, ImageGenerationStatus.COMPLETED);
    await updateUserCredits();

    return ResponseFactory.success({ message: "Image generation completed!" });
}

const getBlobFormDataFromUrls = async (urls: string[]) : Promise<FormData> => {
    const formData = new FormData();

    const imageBlobs : Blob[] = await Promise.all(urls.map(async (url: string) => {
        const imageRes = await fetch(url);
        return imageRes.blob();
    }));

    imageBlobs.forEach((blob, index) => {
        formData.append(`file${index}`, blob);
    })

    return formData;
}

const uploadImages = async (genId: string, data: FormData) : Promise<ApiResponse> => {
    const uploadPromises = [];
    
    const items = Array.from(data.values());
    for (const item of items) {
        const file = item as File;
        const buffer = await file.arrayBuffer() as Buffer;
        uploadPromises.push(
            uploadFileToS3AndGetUrl(process.env.AWS_S3_BUCKET, genId, buffer)
        )
    }

    const uploadRes = await Promise.all(uploadPromises);
    const imageUrls = uploadRes.map(res => res.data);
    console.log("s3 urls", imageUrls);
    
    const res = await prisma.image.createMany({
        data: imageUrls.map(url => ({
            url: url,
            imageGenerationId: genId
        }))
    })

    return ResponseFactory.success({ });
}

const validateUploadImages = async (data: FormData) : Promise<ApiResponse<ArrayBuffer[]>> => {
    try {
        let imageCount = 0;
        const validationPromises: ApiResponse[] = [];

        // Count total images
        const items = Array.from(data.values());
        for (const item of items) {
            imageCount++;
            if (imageCount > MAX_IMAGE_COUNT) 
                return ResponseFactory.fail({ message: `Too many images. Maximum allowed: ${MAX_IMAGE_COUNT}` });

            const file = item as File;
            validationPromises.push(validateSingleImage(file));
        }

        if (imageCount === 0) 
            return ResponseFactory.fail({ message: "No images found" });

        // Validate all images
        const results = await Promise.all(validationPromises);
        const invalidResult = results.find(r => !r.success);
        if (invalidResult) {
            return invalidResult;
        }

        return ResponseFactory.success({});

    } catch (error) {
        console.error('Image validation error:', error);
        return ResponseFactory.fail({ message: "Failed to validate images" });
    }
}

const validateSingleImage = (file: File) : ApiResponse => {
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
        return ResponseFactory.fail({ message: "Invalid file type" });
    }

    return ResponseFactory.success({});
}

export const deleteGeneration = async (generationId: string): Promise<ApiResponse> => {
    const userId = await getCurrentUserId();
    
    if (!userId)
        return ResponseFactory.fail({ message: "User not found" })

    await prisma.imageGeneration.delete({
        where: { id: generationId }
    })

    return ResponseFactory.success({ message: "Image generation deleted successfully" })
}