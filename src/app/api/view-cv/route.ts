import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'public', 'CURRICULUM-2026.html');
    const html = await fs.readFile(filePath, 'utf-8');

    return new Response(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Content-Security-Policy':
          "default-src 'self' 'unsafe-inline' 'unsafe-eval' https://*; img-src 'self' data: https://*;",
      },
    });
  } catch (error) {
    console.error('Error in view-cv route:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
