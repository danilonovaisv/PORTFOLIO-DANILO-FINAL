'use client';

import * as React from 'react';

type BuildInfo = {
  buildTimeISO?: string;
  gitSha?: string;
  gitShaShort?: string;
  nodeEnv?: string;
};

async function fetchBuildInfo(): Promise<BuildInfo> {
  const res = await fetch(`/build-info.json?t=${Date.now()}`, {
    cache: 'no-store',
  });
  if (!res.ok) return {};
  return (await res.json()) as BuildInfo;
}

const formatDate = (value?: string) => {
  if (!value) return '—';
  const date = new Date(value);
  return date.toLocaleString(undefined, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
};

export default function BuildInfoClient() {
  const [info, setInfo] = React.useState<BuildInfo | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let mounted = true;

    fetchBuildInfo()
      .then((data) => {
        if (!mounted) return;
        setInfo(data);
      })
      .catch((err) => {
        if (!mounted) return;
        setError(
          err instanceof Error
            ? err.message
            : 'Falha ao carregar build-info.json'
        );
      });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-semibold tracking-tight text-white">
        Build / Deploy stamp
      </h1>
      <p className="mt-2 text-sm leading-relaxed text-white/70">
        Esta página confirma objetivamente se o Firebase está servindo o build
        mais recente (sem depender de cache no browser).
      </p>

      <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
        {error ? (
          <div className="text-sm text-red-200">
            <p className="font-medium">Falha ao carregar build-info.json</p>
            <p className="mt-1 opacity-80">{error}</p>
          </div>
        ) : !info ? (
          <div className="text-sm text-white/70">Carregando…</div>
        ) : (
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-xs uppercase tracking-widest text-white/50">
                buildTime (local)
              </dt>
              <dd className="mt-1 font-mono text-sm text-white">
                {formatDate(info.buildTimeISO)}
              </dd>
            </div>

            <div>
              <dt className="text-xs uppercase tracking-widest text-white/50">
                buildTime (ISO)
              </dt>
              <dd className="mt-1 font-mono text-sm text-white">
                {info.buildTimeISO ?? '—'}
              </dd>
            </div>

            <div className="sm:col-span-2">
              <dt className="text-xs uppercase tracking-widest text-white/50">
                git sha
              </dt>
              <dd className="mt-1 flex flex-wrap items-center gap-2">
                <span className="font-mono text-sm text-white">
                  {info.gitSha ?? '—'}
                </span>
                {info.gitSha ? (
                  <button
                    type="button"
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80 transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                    onClick={async () => {
                      await navigator.clipboard.writeText(info.gitSha ?? '');
                    }}
                  >
                    copiar
                  </button>
                ) : null}
              </dd>
            </div>
          </dl>
        )}
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
        <h2 className="text-sm font-medium text-white">Checklist rápido</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-white/70">
          <li>
            O campo <span className="font-mono">buildTime</span> deve mudar a
            cada deploy.
          </li>
          <li>
            HTML responde com{' '}
            <span className="font-mono">
              Cache-Control: max-age=0, must-revalidate
            </span>
            .
          </li>
          <li>
            Assets em <span className="font-mono">/_next/static/</span> podem (e
            devem) ficar em cache longo.
          </li>
        </ul>
      </div>
    </section>
  );
}
