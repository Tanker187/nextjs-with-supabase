import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Suspense } from "react";

async function UserPosts() {
  const supabase = await createClient();

  // Check authentication
  const { data, error } = await supabase.auth.getClaims();
  if (error || !data?.claims) {
    redirect("/auth/login");
  }

  const userId = data.claims.sub; // Get authenticated user ID

  // Fetch user's posts from Supabase
  const { data: posts, error: fetchError } = await supabase
    .from("posts")
    .select("id, title, content, created_at")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (fetchError) {
    console.error("Error fetching posts:", fetchError);
    return <div>Error loading posts</div>;
  }

  return (
    <div className="space-y-4">
      {posts && posts.length > 0 ? (
        posts.map((post) => (
          <div
            key={post.id}
            className="border rounded-lg p-4 hover:bg-accent transition"
          >
            <h3 className="font-semibold text-lg">{post.title}</h3>
            <p className="text-sm text-muted-foreground mt-1">{post.content}</p>
            <time className="text-xs text-muted-foreground mt-2 block">
              {new Date(post.created_at).toLocaleDateString()}
            </time>
          </div>
        ))
      ) : (
        <p className="text-muted-foreground">No posts yet. Create one!</p>
      )}
    </div>
  );
}

export default function PostsPage() {
  return (
    <div className="flex-1 w-full flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">My Posts</h1>
        <p className="text-muted-foreground">
          View and manage your published posts
        </p>
      </div>

      <Suspense fallback={<div>Loading posts...</div>}>
        <UserPosts />
      </Suspense>

      <div className="mt-4">
        <Link
          href="/protected/posts/new"
          className="inline-block px-4 py-2 bg-foreground text-background rounded hover:opacity-90"
        >
          Create New Post
        </Link>
      </div>
    </div>
  );
}
