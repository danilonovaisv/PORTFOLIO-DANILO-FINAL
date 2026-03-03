import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config({ path: '.env.local' });

async function checkSupabase() {
    console.log("🔍 Starting Supabase Health Check...");

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!url || !key) {
        console.error("❌ Missing Supabase credentials in .env.local");
        process.exit(1);
    }

    const supabase = createClient(url, key);

    // Check 1: Connectivity
    const { data, error } = await supabase.from('test_connection').select('*').limit(1).maybeSingle();

    if (error && error.code !== 'PGRST116') { // PGRST116 is just no rows, which implies connection worked
        // If table doesn't exist (404), that's also a connection success but schema fail.
        // We just want to check if we can reach the server.
        console.warn(`⚠️ Connection warning: ${error.message}`);
    } else {
        console.log("✅ Supabase Connection: OK");
    }

    // Check 2: Configuration file
    if (fs.existsSync('supabase/config.toml')) {
        console.log("✅ found supabase/config.toml");
    } else {
        console.warn("⚠️ supabase/config.toml not found. Local dev might be unconfigured.");
    }

    console.log("ℹ️ To verify Realtime, please run the full 'supabase-fixer' workflow which includes browser verification.");
}

checkSupabase();
