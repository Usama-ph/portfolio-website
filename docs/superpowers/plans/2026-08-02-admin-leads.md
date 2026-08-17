# Admin Panel & Voice-Agent Leads Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship `/admin` with Supabase Auth, a simple dashboard, a leads table, and an Eleven Labs post-call webhook that upserts analysis data-collection fields into Supabase.

**Architecture:** Next.js App Router admin segment with cookie-based Supabase SSR auth; middleware protects `/admin/*`; webhook at `/api/webhooks/elevenlabs` verifies HMAC and upserts into `leads` using the service role.

**Tech Stack:** Next.js 16, React 19, Supabase (`@supabase/supabase-js`, `@supabase/ssr`), Zod, existing Tailwind/zinc UI patterns.

**Spec:** `docs/superpowers/specs/2026-08-02-admin-leads-design.md`

## Global Constraints

- Auth: Supabase email/password only; any authenticated user may access admin (signup disabled in Supabase project settings).
- Lead ingestion: webhook only (`post_call_transcription`); no polling.
- Dashboard: simple stats + recent list only (no charts).
- Lead columns: `full_name`, `contact_number`, `interest_type`, `field_career_interest`, `preferred_country_region`, `education_level` (+ conversation metadata).
- Do not expose `SUPABASE_SERVICE_ROLE_KEY` to the client.
- Preserve existing portfolio pages and Eleven Labs widget on Contact.
- Commit only when the user asks (or when the executing agent is explicitly told to commit).

## File map

| Path | Responsibility |
|------|----------------|
| `supabase/migrations/001_leads.sql` | `leads` table + RLS |
| `.env.example` | Document all required env vars |
| `src/lib/supabase/client.ts` | Browser Supabase client |
| `src/lib/supabase/server.ts` | Server Supabase client (cookies) |
| `src/lib/supabase/middleware.ts` | Session refresh helper for middleware |
| `src/lib/supabase/admin.ts` | Service-role client (webhook only) |
| `src/lib/elevenlabs-webhook.ts` | Signature verify + payload → lead mapping |
| `src/middleware.ts` | Protect `/admin` routes |
| `src/app/api/webhooks/elevenlabs/route.ts` | Webhook HTTP handler |
| `src/app/admin/layout.tsx` | Admin shell (sidebar); no public chrome |
| `src/app/admin/login/page.tsx` | Login form |
| `src/app/admin/page.tsx` | Dashboard overview |
| `src/app/admin/leads/page.tsx` | Leads table |
| `src/components/admin/sidebar.tsx` | Nav links + logout |
| `src/components/admin/login-form.tsx` | Client login form |
| `src/components/admin/stats-cards.tsx` | Dashboard stat cards |
| `src/components/admin/leads-table.tsx` | Reusable leads table |
| `src/app/layout.tsx` | Ensure WhatsApp/nav not forced onto admin (prefer admin layout that replaces chrome) |

**Note on public chrome:** Prefer an admin route-group layout that does **not** inherit Navbar/Footer/WhatsApp. If the root layout always wraps them, refactor root layout to a marketing layout group `(site)` and keep admin outside it. Plan Task 4 covers this cleanly.

---

### Task 1: Supabase migration + env docs

**Files:**
- Create: `supabase/migrations/001_leads.sql`
- Modify: `.env.example`

**Interfaces:**
- Produces: SQL schema for `public.leads` as defined in the spec; env var names for later tasks.

- [ ] **Step 1: Write migration SQL**

Create `supabase/migrations/001_leads.sql` with:

```sql
create extension if not exists "pgcrypto";

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  conversation_id text not null unique,
  agent_id text,
  full_name text,
  contact_number text,
  interest_type text,
  field_career_interest text,
  preferred_country_region text,
  education_level text,
  transcript_summary text,
  raw_analysis jsonb,
  called_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);

alter table public.leads enable row level security;

create policy "Authenticated users can read leads"
  on public.leads
  for select
  to authenticated
  using (true);
```

- [ ] **Step 2: Update `.env.example`**

Append (keep existing ElevenLabs agent URL):

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
ELEVENLABS_WEBHOOK_SECRET=
```

- [ ] **Step 3: Sanity-check SQL locally**

If Supabase CLI is available: `supabase db lint` or apply to a linked project. If not, visually verify SQL against the spec checklist (unique `conversation_id`, RLS select for authenticated only).

- [ ] **Step 4: Stop for human apply**

Remind the user to create a Supabase project, run the migration (SQL editor or CLI), disable public sign-ups, and create an Auth user. Do not block remaining code tasks on their live project.

---

### Task 2: Supabase clients

**Files:**
- Create: `src/lib/supabase/client.ts`
- Create: `src/lib/supabase/server.ts`
- Create: `src/lib/supabase/middleware.ts`
- Create: `src/lib/supabase/admin.ts`

**Interfaces:**
- Consumes: env vars from Task 1
- Produces:
  - `createClient()` browser
  - `createClient()` server (async cookies)
  - `updateSession(request)` for middleware
  - `createAdminClient()` service role (server-only)

- [ ] **Step 1: Install packages**

Run: `npm install @supabase/supabase-js @supabase/ssr`

Expected: packages added to `package.json`.

- [ ] **Step 2: Implement browser client**

`src/lib/supabase/client.ts` — `createBrowserClient` with `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

- [ ] **Step 3: Implement server client**

`src/lib/supabase/server.ts` — `createServerClient` using `cookies()` from `next/headers`, matching current `@supabase/ssr` Next.js App Router pattern from Supabase docs.

- [ ] **Step 4: Implement middleware helper + admin client**

- `src/lib/supabase/middleware.ts` — refresh session on the request/response.
- `src/lib/supabase/admin.ts` — `createClient(url, SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } })`. Throw if service role missing when called.

- [ ] **Step 5: Typecheck**

Run: `npx tsc --noEmit`  
Expected: PASS (or only unrelated pre-existing errors).

---

### Task 3: Auth middleware

**Files:**
- Create: `src/middleware.ts`

**Interfaces:**
- Consumes: `updateSession` from Task 2
- Produces: Redirect unauthenticated users away from `/admin` (except `/admin/login`); redirect authenticated users away from `/admin/login` to `/admin`.

- [ ] **Step 1: Write middleware**

Matcher should include `/admin/:path*`. Logic:

1. Call `updateSession`.
2. If path starts with `/admin` and is not `/admin/login` and no user → redirect `/admin/login`.
3. If path is `/admin/login` and user exists → redirect `/admin`.

Do **not** run auth checks on `/api/webhooks/*`.

- [ ] **Step 2: Manual smoke (when env configured)**

Visit `/admin` logged out → login page. Skip if env missing; note in PR/checklist.

---

### Task 4: Admin route group / layout split

**Files:**
- Possibly restructure: `src/app/(site)/layout.tsx` + move marketing pages under `(site)`, OR admin layout that suppresses chrome
- Create: `src/app/admin/layout.tsx`
- Create: `src/components/admin/sidebar.tsx`
- Modify: `src/app/layout.tsx` as needed

**Interfaces:**
- Produces: Admin pages render with sidebar only; public pages keep Navbar/Footer/WhatsApp.

- [ ] **Step 1: Choose isolation strategy**

Preferred: move marketing pages into `src/app/(site)/` with a layout that includes Navbar/Footer/WhatsApp; root layout keeps fonts/globals only; `admin` sits beside `(site)`.

- [ ] **Step 2: Implement admin layout + sidebar**

Sidebar links: Dashboard → `/admin`, Leads → `/admin/leads`, Logout (client signOut → `/admin/login`). Match zinc dark styling.

- [ ] **Step 3: Verify public home still has nav/footer**

Run: `npm run dev`, open `/` and `/admin/login`.  
Expected: `/` unchanged chrome; `/admin/login` no WhatsApp float / marketing nav.

---

### Task 5: Login page

**Files:**
- Create: `src/app/admin/login/page.tsx`
- Create: `src/components/admin/login-form.tsx`

**Interfaces:**
- Consumes: browser `createClient().auth.signInWithPassword({ email, password })`
- Produces: On success, `router.push('/admin')` + refresh.

- [ ] **Step 1: Build login form UI**

Email + password + submit; show error string from Supabase on failure.

- [ ] **Step 2: Wire page**

Centered card layout; title “Admin login”.

- [ ] **Step 3: Manual test with real Supabase user when available**

Expected: valid credentials → dashboard; invalid → error message.

---

### Task 6: Webhook mapper + route

**Files:**
- Create: `src/lib/elevenlabs-webhook.ts`
- Create: `src/app/api/webhooks/elevenlabs/route.ts`

**Interfaces:**
- Consumes: `createAdminClient()`, `ELEVENLABS_WEBHOOK_SECRET`
- Produces:
  - `verifyElevenLabsSignature(rawBody: string, signatureHeader: string | null, secret: string): boolean`
  - `mapTranscriptionToLead(payload: unknown): LeadInsert | null`
  - `POST` handler returning 401/400/200/500 per spec

- [ ] **Step 1: Implement signature verification**

Follow Eleven Labs HMAC: header `ElevenLabs-Signature` as `t=<ts>,v0=<hex>`; message `${t}.${rawBody}`; compare to secret. Reject if timestamp skew > 30 minutes.

- [ ] **Step 2: Implement mapper**

Extract `conversation_id`, `agent_id`, `analysis.data_collection_results` values for the six fields (each result object typically has a `value` — support both `{ value: string }` and plain string). Store `transcript_summary`, `raw_analysis`, `called_at` from metadata when present.

- [ ] **Step 3: Implement POST route**

1. Read raw body text.  
2. Verify signature.  
3. Parse JSON; if type !== `post_call_transcription`, return 200 `{ ok: true, ignored: true }`.  
4. Map lead; if no conversation_id, 400.  
5. Upsert with `onConflict: 'conversation_id'`.  
6. Return 200 `{ ok: true }`.

- [ ] **Step 4: Unit-test mapper with a fixture (lightweight)**

Add a small pure test or assert via a quick `node`/`tsx` script / vitest if the repo has no test runner — prefer a tiny `src/lib/elevenlabs-webhook.test.ts` only if test tooling exists; otherwise validate mapper with a checked-in JSON fixture and a one-off script. Do not add heavy test infra unless already present.

Fixture shape (minimal):

```json
{
  "type": "post_call_transcription",
  "data": {
    "conversation_id": "conv_test_1",
    "agent_id": "agent_test",
    "analysis": {
      "transcript_summary": "User asked about CS counselling.",
      "data_collection_results": {
        "full_name": { "value": "Usama Adil" },
        "contact_number": { "value": "03234465860" },
        "interest_type": { "value": "local career counselling" },
        "field_career_interest": { "value": "computer science" },
        "preferred_country_region": { "value": null },
        "education_level": { "value": "bachelor's" }
      }
    }
  }
}
```

---

### Task 7: Dashboard page

**Files:**
- Create: `src/app/admin/page.tsx`
- Create: `src/components/admin/stats-cards.tsx`
- Create: `src/components/admin/leads-table.tsx` (shared with Task 8)

**Interfaces:**
- Consumes: server `createClient()`; `from('leads').select(...)`
- Produces: Counts for all / today / week; recent 10 leads.

- [ ] **Step 1: Implement server-side queries**

- Total: `select('*', { count: 'exact', head: true })`  
- Today / week: filter `created_at` (or `called_at`) with ISO bounds in UTC or local — pick UTC and document.  
- Recent: `order('created_at', { ascending: false }).limit(10)`

- [ ] **Step 2: Render stats cards + recent table**

Empty state: “No leads yet. Complete a voice call or wait for the webhook.”

- [ ] **Step 3: Manual check**

With seed row in Supabase SQL editor, confirm counts update.

---

### Task 8: Leads page

**Files:**
- Create: `src/app/admin/leads/page.tsx`
- Reuse: `src/components/admin/leads-table.tsx`

**Interfaces:**
- Consumes: same leads select, full list (reasonable limit e.g. 200) newest first.

- [ ] **Step 1: Build full leads page**

Columns: name, contact, interest type, field/career, country/region, education, date.

- [ ] **Step 2: Manual check**

Insert two rows via SQL; both appear sorted correctly.

---

### Task 9: End-to-end wiring checklist (human + agent)

**Files:** none (ops)

- [ ] **Step 1: Env**

Fill `.env.local` with Supabase URL, anon key, service role, webhook secret; restart `npm run dev`.

- [ ] **Step 2: Apply migration + Auth user**

Run `001_leads.sql` in Supabase; disable sign-ups; create admin user.

- [ ] **Step 3: Configure Eleven Labs webhook**

Point to `https://<host>/api/webhooks/elevenlabs` (tunnel for local). Event: post-call transcription. Confirm agent data-collection IDs match column names.

- [ ] **Step 4: Live call test**

Complete a widget call that fills data collection → verify row in Supabase → visible on `/admin` and `/admin/leads`.

- [ ] **Step 5: Typecheck + lint**

Run: `npx tsc --noEmit` and `npm run lint`  
Expected: clean for touched files.

---

## Operator notes (not code)

1. Data collection field IDs in Eleven Labs must match: `full_name`, `contact_number`, `interest_type`, `field_career_interest`, `preferred_country_region`, `education_level`.  
2. Webhook URL must be publicly reachable for Eleven Labs to deliver.  
3. If payload nesting differs slightly from docs, adjust mapper in `src/lib/elevenlabs-webhook.ts` only — keep columns stable.

## Execution handoff

After you approve this plan, implementation should follow tasks 1→9 in order using **executing-plans** or **subagent-driven-development**. Do not start coding until the design/plan review gate is cleared (unless you explicitly say to implement now).
