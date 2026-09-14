/**
 * @file proxy.ts
 * @author Shannon Joy Fletcher
 * @description My Supabase proxy/middleware engine for secure session refreshing.
 * 
 * I implemented this to actively inspect HTTP requests for Supabase tokens, refreshing them 
 * dynamically via `@supabase/ssr` server utilities before routing the request down the stack.
 */
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { hasEnvVars } from "../utils";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  if (!hasEnvVars) {
    return supabaseResponse;
  }

  // Always create a request-scoped client; never share auth state between requests.
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL?.startsWith("http") ? process.env.NEXT_PUBLIC_SUPABASE_URL : "https://example.supabase.co",
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim() || "dummy",
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet, headers) {
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value);
          });

          supabaseResponse = NextResponse.next({ request });

          cookiesToSet.forEach(({ name, value, options }) => {
            supabaseResponse.cookies.set(name, value, options);
          });

          Object.entries(headers).forEach(([key, value]) => {
            supabaseResponse.headers.set(key, value);
          });
        },
      },
    },
  );

  // Validate/refresh the request's auth state before any protected-route decision.
  const { data } = await supabase.auth.getClaims();
  const user = data?.claims;

  if (request.nextUrl.pathname.startsWith("/protected") && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/auth/login";
    url.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
