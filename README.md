# Sweet Donation — Polished Build

Production-ready Next.js (App Router) + Supabase app with clean UI, auth (magic link/OTP), requests/offers flows, and responsive design.

## Setup
1. Create Supabase project (free). Enable **Email** provider (OTP/magic link).
2. Run the provided SQL schema in Supabase SQL Editor.
3. Copy `.env.example` → `.env.local` with your Supabase URL + anon key.
4. Install & run:
   ```bash
   npm install
   npm run dev
   ```
5. Deploy to Vercel and add env vars.

## Features
- Beautiful responsive UI (Tailwind)
- Email magic link sign-in (no passwords)
- Create/browse requests; offer help
- User dashboard
- Accessible components and SEO metadata
