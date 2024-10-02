'use server';

import { prisma } from "@/server/lib/prisma";
import { auth } from "@/auth";

export const getCurrentUserInfo = async () => {
    const session = await auth();

    if (!session?.user) {
        return null;
    }

    const user = await prisma.user.findUnique({
        where: { id: session.user.id }
    })

    return user;
}