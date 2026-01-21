-- Create landing_pages table
CREATE TABLE IF NOT EXISTS public.landing_pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  cover TEXT,
  content JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.landing_pages ENABLE ROW LEVEL SECURITY;

-- Create policies (Allow authenticated users to manage, public to read)
CREATE POLICY "Allow public read access" ON public.landing_pages
  FOR SELECT USING (true);

CREATE POLICY "Allow authenticated full access" ON public.landing_pages
  FOR ALL TO authenticated USING (true);
