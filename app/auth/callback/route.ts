import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const next = url.searchParams.get("next") ?? "/protected";

  // Only allow relative application paths to prevent open redirects.
  const safeNext = next.startsWith("/") && !next.startsWith("//") ? next : "/protected";
  const redirectUrl = new URL(safeNext, url.origin);

  if (!code) {
    redirectUrl.pathname = "/auth/login";
    redirectUrl.search = "?error=auth_callback_failed";
    return NextResponse.redirect(redirectUrl);
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    redirectUrl.pathname = "/auth/login";
    redirectUrl.search = "?error=auth_callback_failed";
  }

  return NextResponse.redirect(redirectUrl);
}
