import { auth } from "@/auth";
import { getBlogPostBySlug } from "@/server/actions/blogs";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface BlogPostPageProps {
    params: {
        slug: string;
    }
}

export default async function BlogPostPage({ params } : BlogPostPageProps) {
    const session = await auth();
    const isAdmin = session?.user?.tier === "ADMIN";

    const slug = params.slug;

    const blogPost = await getBlogPostBySlug(slug);

    return (
    <div className="flex flex-col px-60 py-40 gap-10">
        {isAdmin && blogPost && (
            <div className="flex gap-10 items-center">
                <p>Published: {blogPost.isPublished ? "Yes" : "No"}</p>
                <Link href={`/blog/create/${slug}`}><Button variant="ibDark">Edit Post</Button></Link>
            </div>
        )}
        {!blogPost && <p>Post not found</p>}
        {blogPost && (
            <div className="flex flex-col gap-10">
                <h1 className="text-4xl font-bold">{blogPost.title}</h1>
                <div dangerouslySetInnerHTML={{ __html: blogPost.content }} />
            </div>)}
    </div>
  )
}