"use server"

import { prisma } from "@/server/lib/prisma";
import { auth } from "@/auth";
import { generateStabilityImages } from "@/lib/stability";

const PAGE_SIZE = 20;

export const insertInitialGeneration = async (data) => {
    const session = await auth();
    
    if (!session)
        throw new Error("Unauthorized");

    console.log("here");
    // const response = await prisma.imageGeneration.create({
    //     data: {
    //         status: "PROCESSING",
    //         ...data
    //     }
    // })

    // return response;
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

    const response = await prisma.imageGeneration.update({
        where: { id: id },
        data: { status: "SUCCESS"}
    })


}

const insertImages = async (id, provider, data) => {
    if (provider === "openai") {
        const res = await prisma.image.createMany({
            data: data.map(item => ({
                url: item.url,
                imageGenerationId: id
            }))
        })
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
        // include: {
        //     image: {
        //         take: 1,
        //         orderBy: {
        //             createdAt: "desc"
        //         }
        //     }
        // }
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