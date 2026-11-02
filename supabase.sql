-- Ejecuta este script en Supabase: SQL Editor > New query > Run

create table if not exists public.projects (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  url         text not null,
  image_url   text,
  published   boolean not null default false,
  created_at  timestamptz not null default now()
);

alter table public.projects enable row level security;

-- El público solo puede LEER los proyectos marcados como publicados.
create policy "Lectura publica de proyectos publicados"
  on public.projects for select
  to anon
  using (published = true);
