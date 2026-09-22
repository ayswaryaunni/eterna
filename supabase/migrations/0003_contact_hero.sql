alter table public.site_settings
  add column if not exists contact_hero_image text not null default '';
