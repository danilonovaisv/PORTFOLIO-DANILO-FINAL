import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

async function testUpsert() {
  const { data, error } = await supabase
    .from('portfolio_projects')
    .upsert(
      {
        slug: 'test-project-repro',
        title: 'Test Project',
        client_name: 'Test Client',
        project_type: 'Brand & Campaigns',
        is_published: false,
        featured_on_home: false,
        featured_on_portfolio: false,
      },
      { onConflict: 'id' }
    )
    .select()
    .single();

  if (error) {
    console.error('Supabase Error:', error);
  } else {
    console.log('Success:', data);
    // Cleanup
    await supabase.from('portfolio_projects').delete().eq('id', data.id);
  }
}

testUpsert();
