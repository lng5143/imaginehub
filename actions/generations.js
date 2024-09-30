"use server"

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

const PAGE_SIZE = 20;

export const getGenerations = async (page) => {
    const session = await auth();
    
    if (!session)
        return { error: "Unauthorized" };

    const totalCount = await prisma.imageGeneration.count({
        where: { userId: session.user.id }
    });

    const generations = await prisma.imageGeneration.findMany({
        skip: (page - 1) * PAGE_SIZE,
        take: PAGE_SIZE,
        where: { userId: session.user.id },
    })

    return { totalCount: totalCount, data: generations };
}

