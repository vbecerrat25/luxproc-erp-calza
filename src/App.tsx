/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { RefreshCw, CheckCircle2, Bell } from 'lucide-react';

import { MaintenanceVideoPlayer } from './components/MaintenanceVideoPlayer.tsx';

export default function App() {
  const [isChecking, setIsChecking] = useState<boolean>(false);
  const [checkStatus, setCheckStatus] = useState<string | null>(null);
  const [showNotifyInput, setShowNotifyInput] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);

  const handleCheckStatus = () => {
    setIsChecking(true);
    setCheckStatus(null);
    setTimeout(() => {
      setIsChecking(false);
      setCheckStatus('El equipo sigue trabajando activamente. Estimamos retorno en breve.');
      setTimeout(() => setCheckStatus(null), 4000);
    }, 1200);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setIsSubscribed(true);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col justify-between selection:bg-cyan-100 selection:text-cyan-900 overflow-x-hidden">
      {/* Top subtle bar with live update indicator */}
      <header className="w-full px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-medium text-slate-400 tracking-wide">
          <span className="w-2 h-2 rounded-full bg-cyan-500 animate-ping" />
          <span className="text-slate-500">Mantenimiento programado en curso</span>
        </div>

        <button
          onClick={handleCheckStatus}
          disabled={isChecking}
          className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 transition-colors cursor-pointer px-3 py-1.5 rounded-full hover:bg-slate-50 border border-transparent hover:border-slate-200"
          title="Verificar si la plataforma ya volvió"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-cyan-600 ${isChecking ? 'animate-spin' : ''}`} />
          <span>{isChecking ? 'Verificando...' : 'Comprobar estado'}</span>
        </button>
      </header>

      {/* Main Container mirroring the user reference image */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 sm:px-10 lg:px-16 flex items-center justify-center py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center w-full">
          {/* Left Column: Responsive Video Player showing the animated maintenance video */}
          <div className="lg:col-span-7 flex justify-center items-center">
            <MaintenanceVideoPlayer />
          </div>

          {/* Right Column: Clean Typographic Layout identical to reference image */}
          <div className="lg:col-span-5 flex flex-col justify-center text-left">
            {/* Emoticon :( */}
            <div
              className="text-slate-800 font-extrabold select-none leading-none tracking-tight mb-4"
              style={{ fontSize: 'clamp(3.5rem, 8vw, 6.5rem)' }}
              aria-hidden="true"
            >
              :(
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] xl:text-[50px] font-extrabold text-slate-800 tracking-tight leading-[1.08] mb-6">
              ¡LAMENTAMOS<br />
              LAS MOLESTIAS!
            </h1>

            {/* Subtitles */}
            <div className="space-y-3 text-slate-600 text-lg sm:text-xl md:text-2xl font-normal leading-relaxed">
              <p>
                Este espacio se encuentra<br className="hidden sm:inline" /> en mantenimiento.
              </p>
              <p className="text-slate-500 font-light">
                Pronto estará disponible<br className="hidden sm:inline" /> nuevamente.
              </p>
            </div>

            {/* Feedback notification when clicking check status */}
            {checkStatus && (
              <div className="mt-6 p-3.5 rounded-xl bg-cyan-50/80 border border-cyan-200/60 text-xs text-cyan-900 flex items-center gap-2 animate-fadeIn">
                <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0" />
                <span>{checkStatus}</span>
              </div>
            )}

            {/* Subtle 'Avisarme cuando esté listo' drawer */}
            <div className="mt-8 pt-6 border-t border-slate-100">
              {!showNotifyInput && !isSubscribed ? (
                <button
                  onClick={() => setShowNotifyInput(true)}
                  className="text-xs sm:text-sm font-medium text-slate-500 hover:text-cyan-700 flex items-center gap-2 transition-colors cursor-pointer group"
                >
                  <Bell className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-600 transition-colors" />
                  <span>¿Deseas que te avisemos cuando finalice?</span>
                </button>
              ) : isSubscribed ? (
                <div className="flex items-center gap-2 text-xs text-emerald-700 font-medium bg-emerald-50 px-3 py-2 rounded-lg border border-emerald-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>¡Listo! Te avisaremos a {email} tan pronto como el sistema vuelva a estar activo.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-stretch gap-2 max-w-md">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Tu correo electrónico..."
                    className="flex-1 px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:bg-white transition-all"
                  />
                  <div className="flex items-center gap-2">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white font-medium text-xs rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                    >
                      Avisarme
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowNotifyInput(false)}
                      className="text-xs text-slate-400 hover:text-slate-600 px-2 py-1 cursor-pointer"
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Quiet minimal footer */}
      <footer className="w-full px-6 py-4 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 border-t border-slate-100">
        <div>
          <span className="font-medium text-slate-600">Mantenimiento Programado</span>
        </div>
        <div className="mt-1 sm:mt-0">
          <span>Actualización de servidores y optimización de experiencia</span>
        </div>
      </footer>
    </div>
  );
}
