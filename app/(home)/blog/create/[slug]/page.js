"use client";

import { CreatePostSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import {
  createOrEditBlogPost,
  getBlogPostBySlug,
} from "@/server/actions/blogs";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useEffect, useTransition } from "react";
import { toast } from "sonner";

export default function CreatePostPage() {
  const [isPending, startTransition] = useTransition();
  const params = useParams();
  const slug = params.slug;

  const form = useForm({
    resolver: zodResolver(CreatePostSchema),
    defaultValues: {},
  });

  const {
    data: blogPost,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["blogPost", slug],
    queryFn: async () => {
      const response = await getBlogPostBySlug(slug);

      if (!response) return null;

      if (!response.success) {
        toast.error(response.message);
      }
      return response.data;
    },
  });

  useEffect(() => {
    if (blogPost) {
      form.reset(blogPost);
    }
  }, [blogPost, form]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const onSubmit = async (data) => {
    startTransition(async () => {
      const res = await createOrEditBlogPost(data);

      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    });
  };

  return (
    <div className="flex flex-col px-60 py-40">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Post title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input placeholder="post-slug" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="thumbnailUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Thumbnail URL</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://example.com/image.jpg"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Textarea
                    className="h-96"
                    placeholder="Write your post content here..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isPending} variant="ibDark" type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
