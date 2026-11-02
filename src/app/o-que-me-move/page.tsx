import { redirect } from 'next/navigation';

export const dynamic = 'force-static';

export default function OQueMeMovePage() {
  redirect('/sobre#o-que-me-move');
}
