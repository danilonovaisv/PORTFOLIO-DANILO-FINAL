import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { listProjects } from '../src/lib/supabase/queries/projects'; // Adjust import path as needed
import { mapDbProjectToPortfolioProject } from '../src/lib/portfolio/project-mappers';

dotenv.config();

// Create a direct client for the script
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!; // Use service role for admin access or Anon for public

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase env vars');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  console.log('--- Debugging Projects Data ---');
  try {
    console.log('Fetching projects with featuredOnHome: true...');
    const dbProjects = await listProjects(
      { featuredOnHome: true },
      supabase as any
    );

    console.log(`Found ${dbProjects.length} projects in DB.`);

    if (dbProjects.length > 0) {
      console.log(
        'First project sample:',
        JSON.stringify(dbProjects[0], null, 2)
      );
    } else {
      console.warn('WARNING: No featured projects found in database.');

      // Try fetching ALL projects to see if any exist
      console.log('Fetching ALL projects (no filter)...');
      const allProjects = await listProjects({}, supabase as any);
      console.log(`Found ${allProjects.length} total projects in DB.`);
      if (allProjects.length > 0) {
        console.log('Sample format logic check:', allProjects[0]);
      }
    }
  } catch (error) {
    console.error('Error executing query:', error);
  }
}

main();
