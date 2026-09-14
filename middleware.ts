/**
 * @file middleware.ts
 * @author Shannon Joy Fletcher
 * @description My Next.js Edge Middleware for intercepting requests and managing Supabase sessions.
 * 
 * I designed this middleware to actively process all incoming routes, intercepting requests to 
 * refresh expired Supabase JWTs before they hit the internal application logic, ensuring 
 * continuous authentication state integrity.
 */
import { updateSession } from "@/lib/supabase/proxy";
import { type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
