#!/usr/bin/env node
/**
 * Script para testar a página portfolio antes do deploy
 * Simula o ambiente de produção e verifica possíveis problemas
 */

import { createStaticClient } from '../src/lib/supabase/static';
import { loadEnvOverrides } from './lib/env-loader';

async function testPortfolioPage() {
  console.log('🧪 Testing Portfolio Page...\n');

  // 1. Check environment variables
  console.log('📋 Environment Variables:');
  const env = loadEnvOverrides();

  const hasUrl = Boolean(env.NEXT_PUBLIC_SUPABASE_URL);
  const hasKey = Boolean(env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

  console.log('  NEXT_PUBLIC_SUPABASE_URL:', hasUrl ? '✅ SET' : '❌ MISSING');
  console.log(
    '  NEXT_PUBLIC_SUPABASE_ANON_KEY:',
    hasKey ? '✅ SET' : '❌ MISSING'
  );
  console.log('  Value:', env.NEXT_PUBLIC_SUPABASE_URL || 'N/A');
  console.log();

  if (!hasUrl || !hasKey) {
    console.log('⚠️  Missing environment variables - will use fallback');
    return;
  }

  // Carregar variáveis no process.env para que createStaticClient() possa usá-las
  if (env.NEXT_PUBLIC_SUPABASE_URL) {
    process.env.NEXT_PUBLIC_SUPABASE_URL = env.NEXT_PUBLIC_SUPABASE_URL;
  }
  if (env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY =
      env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  }

  // 2. Test Supabase connection
  console.log('🔌 Testing Supabase Connection...');
  try {
    const supabase = createStaticClient();
    console.log('  ✅ Client created successfully');

    // 3. Test projects query
    console.log('\n📦 Fetching Projects...');
    const { data: projects, error } = await supabase
      .from('portfolio_projects')
      .select(
        '*, tags:portfolio_project_tags(tag:portfolio_tags(id, slug, label, kind))'
      )
      .eq('is_published', true)
      .order('featured_portfolio_order', {
        ascending: true,
        nullsFirst: false,
      });

    if (error) {
      console.error('  ❌ Error fetching projects:', error.message);
      throw error;
    }

    console.log(`  ✅ Successfully fetched ${projects?.length || 0} projects`);

    // 4. Verify project structure
    if (projects && projects.length > 0) {
      console.log('\n🔍 Validating Project Structure...');
      const firstProject = projects[0];
      const required = ['id', 'slug', 'title', 'thumbnail_path'];
      const missing = required.filter((field) => !firstProject[field]);

      if (missing.length > 0) {
        console.log(`  ⚠️  Missing fields in project: ${missing.join(', ')}`);
      } else {
        console.log('  ✅ All required fields present');
      }

      console.log('\n📋 Sample Project:');
      console.log(`  - ID: ${firstProject.id}`);
      console.log(`  - Title: ${firstProject.title}`);
      console.log(`  - Slug: ${firstProject.slug}`);
      console.log(`  - Client: ${firstProject.client_name || 'N/A'}`);
      console.log(`  - Year: ${firstProject.year || 'N/A'}`);
      console.log(
        `  - Featured: ${firstProject.featured_on_portfolio ? 'Yes' : 'No'}`
      );
    }

    console.log('\n✅ All tests passed!\n');
  } catch (error) {
    console.error(
      '\n❌ Test failed:',
      error instanceof Error ? error.message : error
    );
    if (error instanceof Error && error.stack) {
      console.error('Stack:', error.stack);
    }
    process.exit(1);
  }
}

testPortfolioPage();
