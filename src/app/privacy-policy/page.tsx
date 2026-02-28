import { redirect } from 'next/navigation';

/**
 * Redirect /privacy-policy → /privacidade (canonical)
 * Resolves SEO duplicate content issue flagged in SquirrelScan report.
 * Uses permanent redirect (308) to preserve link equity.
 */
export default function PrivacyPolicyRedirect() {
  redirect('/privacidade');
}
