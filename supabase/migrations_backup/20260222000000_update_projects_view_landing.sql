-- Update public_projects_view to include landing_page_id and landing_page_slug
drop view if exists public.public_projects_view;
create view public.public_projects_view with (security_invoker = true) as
select 
  p.id,
  p.slug,
  p.title,
  p.client_name,
  p.brand_name,
  p.year,
  p.project_type,
  p.short_label,
  p.description,
  p.thumbnail_path,
  p.hero_image_path,
  p.url_landscape,
  p.url_square,
  p.gallery,
  p.featured_on_home,
  p.featured_on_portfolio,
  p.featured_home_order,
  p.featured_portfolio_order,
  p.is_published,
  p.created_at,
  p.updated_at,
  p.landing_page_id,
  l.slug as landing_page_slug
from public.portfolio_projects p
left join public.landing_pages l on l.id = p.landing_page_id
where p.is_published = true;

-- Ensure grants are maintained
grant select on public.public_projects_view to anon, authenticated;
