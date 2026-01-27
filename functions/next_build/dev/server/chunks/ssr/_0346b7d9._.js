module.exports = [
"[project]/src/lib/supabase/server.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createClient",
    ()=>createClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$supabase$2b$ssr$40$0$2e$8$2e$0_$40$supabase$2b$supabase$2d$js$40$2$2e$93$2e$1$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@supabase+ssr@0.8.0_@supabase+supabase-js@2.93.1/node_modules/@supabase/ssr/dist/module/index.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$supabase$2b$ssr$40$0$2e$8$2e$0_$40$supabase$2b$supabase$2d$js$40$2$2e$93$2e$1$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createServerClient$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@supabase+ssr@0.8.0_@supabase+supabase-js@2.93.1/node_modules/@supabase/ssr/dist/module/createServerClient.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.5_@babel+core@7.28.6_@opentelemetry+api@1.9.0_@playwright+test@1.58.0_react-d_da4cc879827f7917e183558a349a788d/node_modules/next/headers.js [app-rsc] (ecmascript)");
;
;
async function createClient() {
    let cookieStore;
    try {
        cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])();
    } catch  {
    // During build/static generation, cookies() might not be available
    }
    const supabaseUrl = ("TURBOPACK compile-time value", "https://umkmwbkwvulxtdodzmzf.supabase.co");
    const supabaseKey = ("TURBOPACK compile-time value", "sb_publishable_lW8dC02qgDYiYxBfHGr54A_X1-D-NQ4") ?? ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVta213Ymt3dnVseHRkb2R6bXpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgzNDE4MzcsImV4cCI6MjA4MzkxNzgzN30.wssvD9W-yzRyLpq8aMCw57E4wNz7OnQ58ujLzYmF6CA");
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$supabase$2b$ssr$40$0$2e$8$2e$0_$40$supabase$2b$supabase$2d$js$40$2$2e$93$2e$1$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createServerClient$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createServerClient"])(supabaseUrl, supabaseKey, {
        cookieOptions: {
            // Firebase Hosting (Functions/Frameworks) só encaminha "__session"
            name: '__session',
            sameSite: 'lax',
            secure: true
        },
        cookies: {
            getAll () {
                return cookieStore?.getAll() ?? [];
            },
            setAll (cookiesToSet) {
                try {
                    cookiesToSet.forEach(({ name, value, options })=>cookieStore?.set(name, value, options));
                } catch  {
                // The `setAll` method was called from a Server Component.
                }
            }
        }
    });
}
}),
"[project]/src/lib/supabase/queries/projects.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "$$RSC_SERVER_ACTION_0",
    ()=>$$RSC_SERVER_ACTION_0,
    "deleteProject",
    ()=>deleteProject,
    "getProject",
    ()=>getProject,
    "listProjects",
    ()=>listProjects,
    "togglePublish",
    ()=>togglePublish,
    "upsertProject",
    ()=>upsertProject
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.5_@babel+core@7.28.6_@opentelemetry+api@1.9.0_@playwright+test@1.58.0_react-d_da4cc879827f7917e183558a349a788d/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"403a3b86d80bd55a31d2203cb30c985889cc03ad07":"$$RSC_SERVER_ACTION_0"},"",""] */ var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase/server.ts [app-rsc] (ecmascript)");
;
;
async function listProjects(filters = {}, supabaseClient) {
    const supabase = supabaseClient ?? await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    let query = supabase.from('portfolio_projects').select('*, tags:portfolio_project_tags(tag:portfolio_tags(id, slug, label, kind)), landing_page:landing_pages(slug)').order('featured_portfolio_order', {
        ascending: true,
        nullsFirst: false
    });
    if (!filters.includeUnpublished) {
        query = query.eq('is_published', true);
    }
    if (filters.tagSlug) {
        query = query.eq('tags.tag.slug', filters.tagSlug);
    }
    if (filters.year) {
        query = query.eq('year', filters.year);
    }
    if (filters.search) {
        query = query.or(`title.ilike.%${filters.search}%,client_name.ilike.%${filters.search}%`);
    }
    if (filters.featuredOnHome) {
        query = query.eq('featured_on_home', true);
    }
    if (filters.featuredOnPortfolio) {
        query = query.eq('featured_on_portfolio', true);
    }
    const { data, error } = await query.returns();
    if (error) throw error;
    return data;
}
async function getProject(id) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data, error } = await supabase.from('portfolio_projects').select('*, tags:portfolio_project_tags(tag:portfolio_tags(id, slug, label, kind))').eq('id', id).single();
    if (error) throw error;
    return data;
}
async function upsertProject(payload) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { tagIds, ...projectData } = payload;
    const { data, error } = await supabase.from('portfolio_projects').upsert(projectData, {
        onConflict: 'id'
    }).select().single();
    if (error) throw error;
    if (tagIds && data?.id) {
        await supabase.from('portfolio_project_tags').delete().eq('project_id', data.id);
        if (tagIds.length > 0) {
            const relations = tagIds.map((tagId)=>({
                    project_id: data.id,
                    tag_id: tagId
                }));
            const { error: relError } = await supabase.from('portfolio_project_tags').insert(relations);
            if (relError) throw relError;
        }
    }
    return data;
}
const $$RSC_SERVER_ACTION_0 = async function togglePublish(formData) {
    const projectId = formData.get('id');
    const nextStatus = formData.get('nextStatus') === 'true';
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { error } = await supabase.from('portfolio_projects').update({
        is_published: nextStatus
    }).eq('id', projectId);
    if (error) throw error;
};
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_$40$babel$2b$core$40$7$2e$28$2e$6_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_$40$playwright$2b$test$40$1$2e$58$2e$0_react$2d$d_da4cc879827f7917e183558a349a788d$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])($$RSC_SERVER_ACTION_0, "403a3b86d80bd55a31d2203cb30c985889cc03ad07", null);
var togglePublish = $$RSC_SERVER_ACTION_0;
async function deleteProject(projectId) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { error } = await supabase.from('portfolio_projects').delete().eq('id', projectId);
    if (error) throw error;
}
}),
"[project]/.next-internal/server/app/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/lib/supabase/queries/projects.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$queries$2f$projects$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase/queries/projects.ts [app-rsc] (ecmascript)");
;
}),
"[project]/.next-internal/server/app/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/lib/supabase/queries/projects.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "403a3b86d80bd55a31d2203cb30c985889cc03ad07",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$queries$2f$projects$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["$$RSC_SERVER_ACTION_0"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$lib$2f$supabase$2f$queries$2f$projects$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/page/actions.js { ACTIONS_MODULE0 => "[project]/src/lib/supabase/queries/projects.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$queries$2f$projects$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase/queries/projects.ts [app-rsc] (ecmascript)");
}),
];

//# sourceMappingURL=_0346b7d9._.js.map