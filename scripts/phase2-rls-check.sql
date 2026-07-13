-- Phase 2 RLS proof (run in Supabase SQL editor as postgres / service role)
-- Replace the UUIDs with two real auth.users ids after creating test accounts.

-- SETUP (example — adjust UUIDs):
-- create extension if not exists "pgcrypto";
-- insert into auth.users (id, email) ...  -- normally created via Auth UI

-- As service role, seed two users' rows:
-- insert into public.user_notes (user_id, note_key, content)
-- values
--   ('00000000-0000-0000-0000-0000000000aa', 'steps-to-christ-sc-1', 'user A note'),
--   ('00000000-0000-0000-0000-0000000000bb', 'steps-to-christ-sc-1', 'user B note');

-- Impersonate user A (PostgREST-style claim):
-- select set_config('request.jwt.claim.sub', '00000000-0000-0000-0000-0000000000aa', true);
-- set local role authenticated;
-- select note_key, content from public.user_notes;
-- EXPECT: only user A's row(s). User B's content must not appear.

-- Reset:
-- reset role;
-- select set_config('request.jwt.claim.sub', '', true);

-- Alternative proof from the app: sign in as A, open Network tab for
-- GET /rest/v1/user_notes — response must not include other users' rows
-- (RLS filters server-side; client never receives foreign rows).
