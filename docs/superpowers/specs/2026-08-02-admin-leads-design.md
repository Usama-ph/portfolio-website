# Admin Panel & Voice-Agent Leads — Design Spec

**Date:** 2026-08-02  
**Status:** Draft for review  
**Approach:** Next.js `/admin` + Supabase Auth + Eleven Labs post-call webhook

## Goal

Add a password-protected admin area at `/admin` on the portfolio site. After each Eleven Labs voice conversation, post-call analysis data (data-collection fields) is stored in Supabase as leads and viewable in the admin UI.

## Decisions (locked)

| Topic | Choice |
|--------|--------|
| Auth | Supabase Auth email + password |
| Who can access admin | Any authenticated Supabase user (public signup disabled; create admin in dashboard) |
| Lead ingestion | Eleven Labs `post_call_transcription` webhook → insert into `leads` |
| Dashboard | Simple stats: totals, today/week counts, recent leads list |
| Nav | Sidebar: Dashboard overview + Leads |

## Architecture

```
Visitor → Contact page → Eleven Labs widget (existing)
                ↓ (call ends)
Eleven Labs → POST /api/webhooks/elevenlabs (verify HMAC)
                ↓
         Supabase `leads` table (service role insert)

Admin → /admin/login → Supabase Auth session
     → middleware guards /admin/*
     → Dashboard (counts) + Leads table (read via authenticated client)
```

- Public site unchanged except existing voice widget.
- Admin uses its own layout (sidebar); no public navbar/footer on `/admin`.
- Webhook uses Supabase **service role** (no user session). Never expose service role to the browser.
- Browser uses Supabase **anon** key + user JWT for reading leads (RLS: authenticated only).

## Data model — `leads`

Columns match Eleven Labs data-collection keys from the agent analysis UI:

| Column | Type | Notes |
|--------|------|--------|
| `id` | `uuid` PK | `gen_random_uuid()` |
| `conversation_id` | `text` UNIQUE NOT NULL | Idempotent upserts on webhook retries |
| `agent_id` | `text` | Optional |
| `full_name` | `text` | Nullable |
| `contact_number` | `text` | Nullable |
| `interest_type` | `text` | Nullable |
| `field_career_interest` | `text` | Nullable |
| `preferred_country_region` | `text` | Nullable |
| `education_level` | `text` | Nullable |
| `transcript_summary` | `text` | From `analysis.transcript_summary` if present |
| `raw_analysis` | `jsonb` | Full `analysis` (or `data_collection_results`) for debugging |
| `called_at` | `timestamptz` | Prefer ElevenLabs metadata start/end time; else webhook receipt time |
| `created_at` | `timestamptz` | Default `now()` |

**RLS**

- `SELECT`: authenticated users only  
- `INSERT`/`UPDATE`/`DELETE`: no policies for anon/authenticated; webhook uses service role (bypasses RLS)

SQL lives in `supabase/migrations/001_leads.sql` (or equivalent).

## Eleven Labs → lead mapping

Webhook type: `post_call_transcription`.

From payload `data.analysis.data_collection_results` (or equivalent nested shape ElevenLabs sends), map each field’s value (string or null) into the columns above. Treat missing keys as `null`.

Idempotency: `ON CONFLICT (conversation_id) DO UPDATE` so retries do not create duplicates.

**Operator setup (manual, outside code):**

1. Agent data collection IDs must match column names above.  
2. Eleven Labs dashboard → Webhooks → URL `https://<deployed-host>/api/webhooks/elevenlabs`  
3. Subscribe to post-call transcription; store signing secret in env.  
4. Agent must complete analysis so data-collection results are included.

Local/dev: use a tunnel (ngrok, Cloudflare Tunnel) pointed at the Next.js server, or test webhook with a signed fixture later.

## Auth & routing

| Route | Access |
|-------|--------|
| `/admin/login` | Public (redirect to `/admin` if already signed in) |
| `/admin` | Authenticated → dashboard |
| `/admin/leads` | Authenticated → leads table |
| `/api/webhooks/elevenlabs` | Public POST; HMAC verification required |

Middleware (`src/middleware.ts`): for `/admin` paths except login, require Supabase session; else redirect to `/admin/login`.

Login: email + password form → `supabase.auth.signInWithPassword`. Logout clears session.

**Supabase project config:** disable public sign-ups; create one (or more) users in Auth UI.

## Admin UI

**Layout:** fixed sidebar (Dashboard, Leads, Logout) + main content. Dark zinc styling consistent with portfolio, but simpler (no marketing chrome).

**Dashboard (`/admin`):**

- Cards: Total leads, Leads today, Leads this week  
- Table/list: last ~5–10 leads (name, interest, contact, time)

**Leads (`/admin/leads`):**

- Table of all leads: the six data-collection fields + `called_at` / `created_at`  
- Sort newest first  
- Empty state when no rows  
- No edit/delete in v1 (YAGNI)

Hide WhatsApp float and public nav on admin routes (admin root layout).

## Env variables

```env
# Existing
NEXT_PUBLIC_ELEVENLABS_AGENT_URL=

# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Eleven Labs webhook
ELEVENLABS_WEBHOOK_SECRET=
```

Document in `.env.example`. Never commit `.env.local`.

## Packages

- `@supabase/supabase-js`
- `@supabase/ssr` (cookie session for App Router + middleware)

No separate admin framework.

## Error handling

| Case | Behavior |
|------|----------|
| Invalid webhook signature | `401` |
| Wrong event type | `200` ignore (ack to stop retries) |
| Malformed body | `400` |
| DB insert failure | `500` (ElevenLabs may retry) |
| Unauthenticated admin page | Redirect login |
| Missing env at runtime | Fail clearly in webhook/admin server paths |

## Out of scope (v1)

- Email allowlist  
- Charts  
- Lead edit/delete/export  
- Polling Eleven Labs API  
- Contact-form leads in the same table  
- Role-based multi-tenant admin  
- Audio storage from `post_call_audio`

## Success criteria

1. Admin can log in at `/admin/login` with a Supabase Auth user and see dashboard + leads.  
2. Unauthenticated users cannot see lead data.  
3. A completed voice call with data collection results creates/updates one `leads` row via webhook.  
4. Env-driven setup: keys only in environment variables.
