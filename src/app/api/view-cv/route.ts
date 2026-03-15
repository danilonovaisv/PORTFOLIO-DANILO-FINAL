import { NextResponse } from 'next/server';

/**
 * Proxy route to serve the curriculum HTML with the correct Content-Type (text/html).
 * This bypasses Supabase Storage's default text/plain serving for this file.
 */
export async function GET() {
  const CV_URL =
    'https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/site-assets/global/CV/CURRICULUM-2026.html';

  try {
    const response = await fetch(CV_URL, {
      cache: 'no-store', // Ensure we get the latest version if needed
    });

    if (!response.ok) {
      return new NextResponse('Error fetching CV', { status: response.status });
    }

    const html = await response.text();

    return new Response(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Content-Security-Policy':
          "default-src 'self' 'unsafe-inline' 'unsafe-eval' https://*; img-src 'self' data: https://*;",
      },
    });
  } catch (error) {
    console.error('Error in view-cv proxy:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
