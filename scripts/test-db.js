import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase URL or Key');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  console.log('Testing connection to:', supabaseUrl);
  try {
    const { data, error } = await supabase
      .from('portfolio_projects')
      .select('id, title')
      .limit(5);

    if (error) {
      console.error('Error:', error);
    } else {
      console.log('Success! Found', data?.length || 0, 'projects:');
      data?.forEach((p) => console.log(`- ${p.title} (${p.id})`));
    }
  } catch (err) {
    console.error('Caught error:', err);
  }
}

main();
