"use server"

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { generateStabilityImages } from "@/lib/stability";

const PAGE_SIZE = 20;

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
            image: {
                take: 1,
                orderBy: {
                    createdAt: "desc"
                }
            }
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

    let images;

    switch (data?.provider) {
        case "stability":
            images = await generateStabilityImages(data);
            break;
        case "openai":
            images = await generateDalleImages(data);
            break;
        default:
            images = null;
    }
}