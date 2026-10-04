-- Dedicated BPT tables; no changes to BPMS tenant data or authorization.
create table public.bpt_staff(user_id uuid primary key references auth.users(id) on delete cascade, role text not null check(role in ('editor','moderator','admin')));
alter table public.bpt_staff enable row level security;
grant select on public.bpt_staff to authenticated;
create policy staff_self on public.bpt_staff for select to authenticated using(user_id=(select auth.uid()));
create table public.bpt_posts (
 id uuid primary key default gen_random_uuid(), kind text not null check(kind in ('blog','news')),
 slug text not null unique check(slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$' and length(slug)<=160),
 title text not null check(length(title) between 3 and 180), excerpt text not null default '' check(length(excerpt)<=500),
 content text not null default '' check(length(content)<=100000), category text not null default 'Building Performance', tags text[] not null default '{}',
 author text not null default 'BPT Editorial Team', author_bio text not null default '', image_url text, image_alt text not null default '',
 seo_title text not null default '' check(length(seo_title)<=180), seo_description text not null default '' check(length(seo_description)<=320),
 status text not null default 'draft' check(status in ('draft','published','archived')), published_at timestamptz not null default now(),
 created_at timestamptz not null default now(), updated_at timestamptz not null default now(),
 check(image_url is null or image_url ~ '^https://'), check(cardinality(tags)<=20)
);
create index bpt_posts_listing on public.bpt_posts(kind,status,published_at desc);
alter table public.bpt_posts enable row level security;
grant select on public.bpt_posts to anon,authenticated;
grant insert,update,delete on public.bpt_posts to authenticated;
create policy posts_public on public.bpt_posts for select to anon,authenticated using(status='published' and published_at<=now());
create policy posts_staff on public.bpt_posts for all to authenticated using(exists(select 1 from public.bpt_staff where role in ('editor','admin'))) with check(exists(select 1 from public.bpt_staff where role in ('editor','admin')));
create table public.bpt_threads (
 id uuid primary key default gen_random_uuid(), user_id uuid not null default auth.uid() references auth.users(id),
 title text not null check(length(title) between 3 and 180), content text not null check(length(content) between 10 and 15000),
 author text not null check(length(author) between 2 and 80), category text not null check(category in ('Energy audits','BPMS support','BPMSField','FluxSense','HVAC and heat pumps','Weatherization')),
 status text not null default 'pending' check(status in ('pending','published','hidden')), pinned boolean not null default false, locked boolean not null default false,
 created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table public.bpt_replies (
 id uuid primary key default gen_random_uuid(), thread_id uuid not null references public.bpt_threads(id) on delete cascade,
 user_id uuid not null default auth.uid() references auth.users(id), author text not null check(length(author) between 2 and 80),
 content text not null check(length(content) between 2 and 10000), status text not null default 'pending' check(status in ('pending','published','hidden')),
 created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create index bpt_threads_list on public.bpt_threads(status,pinned desc,created_at desc);
create index bpt_threads_owner on public.bpt_threads(user_id,created_at);
create index bpt_replies_parent on public.bpt_replies(thread_id,status,created_at);
create index bpt_replies_owner on public.bpt_replies(user_id,created_at);
alter table public.bpt_threads enable row level security;
alter table public.bpt_replies enable row level security;
grant select on public.bpt_threads,public.bpt_replies to anon,authenticated;
-- Clients cannot forge creation dates or ownership. Moderation fields are checked by triggers.
grant insert(title,content,author,category) on public.bpt_threads to authenticated;
grant update(title,content,category,status,pinned,locked) on public.bpt_threads to authenticated;
grant insert(thread_id,author,content) on public.bpt_replies to authenticated;
grant update(content,status) on public.bpt_replies to authenticated;
grant delete on public.bpt_threads,public.bpt_replies to authenticated;
create policy threads_read on public.bpt_threads for select to anon,authenticated using(status='published' or user_id=(select auth.uid()) or exists(select 1 from public.bpt_staff where role in ('moderator','admin')));
create policy threads_insert on public.bpt_threads for insert to authenticated with check(user_id=(select auth.uid()) and status='pending' and not pinned and not locked and coalesce((auth.jwt()->>'is_anonymous')::boolean,false)=false);
create policy threads_update on public.bpt_threads for update to authenticated using(user_id=(select auth.uid()) or exists(select 1 from public.bpt_staff where role in ('moderator','admin'))) with check(user_id=(select auth.uid()) or exists(select 1 from public.bpt_staff where role in ('moderator','admin')));
create policy threads_delete on public.bpt_threads for delete to authenticated using(user_id=(select auth.uid()) or exists(select 1 from public.bpt_staff where role in ('moderator','admin')));
create policy replies_read on public.bpt_replies for select to anon,authenticated using((status='published' and exists(select 1 from public.bpt_threads t where t.id=thread_id and t.status='published')) or user_id=(select auth.uid()) or exists(select 1 from public.bpt_staff where role in ('moderator','admin')));
create policy replies_insert on public.bpt_replies for insert to authenticated with check(user_id=(select auth.uid()) and status='pending' and coalesce((auth.jwt()->>'is_anonymous')::boolean,false)=false and exists(select 1 from public.bpt_threads t where t.id=thread_id and t.status='published' and not t.locked));
create policy replies_update on public.bpt_replies for update to authenticated using(user_id=(select auth.uid()) or exists(select 1 from public.bpt_staff where role in ('moderator','admin'))) with check(user_id=(select auth.uid()) or exists(select 1 from public.bpt_staff where role in ('moderator','admin')));
create policy replies_delete on public.bpt_replies for delete to authenticated using(user_id=(select auth.uid()) or exists(select 1 from public.bpt_staff where role in ('moderator','admin')));
create function public.bpt_guard_content() returns trigger language plpgsql set search_path='' as $$
begin
 if TG_OP='UPDATE' then
  new.updated_at=now();
  if TG_TABLE_NAME in ('bpt_threads','bpt_replies') and not exists(select 1 from public.bpt_staff where role in ('moderator','admin')) then
   if old.status='hidden' then raise exception 'Hidden content must be reviewed by a moderator'; end if;
   if TG_TABLE_NAME='bpt_threads' then
    if old.locked or new.pinned<>old.pinned or new.locked<>old.locked then raise exception 'Moderator access required'; end if;
   else
    if not exists(select 1 from public.bpt_threads where id=new.thread_id and status='published' and not locked) then raise exception 'Discussion is unavailable or locked'; end if;
   end if;
   new.status='pending';
  end if;
 else
  -- Serialize submissions per member to enforce limits across server instances.
  perform pg_advisory_xact_lock(hashtextextended(auth.uid()::text,0));
  if (select count(*) from public.bpt_threads where user_id=auth.uid() and created_at>now()-interval '1 hour') +
     (select count(*) from public.bpt_replies where user_id=auth.uid() and created_at>now()-interval '1 hour') >= 20 then
   raise exception 'Posting limit reached. Please try again later.';
  end if;
 end if;
 return new;
end $$;
revoke all on function public.bpt_guard_content() from public,anon,authenticated;
create trigger bpt_posts_updated before update on public.bpt_posts for each row execute function public.bpt_guard_content();
create trigger bpt_threads_guard before insert or update on public.bpt_threads for each row execute function public.bpt_guard_content();
create trigger bpt_replies_guard before insert or update on public.bpt_replies for each row execute function public.bpt_guard_content();
create table public.bpt_bookmarks(user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,thread_id uuid not null references public.bpt_threads(id) on delete cascade,primary key(user_id,thread_id));
alter table public.bpt_bookmarks enable row level security;
grant select,delete on public.bpt_bookmarks to authenticated;
grant insert(thread_id) on public.bpt_bookmarks to authenticated;
create policy bookmarks_owner on public.bpt_bookmarks for all to authenticated using(user_id=(select auth.uid())) with check(user_id=(select auth.uid()) and exists(select 1 from public.bpt_threads where id=thread_id and status='published'));
create table public.bpt_reports(id uuid primary key default gen_random_uuid(),user_id uuid not null default auth.uid() references auth.users(id),thread_id uuid not null references public.bpt_threads(id) on delete cascade,reason text not null check(length(reason) between 5 and 1000),resolved boolean not null default false,created_at timestamptz not null default now(),unique(user_id,thread_id));
alter table public.bpt_reports enable row level security;
grant select on public.bpt_reports to authenticated;
grant insert(thread_id,reason) on public.bpt_reports to authenticated;
grant update(resolved) on public.bpt_reports to authenticated;
create policy reports_read on public.bpt_reports for select to authenticated using(user_id=(select auth.uid()) or exists(select 1 from public.bpt_staff where role in ('moderator','admin')));
create policy reports_insert on public.bpt_reports for insert to authenticated with check(user_id=(select auth.uid()) and exists(select 1 from public.bpt_threads where id=thread_id and status='published'));
create policy reports_moderate on public.bpt_reports for update to authenticated using(exists(select 1 from public.bpt_staff where role in ('moderator','admin'))) with check(exists(select 1 from public.bpt_staff where role in ('moderator','admin')));
create index bpt_reports_thread on public.bpt_reports(thread_id);
create index bpt_bookmarks_thread on public.bpt_bookmarks(thread_id);
insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types) values('bpt-editorial','bpt-editorial',true,5242880,array['image/jpeg','image/png','image/webp']) on conflict(id) do nothing;
create policy bpt_media_read on storage.objects for select to authenticated using(bucket_id='bpt-editorial' and exists(select 1 from public.bpt_staff where role in ('editor','admin')));
create policy bpt_media_insert on storage.objects for insert to authenticated with check(bucket_id='bpt-editorial' and exists(select 1 from public.bpt_staff where role in ('editor','admin')));
