import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-900 bg-slate-950 py-10 px-4 sm:px-6 lg:px-8 text-xs text-slate-500">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-300">NexusCore Platform</span>
          <span aria-hidden="true">·</span>
          <span>Despliegue Continuo & Mantenimiento Activo</span>
        </div>

        <div className="flex items-center gap-6">
          <a href="#transmision" className="hover:text-slate-300 transition-colors">
            Transmisión
          </a>
          <a href="#progreso" className="hover:text-slate-300 transition-colors">
            Progreso
          </a>
          <a href="#novedades" className="hover:text-slate-300 transition-colors">
            Novedades
          </a>
          <a href="#estado" className="hover:text-slate-300 transition-colors">
            Estado
          </a>
        </div>

        <div className="text-slate-500 font-mono text-[11px]">
          © {new Date().getFullYear()} NexusCore Systems. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};
