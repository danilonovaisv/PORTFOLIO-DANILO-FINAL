'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClientComponentClient } from '@/lib/supabase/client';
import { Plus, Edit, Trash2, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface LandingPage {
  id: string;
  title: string;
  slug: string;
  created_at: string;
}

export default function LandingPagesListPage() {
  const supabase = createClientComponentClient();
  const [pages, setPages] = useState<LandingPage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPages();
  }, []);

  async function fetchPages() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('landing_pages')
        .select('id, title, slug, created_at')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPages(data || []);
    } catch (err) {
      console.error('Error fetching landing pages:', err);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Tem certeza que deseja excluir esta página?')) return;

    try {
      const { error } = await supabase
        .from('landing_pages')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setPages(pages.filter((p) => p.id !== id));
    } catch (err) {
      console.error('Error deleting landing page:', err);
      alert('Erro ao excluir página.');
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-slate-400">
            Gerenciamento
          </p>
          <h1 className="text-3xl font-semibold">Landing Pages de Projetos</h1>
        </div>
        <Link
          href="/admin/landing-pages/new"
          className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-blue-700 transition-all"
        >
          <Plus size={18} />
          Nova Página
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border border-white/10 bg-slate-900/40 backdrop-blur-sm">
        {loading ? (
          <div className="p-12 text-center text-slate-400">Carregando...</div>
        ) : pages.length > 0 ? (
          <table className="min-w-full text-sm text-left">
            <thead>
              <tr className="border-b border-white/10 text-slate-400">
                <th className="px-6 py-4 font-medium uppercase tracking-wider">
                  Título
                </th>
                <th className="px-6 py-4 font-medium uppercase tracking-wider">
                  Slug
                </th>
                <th className="px-6 py-4 font-medium uppercase tracking-wider">
                  Criação
                </th>
                <th className="px-6 py-4 font-medium uppercase tracking-wider text-right">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <AnimatePresence>
                {pages.map((page) => (
                  <motion.tr
                    key={page.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="hover:bg-white/2 transition-colors group"
                  >
                    <td className="px-6 py-4 text-white font-medium">
                      {page.title}
                    </td>
                    <td className="px-6 py-4 text-slate-400 font-mono text-xs">
                      /{page.slug}
                    </td>
                    <td className="px-6 py-4 text-slate-500">
                      {new Date(page.created_at).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/projects/${page.slug}`}
                          target="_blank"
                          className="p-2 text-slate-400 hover:text-white transition-colors"
                          title="Ver página pública"
                        >
                          <ExternalLink size={18} />
                        </Link>
                        <Link
                          href={`/admin/landing-pages/${page.id}`}
                          className="p-2 text-slate-400 hover:text-blue-400 transition-colors"
                          title="Editar"
                        >
                          <Edit size={18} />
                        </Link>
                        <button
                          onClick={() => handleDelete(page.id)}
                          className="p-2 text-slate-400 hover:text-red-400 transition-colors"
                          title="Excluir"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        ) : (
          <div className="p-12 text-center">
            <p className="text-slate-400 mb-4">Nenhuma landing page criada.</p>
            <Link
              href="/admin/landing-pages/new"
              className="text-blue-400 hover:underline text-sm"
            >
              Criar minha primeira página
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
