import React from 'react';
import { Bell } from 'lucide-react';

interface TopNavProps {
  onOpenNotify: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({ onOpenNotify }) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 lg:px-8 h-16">
        {/* Zone 1: Single text element wordmark */}
        <a href="#" className="text-base sm:text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
          <span>NexusCore Platform</span>
        </a>

        {/* Zone 2: 4 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          <a href="#transmision" className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0">
            Transmisión en Vivo
          </a>
          <a href="#progreso" className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0">
            Progreso del Despliegue
          </a>
          <a href="#novedades" className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0">
            Novedades v3
          </a>
          <a href="#estado" className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0">
            Salud de Servidores
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenNotify}
            className="flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 active:scale-95 rounded-lg transition-all shadow-sm shadow-amber-500/20 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Bell className="w-4 h-4" />
            <span>Avisarme al Finalizar</span>
          </button>
        </div>
      </div>
    </header>
  );
};
