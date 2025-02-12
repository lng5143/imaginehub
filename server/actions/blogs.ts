"use server";

import { CreatePostSchema } from "@/schemas";
import { prisma } from "../lib/prisma";
import { BLOG_PAGE_SIZE } from "@/const/consts";
import { JSDOM } from 'jsdom';
import { getCurrentUser } from "./users";
import { ApiResponse, ResponseFactory } from "@/types/response";
import { PagedData } from "@/types/paged-data";
import { BlogPost } from "@prisma/client";
import z from 'zod';

export async function getBlogPosts(page : number) : Promise<ApiResponse<PagedData<BlogPost>>> {
    // const session = await auth();
    const user = await getCurrentUser();
    if (!user || !user.tier) {
        return ResponseFactory.fail({ message: "User not found" });
    }

    const isAdmin = user.tier === "ADMIN";

    const offset = (page - 1) * BLOG_PAGE_SIZE;

    const posts = await prisma.blogPost.findMany({
        skip: offset,
        take: BLOG_PAGE_SIZE,
        where: isAdmin ? {} : { isPublished: true }
    });

    return posts;
}

export async function getBlogPostBySlug(slug : string) {
    const post = await prisma.blogPost.findUnique({
        where: { slug }
    });

    return post;
}

export async function getBlogPostById(id : string) {
    const post = await prisma.blogPost.findUnique({
        where: { id }
    });

    return post;
}

export async function createOrEditBlogPost(data : z.infer<typeof CreatePostSchema>) {
    const validateRes = await validateBlogPostData(data);

    if (!validateRes.success) {
        return validateRes;
    }

    if (!data.id) 
        return await createBlogPost(data);
    else 
        return await editBlogPost(data);
}

async function createBlogPost(data : z.infer<typeof CreatePostSchema>) {
    const post = await prisma.blogPost.create({
        data
    });

    return { success: true, message: "Post created successfully" };
}

async function editBlogPost(data : z.infer<typeof CreatePostSchema>) {
    const post = await prisma.blogPost.update({
        where: { id: data.id },
        data
    });

    return { success: true, message: "Post updated successfully" };
}

async function validateBlogPostData(data : z.infer<typeof CreatePostSchema>) : Promise<ApiResponse> {
    const user = await getCurrentUser();
    if (!user || !user.tier) {
        return ResponseFactory.fail({ message: "User not found" });
    }

    if (user.tier !== "ADMIN") {
        return { success: false, message: "You are not authorized to create or edit blog posts" };
    }

    const validatedFields = CreatePostSchema.safeParse(data);

    if (!validatedFields.success) {
        return { success: false, message: validatedFields.error.message };
    }

    const existingPostById = data?.id ? await getBlogPostById(data.id) : null;
    const existingPostBySlug = await getBlogPostBySlug(data.slug);

    if (!existingPostById && existingPostBySlug) {
        return { success: false, message: "Cannot create new post. Slug already exists" };
    }

    if (existingPostById && existingPostBySlug && (existingPostById.id !== existingPostBySlug.id)) {
        return { success: false, message: "Cannot edit post. Slug already exists" };
    }

    if (!isValidHTML(data.content)) {
        return { success: false, message: "Invalid HTML content" };
    }

    return { success: true };
}

function isValidHTML(htmlString : string) {
    try {
      const dom = new JSDOM(htmlString);
      return !!dom.window.document.body; 
    } catch (e) {
      return false;
    }
  }