import Link from 'next/link';
import { PenTool, Image as ImageIcon, ArrowRight } from 'lucide-react';

export default function AntigravityPage() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1: Copy Agent */}
            <Link
                href="/admin/antigravity/copy-agent"
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-slate-950 border border-white/10 p-8 hover:border-indigo-500/50 transition-all duration-300 hover:shadow-[0_0_40px_-10px_rgba(99,102,241,0.3)]"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative z-10">
                    <div className="mb-6 inline-flex rounded-xl bg-indigo-500/10 p-3 text-indigo-400 group-hover:text-indigo-300 group-hover:bg-indigo-500/20 transition-colors">
                        <PenTool size={32} />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-3">
                        Portfolio Copy Agent
                    </h2>
                    <p className="text-slate-400 leading-relaxed">
                        Agente especializado em direção de arte textual. Gera apresentações
                        de projetos com profundidade, intenção e storytelling refinado.
                    </p>
                </div>

                <div className="relative z-10 mt-8 flex items-center text-sm font-medium text-indigo-400 group-hover:text-indigo-300">
                    Acessar ferramenta <ArrowRight className="ml-2 h-4 w-4" />
                </div>
            </Link>

            {/* Card 2: Ad Scene Generator */}
            <Link
                href="/admin/antigravity/scene-generator"
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-slate-950 border border-white/10 p-8 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-[0_0_40px_-10px_rgba(16,185,129,0.3)]"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative z-10">
                    <div className="mb-6 inline-flex rounded-xl bg-emerald-500/10 p-3 text-emerald-400 group-hover:text-emerald-300 group-hover:bg-emerald-500/20 transition-colors">
                        <ImageIcon size={32} />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-3">
                        Ad Scene Generator
                    </h2>
                    <p className="text-slate-400 leading-relaxed">
                        Visualizador de contextos publicitários. Cria cenas fotorrealistas
                        de uso para peças de design em situações do cotidiano.
                    </p>
                </div>

                <div className="relative z-10 mt-8 flex items-center text-sm font-medium text-emerald-400 group-hover:text-emerald-300">
                    Acessar ferramenta <ArrowRight className="ml-2 h-4 w-4" />
                </div>
            </Link>
        </div>
    );
}
