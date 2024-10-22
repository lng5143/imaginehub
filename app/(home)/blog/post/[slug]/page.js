import { getBlogPostBySlug } from "@/server/actions/blogs";

export default async function BlogPostPage({ params }) {
    const slug = params.slug;

    const blogPost = await getBlogPostBySlug(slug);

    return (
    <div className="flex flex-col h-screen px-60 py-40">
        {!blogPost && <p>Post not found</p>}
        {blogPost && <div>{blogPost.content}</div>}
    </div>
  )
}