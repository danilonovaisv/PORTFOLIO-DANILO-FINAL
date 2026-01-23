'use client';

import { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { createClientComponentClient } from '@/lib/supabase/client';
import LandingPageForm from '@/components/admin/LandingPageForm';

function StatCard({
  title,
  value,
  href,
}: {
  title: string;
  value: number | null; // Make value nullable
  href?: string;
}) {
  const CardContent = () => (
    <>
      <p className="text-sm text-slate-400">{title}</p>
      <p className="text-3xl font-semibold mt-2">{value ?? 0}</p>
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="rounded-xl border border-white/10 bg-slate-900/60 p-4 hover:bg-slate-800/60 transition-colors"
      >
        <CardContent />
      </Link>
    );
  }

  return (
    <div className="rounded-xl border border-white/10 bg-slate-900/60 p-4">
      <CardContent />
    </div>
  );
}

interface Props {
  params: Promise<{ id: string }>;
}

export default function EditLandingPage({ params }: Props) {
  const { id } = use(params);
  const supabase = createClientComponentClient();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const { data } = await supabase
        .from('landing_pages')
        .select('*')
        .eq('id', id)
        .single();

      if (data) setData(data);
      setLoading(false);
    }
    fetchData();
  }, [id, supabase]);

  if (loading)
    return <div className="p-10 text-center">Carregando dados...</div>;
  if (!data)
    return <div className="p-10 text-center">Página não encontrada.</div>;

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm uppercase tracking-[0.25em] text-slate-400">
          Projetos
        </p>
        <h1 className="text-3xl font-semibold">Editar Landing Page</h1>
      </div>

      <LandingPageForm initialData={data} />
    </div>
  );
}
