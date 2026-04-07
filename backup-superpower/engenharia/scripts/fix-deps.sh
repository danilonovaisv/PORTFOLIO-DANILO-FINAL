#!/bin/bash
set -e

# Fix missing dependencies manually
mkdir -p node_modules/three
echo "📥 Downloading three@0.182.0..."
curl -sL https://registry.npmjs.org/three/-/three-0.182.0.tgz | tar xz -C node_modules/three --strip-components 1 || true

mkdir -p node_modules/@supabase/auth-js
echo "📥 Downloading @supabase/auth-js@2.95.3..." 
curl -sL https://registry.npmjs.org/@supabase/auth-js/-/auth-js-2.95.3.tgz | tar xz -C node_modules/@supabase/auth-js --strip-components 1 || true

mkdir -p node_modules/@supabase/functions-js
echo "📥 Downloading @supabase/functions-js@2.95.3..."
curl -sL https://registry.npmjs.org/@supabase/functions-js/-/functions-js-2.95.3.tgz | tar xz -C node_modules/@supabase/functions-js --strip-components 1 || true

mkdir -p node_modules/@supabase/postgrest-js
echo "📥 Downloading @supabase/postgrest-js@2.95.3..."
curl -sL https://registry.npmjs.org/@supabase/postgrest-js/-/postgrest-js-2.95.3.tgz | tar xz -C node_modules/@supabase/postgrest-js --strip-components 1 || true

mkdir -p node_modules/@supabase/realtime-js
echo "📥 Downloading @supabase/realtime-js@2.95.3..."
curl -sL https://registry.npmjs.org/@supabase/realtime-js/-/realtime-js-2.95.3.tgz | tar xz -C node_modules/@supabase/realtime-js --strip-components 1 || true

mkdir -p node_modules/@supabase/storage-js
echo "📥 Downloading @supabase/storage-js@2.95.3..."
curl -sL https://registry.npmjs.org/@supabase/storage-js/-/storage-js-2.95.3.tgz | tar xz -C node_modules/@supabase/storage-js --strip-components 1 || true

mkdir -p node_modules/@ungap/structured-clone
echo "📥 Downloading @ungap/structured-clone@1.3.0..."
curl -sL https://registry.npmjs.org/@ungap/structured-clone/-/structured-clone-1.3.0.tgz | tar xz -C node_modules/@ungap/structured-clone --strip-components 1 || true

echo "✅ Dependencies patched."
