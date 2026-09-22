-- Hero / showcase media managed from the dashboard (Storage URLs)
alter table public.site_settings
  add column if not exists home_hero_image  text not null default '',
  add column if not exists home_hero_video  text not null default '',
  add column if not exists about_hero_image text not null default '',
  add column if not exists showcase_video   text not null default '';
