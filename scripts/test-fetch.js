const url = 'https://umkmwbkwvulxtdodzmzf.supabase.co';
console.log(`Fetching ${url}...`);
fetch(url)
  .then((res) => {
    console.log(`Status: ${res.status}`);
  })
  .catch((err) => {
    console.error('Fetch failed:', err);
  });
