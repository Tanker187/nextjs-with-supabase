/**
 * @file client.ts
 * @author Shannon Joy Fletcher
 * @description My client-side Supabase instance generator for Next.js Client Components.
 * 
 * I implemented this function to instantiate Supabase securely within the browser runtime. 
 * By design, it delegates session persistence to standard document cookies, ensuring seamless 
 * sync with the server-side environment.
 */
import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL?.startsWith("http") ? process.env.NEXT_PUBLIC_SUPABASE_URL : "https://example.supabase.co",
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim() || "dummy",
  );
}
