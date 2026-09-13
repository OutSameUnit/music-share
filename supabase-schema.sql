-- Supabase schema for Music Share

create extension if not exists "uuid-ossp";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  nickname text,
  details text,
  icon text,
  avatar_url text,
  last_played_track jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.playlists (
  id uuid primary key default uuid_generate_v4(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  description text,
  icon text,
  is_public boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.playlist_items (
  id uuid primary key default uuid_generate_v4(),
  playlist_id uuid not null references public.playlists(id) on delete cascade,
  title text not null,
  artist text,
  genre text,
  src text not null,
  order_index integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.favorite_playlists (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  playlist_id uuid not null references public.playlists(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique(user_id, playlist_id)
);

create table if not exists public.video_uploads (
  id uuid primary key default uuid_generate_v4(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  description text,
  file_url text not null,
  public_id text,
  thumbnail_url text,
  playlist_id uuid references public.playlists(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.track_play_events (
  id uuid primary key default uuid_generate_v4(),
  track_id uuid not null references public.video_uploads(id) on delete cascade,
  user_id uuid references auth.users(id) on delete set null,
  played_at timestamptz not null default now()
);

create table if not exists public.track_favorites (
  id uuid primary key default uuid_generate_v4(),
  track_id uuid not null references public.video_uploads(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique(track_id, user_id)
);

alter table public.playlists add column if not exists icon text;

alter table public.video_uploads add column if not exists description text;
alter table public.video_uploads add column if not exists thumbnail_url text;
alter table public.video_uploads add column if not exists playlist_id uuid references public.playlists(id) on delete set null;
alter table public.video_uploads add column if not exists is_public boolean not null default true;

alter table public.video_uploads add column if not exists play_count integer not null default 0;
alter table public.video_uploads add column if not exists favorite_count integer not null default 0;
alter table public.video_uploads add column if not exists duration numeric not null default 0;

alter table public.profiles enable row level security;
alter table public.playlists enable row level security;
alter table public.playlist_items enable row level security;
alter table public.favorite_playlists enable row level security;
alter table public.video_uploads enable row level security;
alter table public.track_play_events enable row level security;
alter table public.track_favorites enable row level security;

create policy "profiles are viewable by owner" on public.profiles
for select using (auth.uid() = id);

drop policy if exists "profiles are viewable by everyone" on public.profiles;
create policy "profiles are viewable by everyone" on public.profiles
for select using (true);

grant select on table public.profiles to anon, authenticated;

create policy "users can update their own profile" on public.profiles
for update using (auth.uid() = id);

create policy "users can insert their own profile" on public.profiles
for insert with check (auth.uid() = id);

create policy "owners can manage their playlists" on public.playlists
for all using (auth.uid() = owner_id) with check (auth.uid() = owner_id);

create policy "public playlists are viewable by everyone" on public.playlists
for select using (is_public = true or auth.uid() = owner_id);

grant select on table public.playlists to anon, authenticated;

create policy "owners can manage their playlist items" on public.playlist_items
for all using (
  exists (
    select 1 from public.playlists p
    where p.id = playlist_items.playlist_id and p.owner_id = auth.uid()
  )
)
with check (
  exists (
    select 1 from public.playlists p
    where p.id = playlist_items.playlist_id and p.owner_id = auth.uid()
  )
);

create policy "public playlist items are viewable by everyone" on public.playlist_items
for select using (
  exists (
    select 1 from public.playlists p
    where p.id = playlist_items.playlist_id and (p.is_public = true or p.owner_id = auth.uid())
  )
);

create policy "users can manage their own favorites" on public.favorite_playlists
for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "favorites are viewable by everyone" on public.favorite_playlists
for select using (true);

grant select, insert, delete on table public.favorite_playlists to anon, authenticated;

create policy "video uploads are viewable by everyone" on public.video_uploads
for select using (true);

grant select on table public.video_uploads to anon, authenticated;

drop policy if exists "users can manage their own uploads" on public.video_uploads;
create policy "users can manage their own uploads" on public.video_uploads
for all using (auth.uid() = owner_id) with check (auth.uid() = owner_id);

create policy "users can view track play events" on public.track_play_events
for select to authenticated using (true);

create or replace function public.record_track_play(track_uuid uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.track_play_events (track_id, user_id)
  values (track_uuid, auth.uid());

  update public.video_uploads
  set play_count = coalesce(play_count, 0) + 1
  where id = track_uuid;
end;
$$;

revoke all on function public.record_track_play(uuid) from public;
grant execute on function public.record_track_play(uuid) to authenticated;

drop policy if exists "users can manage their track favorites" on public.track_favorites;
create policy "users can manage their track favorites" on public.track_favorites
for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

grant select, insert, update, delete on table public.track_favorites to authenticated;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, nickname, details, icon)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data ->> 'nickname', split_part(new.email, '@', 1)),
    '',
    '🎧'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

create or replace function public.update_updated_at_column()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger playlists_updated_at
before update on public.playlists
for each row execute procedure public.update_updated_at_column();

create trigger profiles_updated_at
before update on public.profiles
for each row execute procedure public.update_updated_at_column();
