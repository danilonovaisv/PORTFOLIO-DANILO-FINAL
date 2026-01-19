export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const fetchCache = 'force-no-store';

export default function ConfigPage() {
  return (
    <div className="space-y-4">
      <p className="text-sm uppercase tracking-[0.25em] text-slate-400">
        Configurações
      </p>
      <h1 className="text-3xl font-semibold">Configurações básicas</h1>
      <p className="text-slate-300 text-sm">
        Use esta seção para adicionar preferências futuras (ex: usuários admin,
        temas, chaves de API).
      </p>
    </div>
  );
}
