"use server";

import { prisma } from "../lib/prisma";
import { BLOG_PAGE_SIZE } from "@/const/imagine-box-consts";

export async function getBlogPosts(page) {
    const offset = (page - 1) * BLOG_PAGE_SIZE;

    const posts = await prisma.blogPost.findMany({
        skip: offset,
        take: BLOG_PAGE_SIZE,
    });

    return posts;
}