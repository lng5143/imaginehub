"use server"

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export const getGenerations = async () => {
    const session = await auth();
    
    if (!session)
        return { error: "Unauthorized" };

    

    const generations = await prisma.imageGeneration.findMany({
        where: { userId: session.user.id }
    })

    return { count: generations.length };
}

