# Security Policy

## Scope

This repository contains a Next.js application using Supabase Auth and server-side session handling.

Security fixes should be applied to the `main` branch and deployed through the normal CI/CD pipeline.

## Reporting a Vulnerability

Please report suspected security vulnerabilities privately to the repository owner rather than opening a public issue. Include:

- A short description of the issue
- The affected file or route, if known
- Steps to reproduce without exposing real credentials or personal data
- The potential impact

Do not include passwords, API keys, session cookies, access tokens, or other secrets in reports, commits, issues, or pull requests.

## Security Expectations

- Keep Supabase publishable keys in `NEXT_PUBLIC_*` variables; never commit service-role keys.
- Protect database data with Supabase Row Level Security (RLS) policies.
- Treat browser input, redirect parameters, and authentication state as untrusted.
- Keep authentication/session logic server-aware and request-scoped.
- Keep dependencies and the Next.js runtime up to date.
