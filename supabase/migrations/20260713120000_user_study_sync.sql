-- Phase 2: user notes + explored sync with RLS
-- Apply in Supabase SQL editor OR: npx supabase db push (linked project)

create table if not exists public.user_notes (
  user_id uuid not null references auth.users (id) on delete cascade,
  note_key text not null,
  content text not null default '',
  updated_at timestamptz not null default now(),
  primary key (user_id, note_key)
);

create table if not exists public.user_explored (
  user_id uuid not null references auth.users (id) on delete cascade,
  chapter_id text not null,
  explored boolean not null default true,
  updated_at timestamptz not null default now(),
  primary key (user_id, chapter_id)
);

create index if not exists user_notes_updated_at_idx on public.user_notes (user_id, updated_at desc);
create index if not exists user_explored_updated_at_idx on public.user_explored (user_id, updated_at desc);

alter table public.user_notes enable row level security;
alter table public.user_explored enable row level security;

-- Drop policies if re-running
drop policy if exists "user_notes_select_own" on public.user_notes;
drop policy if exists "user_notes_insert_own" on public.user_notes;
drop policy if exists "user_notes_update_own" on public.user_notes;
drop policy if exists "user_notes_delete_own" on public.user_notes;

drop policy if exists "user_explored_select_own" on public.user_explored;
drop policy if exists "user_explored_insert_own" on public.user_explored;
drop policy if exists "user_explored_update_own" on public.user_explored;
drop policy if exists "user_explored_delete_own" on public.user_explored;

create policy "user_notes_select_own"
  on public.user_notes for select
  using (auth.uid() = user_id);

create policy "user_notes_insert_own"
  on public.user_notes for insert
  with check (auth.uid() = user_id);

create policy "user_notes_update_own"
  on public.user_notes for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "user_notes_delete_own"
  on public.user_notes for delete
  using (auth.uid() = user_id);

create policy "user_explored_select_own"
  on public.user_explored for select
  using (auth.uid() = user_id);

create policy "user_explored_insert_own"
  on public.user_explored for insert
  with check (auth.uid() = user_id);

create policy "user_explored_update_own"
  on public.user_explored for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "user_explored_delete_own"
  on public.user_explored for delete
  using (auth.uid() = user_id);

grant select, insert, update, delete on public.user_notes to authenticated;
grant select, insert, update, delete on public.user_explored to authenticated;

-- RLS verification helper (run as postgres / service role in SQL editor):
-- 1) Insert two users' rows as service role
-- 2) set local role authenticated; set request.jwt.claim.sub = '<user-a-uuid>';
-- 3) select * from user_notes;  -- must only return user A's rows
