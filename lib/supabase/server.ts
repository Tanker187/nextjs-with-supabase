/**
 * @file server.ts
 * @author Shannon Joy Fletcher
 * @description My server-side Supabase client factory for Next.js App Router.
 * 
 * I architected this module to securely initialize Supabase clients within Server Components, 
 * Route Handlers, and Server Actions. It dynamically resolves cookies on the server side 
 * to ensure robust session continuity and strict protection of backend tokens.
 */
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Especially important if using Fluid compute: Don't put this client in a
 * global variable. Always create a new client within each function when using
 * it.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL?.startsWith("http") ? process.env.NEXT_PUBLIC_SUPABASE_URL : "https://example.supabase.co",
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim() || "dummy",
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have proxy refreshing
            // user sessions.
          }
        },
      },
    },
  );
}
