'use client';

import { useState } from 'react';
import { saveOpenAIKey, removeOpenAIKey } from './actions';

type Props = {
  hasOpenAIKeyEnv: boolean;
  hasOpenAIKeyDb: boolean;
  hasServiceRole: boolean;
};

export function SettingsForm({
  hasOpenAIKeyEnv,
  hasOpenAIKeyDb,
  hasServiceRole,
}: Props) {
  const [key, setKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const canPersistDbKey = hasServiceRole && !hasOpenAIKeyEnv;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    if (!key.trim()) {
      setError('A chave não pode estar vazia.');
      return;
    }
    setLoading(true);
    const result = await saveOpenAIKey(key.trim());
    setLoading(false);

    if (result.ok) {
      setSuccess('Chave salva com sucesso!');
      setKey('');
    } else {
      setError(result.error || 'Erro ao salvar a chave.');
    }
  };

  const handleRemove = async () => {
    setError(null);
    setSuccess(null);
    setLoading(true);
    const result = await removeOpenAIKey();
    setLoading(false);

    if (result.ok) {
      setSuccess('Chave removida do banco de dados.');
    } else {
      setError(result.error || 'Erro ao remover a chave.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-xl border border-white/10 bg-slate-900/40">
        <div className="mb-4">
          <h2 className="text-lg font-medium text-white">
            Chave do OpenAI (API Key)
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Usada para o Copy Agent e Scene Generator. Configurada via variável
            de ambiente ou salva aqui no banco de dados.
          </p>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <span className="text-sm text-slate-300">Status atual:</span>
          {hasOpenAIKeyEnv ? (
            <span className="text-sm font-medium text-blue-400">
              Configurada via Variável de Ambiente (Deploy)
            </span>
          ) : hasOpenAIKeyDb ? (
            <span className="text-sm font-medium text-emerald-400">
              Configurada via Banco de Dados (Ativa)
            </span>
          ) : (
            <span className="text-sm font-medium text-rose-400">Ausente</span>
          )}
        </div>

        {!hasOpenAIKeyEnv && (
          <form onSubmit={handleSave} className="space-y-4 max-w-xl">
            <div>
              <label className="block text-sm text-slate-300 mb-2">
                Cadastrar ou atualizar chave do banco de dados:
              </label>
              <input
                type="password"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                placeholder="sk-..."
                disabled={!hasServiceRole}
                className="w-full rounded-md bg-slate-950 border border-white/10 px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500/50"
              />
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={loading || !key.trim() || !canPersistDbKey}
                className="rounded-md bg-blue-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-600 disabled:opacity-50"
              >
                {loading ? 'Salvando...' : 'Salvar Chave'}
              </button>

              {hasOpenAIKeyDb && (
                <button
                  type="button"
                  onClick={handleRemove}
                  disabled={loading || !canPersistDbKey}
                  className="rounded-md bg-slate-800 border border-white/10 px-4 py-2 text-sm font-semibold text-rose-400 transition hover:bg-slate-700 disabled:opacity-50"
                >
                  Remover Chave Salva
                </button>
              )}
            </div>

            {!hasServiceRole && (
              <p className="text-sm text-amber-400">
                Configure `SUPABASE_SERVICE_ROLE_KEY` no servidor para salvar e
                ler a chave da OpenAI pelo banco. Sem isso, apenas a variável de
                ambiente `OPENAI_API_KEY` funciona.
              </p>
            )}

            {error && <p className="text-sm text-rose-400 mt-2">{error}</p>}
            {success && (
              <p className="text-sm text-emerald-400 mt-2">{success}</p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
