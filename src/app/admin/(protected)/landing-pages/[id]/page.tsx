import LandingPageForm from '@/components/admin/LandingPageForm';
import { getLandingPageAction } from '@/app/admin/(protected)/landing-pages/actions';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditLandingPage({ params }: Props) {
  const { id } = await params;
  const data = await getLandingPageAction(id).catch(() => null);

  if (!data) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-white/40">
          Error: Page_Not_Found
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl space-y-12 py-6">
      <header className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="h-[1px] w-8 bg-blue-500/40" />
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-blue-500/60">
            System_Main_Frame
          </p>
        </div>
        <h1 className="font-mono text-4xl font-light tracking-tight text-white sm:text-5xl">
          Editar_Projeto<span className="text-blue-500">.</span>
        </h1>
        <p className="font-mono text-[10px] uppercase text-white/40 tracking-widest">
          Node_ID: {id.substring(0, 8)}... | Action: Modify_Existing_Page
        </p>
      </header>

      <LandingPageForm initialData={data} />
    </div>
  );
}
