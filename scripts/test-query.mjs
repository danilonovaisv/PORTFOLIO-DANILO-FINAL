import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const queryUrl = `${supabaseUrl}/rest/v1/portfolio_projects?select=id,title,client_name,year,featured_on_home,featured_on_portfolio,is_published,thumbnail_path,hero_image_path,project_type,slug,updated_at,url_landscape,url_square,landing_page_id,landing_pages(content)&limit=1`;

fetch(queryUrl, {
  headers: {
    'apikey': supabaseKey,
    'Authorization': `Bearer ${supabaseKey}`
  }
}).then(res => res.json()).then(data => {
  console.log(JSON.stringify(data, null, 2));
}).catch(err => console.error(err));
