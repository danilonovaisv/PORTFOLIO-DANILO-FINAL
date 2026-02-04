-- Add landing_page_id to portfolio_projects to link a project to its custom landing page
ALTER TABLE public.portfolio_projects 
ADD COLUMN landing_page_id uuid REFERENCES public.landing_pages(id) ON DELETE SET NULL;

COMMENT ON COLUMN public.portfolio_projects.landing_page_id IS 'ID of the associated dynamic landing page (linked work).';
