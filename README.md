# Next.js & Supabase Architecture
By Shannon Joy Fletcher

I designed and built this Next.js & Supabase application architecture to serve as a robust, production-ready foundation for full-stack web applications. My implementation leverages the Next.js App Router and `@supabase/ssr` to ensure secure, cookie-based session management across Server Components, Client Components, Server Actions, and Route Handlers.

## Architecture Highlights
- **Server-First Auth**: I implemented `lib/supabase/server.ts` to construct Supabase clients directly on the server, retrieving authentication sessions via secure HTTP cookies.
- **Middleware Protection**: I configured `middleware.ts` to actively refresh and synchronize sessions before requests even hit the Next.js router.
- **Client Synchronization**: I designed `lib/supabase/client.ts` to provide browser-safe clients that seamlessly mirror the server's session state.
- **Modern UI Stack**: My design utilizes Tailwind CSS and shadcn/ui components for a clean, accessible, and responsive interface.

## Quick Start
1. Add your Supabase credentials to `.env`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-url
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-key
   ```
2. Run `npm install` and `npm run dev`.

## License
MIT License - Copyright (c) 2026 Shannon Joy Fletcher
