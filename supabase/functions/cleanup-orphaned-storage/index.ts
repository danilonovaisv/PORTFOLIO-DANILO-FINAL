import { createClient } from "npm:@supabase/supabase-js@2.32.0";
console.info("orphaned-storage-cleanup function starting");
Deno.serve(async (req)=>{
  try {
    const url = new URL(req.url);
    const dryRunParam = url.searchParams.get("dry_run");
    const dryRun = dryRunParam === null ? true : dryRunParam === "true";
    // Supabase env vars are injected automatically in Edge Functions
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      return new Response(JSON.stringify({
        error: "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY"
      }), {
        status: 500,
        headers: {
          "Content-Type": "application/json"
        }
      });
    }
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
      auth: {
        persistSession: false
      }
    });
    // Call the RPC to get orphaned objects
    const { data, error: rpcError } = await supabase.rpc("get_orphaned_storage_objects");
    if (rpcError) {
      console.error("RPC error:", rpcError);
      return new Response(JSON.stringify({
        error: "RPC failed",
        detail: rpcError
      }), {
        status: 500,
        headers: {
          "Content-Type": "application/json"
        }
      });
    }
    const rows = data || [];
    if (rows.length === 0) {
      return new Response(JSON.stringify({
        message: "No orphaned objects found",
        count: 0
      }), {
        status: 200,
        headers: {
          "Content-Type": "application/json"
        }
      });
    }
    const results = [];
    // Process sequentially; change to concurrent batches if needed
    for (const row of rows){
      const record = {
        id: row.id,
        bucket_id: row.bucket_id,
        name: row.name
      };
      if (dryRun) {
        results.push({
          ...record,
          removed: false
        });
        continue;
      }
      try {
        // supabase.storage.from(bucket).remove expects array of object paths
        const { data: removeData, error: removeError } = await supabase.storage.from(row.bucket_id).remove([
          row.name
        ]);
        if (removeError) {
          console.error("Remove error for", row.bucket_id, row.name, removeError);
          results.push({
            ...record,
            removed: false,
            error: String(removeError.message || removeError)
          });
        } else {
          results.push({
            ...record,
            removed: true
          });
        }
      } catch (err) {
        console.error("Unexpected error removing", row.bucket_id, row.name, err);
        results.push({
          ...record,
          removed: false,
          error: String(err)
        });
      }
    }
    const removedCount = results.filter((r)=>r.removed).length;
    const failed = results.filter((r)=>r.removed === false);
    return new Response(JSON.stringify({
      dry_run: dryRun,
      total_candidates: rows.length,
      removed_count: removedCount,
      failures: failed.slice(0, 50)
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (err) {
    console.error("Unhandled error:", err);
    return new Response(JSON.stringify({
      error: "Unhandled error",
      detail: String(err)
    }), {
      status: 500,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
});
