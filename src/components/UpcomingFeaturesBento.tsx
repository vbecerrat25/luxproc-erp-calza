import React, { useState } from 'react';
import { Zap, ShieldCheck, Cpu, Smartphone, ArrowRight, Gauge, Check } from 'lucide-react';

export const UpcomingFeaturesBento: React.FC = () => {
  const [activeComparison, setActiveComparison] = useState<'after' | 'before'>('after');

  return (
    <section id="novedades" className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-900">
      {/* Section Header */}
      <div className="mb-10 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-amber-400 uppercase mb-2">
          <Zap className="w-4 h-4 text-amber-400" />
          <span>Experiencia de Usuario de Próxima Generación</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
          ¿En qué estamos trabajando exactamente?
        </h2>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          Esta actualización no es solo mantenimiento técnico rutinario: estamos transformando por completo la fluidez, velocidad y seguridad de toda la plataforma.
        </p>

        {/* Before / After toggle */}
        <div className="inline-flex items-center gap-1 p-1 bg-slate-900 rounded-xl border border-slate-800 mt-6">
          <button
            onClick={() => setActiveComparison('after')}
            className={`px-4 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
              activeComparison === 'after'
                ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Nueva Versión v3 (En despliegue)
          </button>
          <button
            onClick={() => setActiveComparison('before')}
            className={`px-4 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
              activeComparison === 'before'
                ? 'bg-slate-800 text-white font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Versión Anterior
          </button>
        </div>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Large Bento Card 1: Speed & Telemetry */}
        <div className="lg:col-span-7 bg-slate-900/80 rounded-2xl border border-slate-800 overflow-hidden flex flex-col justify-between group hover:border-slate-700 transition-all">
          <div className="p-6 sm:p-8">
            <div className="flex items-center justify-between gap-4 mb-4">
              <div className="text-xs font-mono text-amber-400">01. MOTOR DE ULTRA BAJA LATENCIA</div>
              <div className="flex items-center gap-1 text-xs text-slate-400">
                <span>Tiempo de respuesta</span>
                <span aria-hidden="true">·</span>
                <span className="text-emerald-400 font-mono font-semibold">
                  {activeComparison === 'after' ? '12.4 ms' : '240.0 ms'}
                </span>
              </div>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
              Navegación instantánea y precarga inteligente
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              {activeComparison === 'after'
                ? 'El nuevo motor distribuye las consultas entre los centros de datos más cercanos a tu ubicación, reduciendo la espera a cero absoluto.'
                : 'La versión previa requería múltiples peticiones en serie que podían causar demoras perceptibles en conexiones móviles.'}
            </p>

            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-800 text-xs">
              <div>
                <div className="text-slate-500">Carga Inicial</div>
                <div className="text-base sm:text-lg font-mono font-bold text-white tabular-nums mt-0.5">
                  {activeComparison === 'after' ? '0.18s' : '1.42s'}
                </div>
              </div>
              <div>
                <div className="text-slate-500">Consumo Memoria</div>
                <div className="text-base sm:text-lg font-mono font-bold text-emerald-400 tabular-nums mt-0.5">
                  {activeComparison === 'after' ? '-45%' : 'Estándar'}
                </div>
              </div>
              <div>
                <div className="text-slate-500">Disponibilidad</div>
                <div className="text-base sm:text-lg font-mono font-bold text-white tabular-nums mt-0.5">
                  99.98%
                </div>
              </div>
            </div>
          </div>

          {/* Feature Image with overlay */}
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-950 border-t border-slate-800">
            <img
              src="/src/assets/images/feature_speed_engine_1792503400586.jpg"
              alt="Métricas del motor de datos de alta velocidad"
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
          </div>
        </div>

        {/* Right Column Stack */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Card 2: Cloud Infrastructure */}
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 overflow-hidden flex flex-col group hover:border-slate-700 transition-all">
            <div className="p-6">
              <div className="text-xs font-mono text-cyan-400 mb-2">02. NUBE Y SEGURIDAD BANCARIA</div>
              <h3 className="text-lg font-bold text-white mb-2">
                Arquitectura Distribuida Resiliente
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-4">
                Tus datos quedan replicados en caliente en 4 zonas de alta disponibilidad para garantizar cero pérdida ante cualquier eventualidad.
              </p>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Cifrado AES-256 en reposo y tránsito</span>
                <span aria-hidden="true">·</span>
                <span>ISO 27001</span>
              </div>
            </div>
            <div className="relative aspect-[16/8] w-full overflow-hidden bg-slate-950 border-t border-slate-800">
              <img
                src="/src/assets/images/feature_secure_cloud_1792503400606.jpg"
                alt="Infraestructura de servidores en la nube"
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
            </div>
          </div>

          {/* Card 3: Interactive Polish */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl border border-slate-800 p-6 flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono text-amber-400 mb-2">03. INTERFAZ Y ADAPTABILIDAD</div>
              <h3 className="text-lg font-bold text-white mb-2">
                Modo Oscuro Dinámico y Soporte Móvil Fluido
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Controles táctiles de alta precisión, animaciones de 120Hz sin parpadeos y compatibilidad universal con todos tus dispositivos.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-4 mt-4 border-t border-slate-800/80 text-xs text-slate-300">
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Gestos táctiles</span>
              </div>
              <span aria-hidden="true">·</span>
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Sin recargas lentas</span>
              </div>
              <span aria-hidden="true">·</span>
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Accesibilidad AA</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
