export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const fetchCache = 'force-no-store';

import { redirect } from 'next/navigation';

export default function ConfigPage() {
  redirect('/admin/settings');
}
