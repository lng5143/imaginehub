import PaginationContainer from "@/components/create/pagination"
import { getBlogPosts } from "@/server/actions/blogs";
import Image from "next/image";
export default async function BlogPage({ searchParams}) {
  const page = parseInt(searchParams.page) || 1;

  const posts = await getBlogPosts(page);

  return (
    <div className="flex flex-col h-screen px-60 py-40">
      <div className="grid grid-cols-3 gap-10">
        {posts.map((post) => (
          <div key={post.id}>
            <Image src={post.thumbnailUrl} alt={post.title} width={300} height={300} />
            <div>{post.title}</div>
          </div>
        ))}
      </div>
      <PaginationContainer 
        currentPage={page} 
        onPageChange={(page) => router.push(`/blog?page=${page}`)} 
      />
    </div>
  );
}