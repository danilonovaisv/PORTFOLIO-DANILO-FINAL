import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  const { data, error } = await supabase
    .from('portfolio_projects')
    .select('*, landing_pages(content)')
    .limit(1);
    
  if (error) {
    console.error("Error:", error);
  } else {
    console.log("Success, data length:", data?.length);
  }
}
main();
