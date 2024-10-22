import { auth } from "@/auth";
import PaginationContainer from "@/components/create/pagination"
import { getBlogPosts } from "@/server/actions/blogs";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function BlogPage({ searchParams }) {
  const session = await auth();
  const isAdmin = session?.user?.tier === "ADMIN";
  const page = parseInt(searchParams.page) || 1;

  const posts = await getBlogPosts(page);

  return (
    <div className="flex flex-col px-40 py-40 gap-10">
      {isAdmin && <Link href="/blog/create/new"><Button variant="ibDark">Create Post</Button></Link>}
      <div className="grid grid-cols-3 gap-10">
        {posts.map((post) => (
          <Link className="flex flex-col gap-2" href={`/blog/post/${post.slug}`} key={post.id}>
            <Image className="rounded-lg" src={post.thumbnailUrl} alt={post.title} width={300} height={300} />
            <div className="text-xl font-semibold">{post.title}</div>
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