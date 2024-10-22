"use server";

import { CreatePostSchema } from "@/schemas";
import { prisma } from "../lib/prisma";
import { BLOG_PAGE_SIZE } from "@/const/imagine-box-consts";
import { JSDOM } from "jsdom";
import { auth } from "@/auth";

export async function getBlogPosts(page) {
    const session = await auth();
    const isAdmin = session?.user?.tier === "ADMIN";

    const offset = (page - 1) * BLOG_PAGE_SIZE;

    const posts = await prisma.blogPost.findMany({
        skip: offset,
        take: BLOG_PAGE_SIZE,
        where: isAdmin ? {} : { isPublished: true }
    });

    return posts;
}

export async function getBlogPostBySlug(slug) {
    const post = await prisma.blogPost.findUnique({
        where: { slug }
    });

    return post;
}

export async function getBlogPostById(id) {
    const post = await prisma.blogPost.findUnique({
        where: { id }
    });

    return post;
}

export async function createOrEditBlogPost(data) {
    const validateRes = await validateBlogPostData(data);

    if (!validateRes.success) {
        return validateRes;
    }

    if (!data.id) 
        return await createBlogPost(data);
    else 
        return await editBlogPost(data);
}

async function createBlogPost(data) {
    const post = await prisma.blogPost.create({
        data
    });

    return { success: true, message: "Post created successfully" };
}

async function editBlogPost(data) {
    const post = await prisma.blogPost.update({
        where: { id: data.id },
        data
    });

    return { success: true, message: "Post updated successfully" };
}

async function validateBlogPostData(data) {
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

function isValidHTML(htmlString) {
    try {
      const dom = new JSDOM(htmlString);
      return !!dom.window.document.body; 
    } catch (e) {
      return false;
    }
  }