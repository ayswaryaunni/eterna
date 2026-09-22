-- ============================================================================
-- Eterna — initial schema
-- Run in: Supabase Dashboard → SQL Editor → New query → paste → Run
-- ============================================================================

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- updated_at trigger helper
-- ---------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

-- ---------------------------------------------------------------------------
-- site_settings (single row)
-- ---------------------------------------------------------------------------
create table public.site_settings (
  id          int primary key default 1 check (id = 1),
  name        text not null default 'Eterna',
  tagline     text not null default '',
  description text not null default '',
  email       text not null default '',
  phone       text not null default '',
  address     text not null default '',
  updated_at  timestamptz not null default now()
);
create trigger site_settings_updated before update on public.site_settings
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- services
-- ---------------------------------------------------------------------------
create table public.services (
  id          uuid primary key default gen_random_uuid(),
  slug        text not null unique,
  title       text not null,
  subtitle    text,
  description text not null default '',
  image_url   text not null default '',
  features    text[] not null default '{}',
  featured    boolean not null default false,
  published   boolean not null default true,
  sort_order  int not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
create index services_order_idx on public.services (published, sort_order);
create trigger services_updated before update on public.services
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- portfolio_projects
-- ---------------------------------------------------------------------------
create table public.portfolio_projects (
  id          uuid primary key default gen_random_uuid(),
  slug        text not null unique,
  title       text not null,
  category    text not null default '',
  location    text,
  event_date  text,                -- free text ("June 2025"), matches current site copy
  description text not null default '',
  cover_url   text not null default '',
  images      text[] not null default '{}',
  video_url   text,
  featured    boolean not null default false,
  published   boolean not null default true,
  sort_order  int not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
create index portfolio_order_idx on public.portfolio_projects (published, sort_order);
create trigger portfolio_updated before update on public.portfolio_projects
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- testimonials
-- ---------------------------------------------------------------------------
create table public.testimonials (
  id          uuid primary key default gen_random_uuid(),
  quote       text not null,
  author      text not null,
  role        text not null default '',
  location    text not null default '',
  event       text not null default '',
  image_url   text,
  published   boolean not null default true,
  sort_order  int not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
create index testimonials_order_idx on public.testimonials (published, sort_order);
create trigger testimonials_updated before update on public.testimonials
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- team_members
-- ---------------------------------------------------------------------------
create table public.team_members (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  role        text not null default '',
  bio         text not null default '',
  image_url   text,
  published   boolean not null default true,
  sort_order  int not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
create index team_order_idx on public.team_members (published, sort_order);
create trigger team_updated before update on public.team_members
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- enquiries (contact form submissions)
-- ---------------------------------------------------------------------------
create type public.enquiry_status as enum ('new', 'contacted', 'closed');

create table public.enquiries (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  email       text not null,
  phone       text not null default '',
  event_type  text not null default '',
  event_date  text,
  location    text,
  message     text not null default '',
  status      public.enquiry_status not null default 'new',
  notes       text,                -- internal notes for the concierge team
  source      text not null default 'website',
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
create index enquiries_status_idx on public.enquiries (status, created_at desc);
create trigger enquiries_updated before update on public.enquiries
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Row-Level Security
--   • Public (anon) may READ published content only.
--   • Nobody public may touch enquiries — the site inserts them server-side
--     with the service role key, and the team reads them in the dashboard.
-- ---------------------------------------------------------------------------
alter table public.site_settings      enable row level security;
alter table public.services           enable row level security;
alter table public.portfolio_projects enable row level security;
alter table public.testimonials       enable row level security;
alter table public.team_members       enable row level security;
alter table public.enquiries          enable row level security;

create policy "public read site settings"
  on public.site_settings for select to anon, authenticated using (true);

create policy "public read published services"
  on public.services for select to anon, authenticated using (published);

create policy "public read published projects"
  on public.portfolio_projects for select to anon, authenticated using (published);

create policy "public read published testimonials"
  on public.testimonials for select to anon, authenticated using (published);

create policy "public read published team"
  on public.team_members for select to anon, authenticated using (published);

-- enquiries: no policies for anon/authenticated → fully locked to service role.

-- ---------------------------------------------------------------------------
-- Storage: public "media" bucket for site imagery
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'media', 'media', true, 15728640,
  array['image/jpeg','image/png','image/webp','image/avif','image/svg+xml','video/mp4']
)
on conflict (id) do nothing;

create policy "public read media"
  on storage.objects for select to anon, authenticated using (bucket_id = 'media');
-- uploads/deletes: service role (seed script) or dashboard only.

-- ---------------------------------------------------------------------------
-- Seed the single settings row so the site always has one to read
-- ---------------------------------------------------------------------------
insert into public.site_settings (id) values (1) on conflict (id) do nothing;
