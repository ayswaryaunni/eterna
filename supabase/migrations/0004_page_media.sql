-- Page images/videos that were previously hardcoded in lib/media.ts.
-- Each holds Storage URLs and is editable from the dashboard; when a value is
-- empty the site falls back to the bundled default in lib/media.ts.
-- Run in: Supabase Dashboard → SQL Editor → New query → paste → Run
alter table public.site_settings
  add column if not exists home_atelier_images   text[] not null default '{}', -- [large 16:10 (subject on the left), floating 4:5]
  add column if not exists about_preview_images  text[] not null default '{}', -- [4:3 left, 3:4 right]
  add column if not exists portfolio_hero_images text[] not null default '{}', -- one per featured project, in order (3)
  add column if not exists contact_office_images text[] not null default '{}', -- one per office tile (3)
  add column if not exists showcase_poster       text   not null default '',
  add column if not exists services_video        text   not null default '',
  add column if not exists services_poster       text   not null default '';
