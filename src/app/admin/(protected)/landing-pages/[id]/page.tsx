import LandingPageForm from '@/components/admin/LandingPageForm';
import { getLandingPageAction } from '@/app/admin/(protected)/landing-pages/actions';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditLandingPage({ params }: Props) {
  const { id } = await params;
  const data = await getLandingPageAction(id).catch(() => null);

  if (!data) {
    return <div className="p-10 text-center">Página não encontrada.</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm uppercase tracking-[0.25em] text-slate-400">
          Portfolio Projects
        </p>
        <h1 className="text-3xl font-semibold">Editar Projeto de Portfólio</h1>
      </div>

      <LandingPageForm initialData={data} />
    </div>
  );
}
