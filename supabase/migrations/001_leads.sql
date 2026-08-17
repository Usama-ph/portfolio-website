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

grant usage on schema public to authenticated;
grant select on table public.leads to authenticated;
grant all on table public.leads to service_role;
