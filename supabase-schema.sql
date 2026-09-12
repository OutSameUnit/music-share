-- Supabase schema for Music Share

create extension if not exists "uuid-ossp";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.playlists (
  id uuid primary key default uuid_generate_v4(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  description text,
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
  file_url text not null,
  public_id text,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.playlists enable row level security;
alter table public.playlist_items enable row level security;
alter table public.favorite_playlists enable row level security;
alter table public.video_uploads enable row level security;

create policy "profiles are viewable by owner" on public.profiles
for select using (auth.uid() = id);

create policy "users can update their own profile" on public.profiles
for update using (auth.uid() = id);

create policy "users can insert their own profile" on public.profiles
for insert with check (auth.uid() = id);

create policy "owners can manage their playlists" on public.playlists
for all using (auth.uid() = owner_id) with check (auth.uid() = owner_id);

create policy "public playlists are viewable by everyone" on public.playlists
for select using (is_public = true or auth.uid() = owner_id);

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

create policy "users can view favorites for themselves" on public.favorite_playlists
for select using (auth.uid() = user_id);

create policy "users can manage their own uploads" on public.video_uploads
for all using (auth.uid() = owner_id) with check (auth.uid() = owner_id);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data ->> 'full_name', split_part(new.email, '@', 1)))
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
