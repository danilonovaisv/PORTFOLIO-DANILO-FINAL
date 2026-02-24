Deno.serve(async (req)=>{
  try {
    if (req.method !== 'POST') {
      return new Response(JSON.stringify({
        error: 'Only POST allowed'
      }), {
        status: 405,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
    const contentType = req.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      return new Response(JSON.stringify({
        error: 'Content-Type must be application/json'
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
    const payload = await req.json();
    const passwords = Array.isArray(payload?.passwords) ? payload.passwords : typeof payload?.password === 'string' ? [
      payload.password
    ] : null;
    if (!passwords || passwords.length === 0) {
      return new Response(JSON.stringify({
        error: 'Missing passwords array or password string'
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
    // Helper: compute SHA1 hex uppercase
    const sha1Hex = async (input)=>{
      const enc = new TextEncoder();
      const data = enc.encode(input);
      const hashBuffer = await crypto.subtle.digest('SHA-1', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map((b)=>b.toString(16).padStart(2, '0')).join('').toUpperCase();
    };
    // Group by prefix to reduce HIBP calls
    const prefixMap = new Map(); // prefix -> array of {index, suffix}
    const results = new Array(passwords.length).fill(null);
    for(let i = 0; i < passwords.length; i++){
      const pw = passwords[i];
      if (typeof pw !== 'string' || pw.length === 0) {
        results[i] = {
          safe: false,
          error: 'invalid_password'
        };
        continue;
      }
      const hash = await sha1Hex(pw);
      const prefix = hash.slice(0, 5);
      const suffix = hash.slice(5);
      if (!prefixMap.has(prefix)) prefixMap.set(prefix, []);
      prefixMap.get(prefix).push({
        index: i,
        suffix
      });
    }
    // For each prefix, query HIBP once
    const fetchPrefix = async (prefix, entries)=>{
      const hibpUrl = `https://api.pwnedpasswords.com/range/${prefix}`;
      const hibpResp = await fetch(hibpUrl, {
        method: 'GET',
        headers: {
          'Add-Padding': 'true'
        }
      });
      if (!hibpResp.ok) {
        // mark all as unknown/error for this prefix
        for (const e of entries)results[e.index] = {
          safe: false,
          error: 'hibp_unavailable'
        };
        return;
      }
      const body = await hibpResp.text();
      const lines = body.split('\r\n').filter(Boolean);
      const map = new Map();
      for (const line of lines){
        const [lineSuffix, countStr] = line.split(':');
        if (lineSuffix) map.set(lineSuffix.toUpperCase(), parseInt((countStr || '0').replace(/\D/g, ''), 10) || 0);
      }
      for (const e of entries){
        const cnt = map.get(e.suffix) || 0;
        if (cnt > 0) results[e.index] = {
          safe: false,
          reason: 'password_compromised',
          count: cnt
        };
        else results[e.index] = {
          safe: true
        };
      }
    };
    // Run fetches in parallel but limited concurrency to 6
    const prefixes = Array.from(prefixMap.entries());
    const concurrency = 6;
    let idx = 0;
    const workers = new Array(Math.min(concurrency, prefixes.length)).fill(null).map(async ()=>{
      while(idx < prefixes.length){
        const cur = idx++;
        const [prefix, entries] = prefixes[cur];
        // eslint-disable-next-line no-await-in-loop
        await fetchPrefix(prefix, entries);
      }
    });
    await Promise.all(workers);
    return new Response(JSON.stringify({
      results
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({
      error: 'internal_error'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
});
