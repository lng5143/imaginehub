import { auth } from "@/auth";
import PaginationContainer from "@/components/create/pagination"
import { getBlogPosts } from "@/server/actions/blogs";
import Image from "next/image";
import Link from "next/link";

export default async function BlogPage({ searchParams}) {
  const session = await auth();
  const isAdmin = session?.user?.role === "ADMIN";
  const page = parseInt(searchParams.page) || 1;

  const posts = await getBlogPosts(page);

  return (
    <div className="flex flex-col h-screen px-60 py-40">
      {isAdmin && <Link href="/blog/post/create">Create Post</Link>}
      <div className="grid grid-cols-3 gap-10">
        {posts.map((post) => (
          <Link href={`/blog/post/${post.slug}`} key={post.id}>
            <Image src={post.thumbnailUrl} alt={post.title} width={300} height={300} />
            <div>{post.title}</div>
          </Link>
        ))}
      </div>
      <PaginationContainer 
        currentPage={page} 
        onPageChange={(page) => router.push(`/blog?page=${page}`)} 
      />
    </div>
  );
}