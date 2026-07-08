import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET(request: Request) {
  const url = new URL('/CURRICULUM-2026.html', request.url);
  return NextResponse.redirect(url);
}

