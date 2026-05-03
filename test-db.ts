import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  const { data, error } = await supabase
    .from('portfolio_projects')
    .select(
      'id, title, client_name, year, featured_on_home, featured_on_portfolio, is_published, thumbnail_path, hero_image_path, project_type, slug, updated_at, url_landscape, url_square, landing_page_id, landing_pages(content)'
    )
    .order('updated_at', { ascending: false })
    .limit(1);

  console.log('Error:', JSON.stringify(error, null, 2));
  console.log('Data:', JSON.stringify(data, null, 2));
}

run();
