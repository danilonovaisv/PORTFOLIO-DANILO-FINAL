import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { mapDbProjectToPortfolioProject } from '../src/lib/portfolio/project-mappers';

// Load env.local first (contains service role key locally), fallback to .env
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
dotenv.config();

// Create a direct client for the script
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!; // Use service role if available, fallback to anon

if (!supabaseUrl || !supabaseKey) {
  console.error(
    'Missing Supabase env vars. Ensure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set.'
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const selectQuery =
  '*, tags:portfolio_project_tags(tag:portfolio_tags(id, slug, label, kind))';

async function main() {
  console.log('--- Debugging Projects Data ---');
  try {
    console.log(
      'Fetching projects with featuredOnHome: true from public_projects_view...'
    );
    const { data: dbProjects, error: homeError } = await supabase
      .from('public_projects_view')
      .select(selectQuery)
      .eq('featured_on_home', true)
      .order('featured_home_order', { ascending: true, nullsFirst: false });

    if (homeError) {
      console.error('Error fetching featured projects:', homeError.message);
      // Fallback: let\'s check if we can query the raw table directly
      console.log(
        'Attempting to query raw portfolio_projects table directly...'
      );
      const { data: rawProjects, error: rawError } = await supabase
        .from('portfolio_projects')
        .select('*')
        .limit(5);
      if (rawError) {
        console.error(
          'Error querying raw portfolio_projects table:',
          rawError.message
        );
      } else {
        console.log(
          `Successfully read raw table portfolio_projects! Found ${rawProjects?.length || 0} sample rows.`
        );
      }
      throw homeError;
    }

    const projectsList = dbProjects || [];
    console.log(
      `Found ${projectsList.length} projects in public_projects_view.`
    );

    if (projectsList.length > 0) {
      console.log(
        'First project sample from database:',
        JSON.stringify(projectsList[0], null, 2)
      );

      console.log('Validating mappers logic with first project...');
      try {
        const mapped = mapDbProjectToPortfolioProject(
          projectsList[0] as any,
          0
        );
        console.log('Mapped output successfully:');
        console.log({
          id: mapped.id,
          slug: mapped.slug,
          title: mapped.title,
          image: mapped.image,
          videoPreview: mapped.videoPreview,
          destination: mapped.destination,
        });
      } catch (mapErr: any) {
        console.error('Error mapping project:', mapErr.message);
      }
    } else {
      console.warn('WARNING: No featured projects found in database view.');

      // Try fetching ALL projects from view to see if any exist
      console.log(
        'Fetching ALL projects from public_projects_view (no filter)...'
      );
      const { data: allProjects, error: allError } = await supabase
        .from('public_projects_view')
        .select(selectQuery);

      if (allError) {
        console.error('Error fetching all projects:', allError.message);
      } else {
        const list = allProjects || [];
        console.log(
          `Found ${list.length} total projects in public_projects_view.`
        );
        if (list.length > 0) {
          console.log('Sample project from view:', list[0]);
        }
      }
    }
  } catch (error: any) {
    console.error('Error executing query:', error.message || error);
  }
}

main();
