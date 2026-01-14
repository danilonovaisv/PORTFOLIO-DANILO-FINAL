import { proxy } from './src/proxy';

export async function middleware(request: Parameters<typeof proxy>[0]) {
  return proxy(request);
}

export const config = {
  matcher: ['/admin/:path*'],
};
