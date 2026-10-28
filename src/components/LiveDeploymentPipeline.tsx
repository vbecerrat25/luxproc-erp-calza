import React, { useState, useEffect } from 'react';
import { CheckCircle2, Clock, Terminal, Shield, RefreshCw, Copy, Check } from 'lucide-react';

interface LogEntry {
  id: string;
  time: string;
  category: string;
  message: string;
  status: 'done' | 'progress' | 'info';
}

const INITIAL_LOGS: LogEntry[] = [
  { id: '1', time: '06:31:12', category: 'KERNEL', message: 'Iniciando compilación de clúster v3.4.1 con aislamiento de datos seguro', status: 'done' },
  { id: '2', time: '06:33:04', category: 'DATABASE', message: 'Indexación de particiones PostgreSQL en caliente completada en 142ms', status: 'done' },
  { id: '3', time: '06:34:20', category: 'SECURITY', message: 'Certificados TLS/SSL renovados automáticamente con algoritmo ECC P-384', status: 'done' },
  { id: '4', time: '06:35:45', category: 'STORAGE', message: 'Compresión WebP/AVIF y CDN distribuida en 32 nodos Edge mundiales', status: 'done' },
  { id: '5', time: '06:36:58', category: 'ENGINE', message: 'Sincronizando estados en memoria caché Redis para ultra baja latencia', status: 'progress' },
];

const MORE_LOGS: { category: string; message: string; status: 'done' | 'progress' | 'info' }[] = [
  { category: 'FRONTEND', message: 'Renderizando componentes React 19 con hidratación progresiva', status: 'done' },
  { category: 'MONITORING', message: 'Comprobación de salud HTTP 200 en todos los puntos de enlace', status: 'done' },
  { category: 'NETWORK', message: 'Rutas Anycast optimizadas reduciendo latencia intercontinental en 28%', status: 'info' },
  { category: 'API', message: 'Validación de contratos REST y GraphQL completada con 0 anomalías', status: 'done' },
  { category: 'SECURITY', message: 'Escaneo de vulnerabilidades estáticas y dinámicas: 100% limpio', status: 'done' },
  { category: 'UI/UX', message: 'Cargando nuevos módulos interactivos de velocidad y experiencia', status: 'progress' },
];

export const LiveDeploymentPipeline: React.FC = () => {
  const [progress, setProgress] = useState<number>(84);
  const [logs, setLogs] = useState<LogEntry[]>(INITIAL_LOGS);
  const [isAutoScroll, setIsAutoScroll] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);
  const [remainingMinutes, setRemainingMinutes] = useState<number>(16);
  const [remainingSeconds, setRemainingSeconds] = useState<number>(45);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingSeconds((prevSec) => {
        if (prevSec > 0) return prevSec - 1;
        setRemainingMinutes((prevMin) => (prevMin > 0 ? prevMin - 1 : 0));
        return 59;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Periodic new log entries and gentle progress crawl
  useEffect(() => {
    if (!isAutoScroll) return;

    const interval = setInterval(() => {
      setProgress((p) => (p < 98 ? p + 1 : 98));

      const randomTemplate = MORE_LOGS[Math.floor(Math.random() * MORE_LOGS.length)];
      const now = new Date();
      const timeStr = now.toTimeString().split(' ')[0];

      const newEntry: LogEntry = {
        id: Math.random().toString(36).substring(2, 9),
        time: timeStr,
        category: randomTemplate.category,
        message: randomTemplate.message,
        status: randomTemplate.status,
      };

      setLogs((prev) => [newEntry, ...prev.slice(0, 14)]);
    }, 4500);

    return () => clearInterval(interval);
  }, [isAutoScroll]);

  const copyLogHistory = () => {
    const text = logs.map((l) => `[${l.time}] [${l.category}] ${l.message}`).join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const stages = [
    { name: '1. Respaldo de Integridad', status: 'completado', detail: 'Datos 100% resguardados' },
    { name: '2. Arquitectura de Base de Datos', status: 'completado', detail: 'Migración en caliente' },
    { name: '3. Despliegue de Servidores Edge', status: 'en_proceso', detail: 'Sincronizando 32 clústeres' },
    { name: '4. Pruebas de Carga y Rendimiento', status: 'pendiente', detail: 'Simulación de 100k usuarios' },
    { name: '5. Publicación Final', status: 'pendiente', detail: 'Apertura inmediata' },
  ];

  return (
    <section id="progreso" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-amber-400 uppercase mb-2">
          <RefreshCw className="w-4 h-4 animate-spin text-amber-400" />
          <span>Monitor de Despliegue en Tiempo Real</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Estado de la Actualización del Sistema
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              Transparencia total: observa cómo aplicamos las mejoras paso a paso sin pérdida de información.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 shrink-0">
            <Clock className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <div className="text-[11px] uppercase tracking-wider text-slate-400">Tiempo Estimado Restante</div>
              <div className="text-lg font-mono font-bold text-white tabular-nums">
                {String(remainingMinutes).padStart(2, '0')}m {String(remainingSeconds).padStart(2, '0')}s
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar Container */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 mb-8 shadow-lg">
        <div className="flex items-center justify-between mb-3 text-sm">
          <span className="font-semibold text-white flex items-center gap-2">
            <span>Progreso General de la Actualización</span>
            <span className="text-xs text-amber-400 font-mono">({progress}%)</span>
          </span>
          <span className="text-xs text-slate-400 font-mono">Fase 3 de 5 en ejecución</span>
        </div>

        {/* Bar */}
        <div className="w-full h-3.5 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
          <div
            className="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-emerald-400 rounded-full transition-all duration-700 relative overflow-hidden"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute inset-0 bg-white/20 animate-pulse" />
          </div>
        </div>

        {/* 5 Stages Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mt-6 pt-6 border-t border-slate-800/80">
          {stages.map((stg) => {
            const isCompleted = stg.status === 'completado';
            const isCurrent = stg.status === 'en_proceso';

            return (
              <div
                key={stg.name}
                className={`p-3 rounded-xl border transition-all ${
                  isCurrent
                    ? 'bg-amber-500/10 border-amber-500/40 text-amber-300'
                    : isCompleted
                    ? 'bg-slate-950/60 border-slate-800 text-slate-300'
                    : 'bg-slate-950/30 border-slate-800/40 text-slate-500'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : isCurrent ? (
                    <RefreshCw className="w-4 h-4 text-amber-400 animate-spin shrink-0" />
                  ) : (
                    <div className="w-3.5 h-3.5 rounded-full border border-slate-600 shrink-0" />
                  )}
                  <span className="text-xs font-semibold leading-tight">{stg.name}</span>
                </div>
                <div className="text-[11px] text-slate-400 pl-6">{stg.detail}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Live Activity Terminal */}
      <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-slate-900/90 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-300 pl-2">
              <Terminal className="w-3.5 h-3.5 text-amber-400" />
              <span>nexus-deploy-stream.log</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAutoScroll(!isAutoScroll)}
              className={`px-2.5 py-1 text-xs rounded-md border font-mono transition-colors cursor-pointer ${
                isAutoScroll
                  ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300'
                  : 'bg-slate-800 border-slate-700 text-slate-400'
              }`}
            >
              {isAutoScroll ? '● En Vivo' : '⏸ En Pausa'}
            </button>
            <button
              onClick={copyLogHistory}
              className="p-1.5 text-slate-400 hover:text-white rounded-md hover:bg-slate-800 transition-colors cursor-pointer"
              title="Copiar bitácora de actualización"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Terminal Content */}
        <div className="p-4 sm:p-5 font-mono text-xs max-h-72 overflow-y-auto space-y-2 select-text">
          {logs.map((log) => (
            <div key={log.id} className="flex items-start gap-3 text-slate-300 hover:bg-slate-900/40 p-1 rounded transition-colors">
              <span className="text-slate-500 tabular-nums shrink-0">[{log.time}]</span>
              <span className={`px-1.5 py-0.2 rounded text-[10px] font-semibold shrink-0 ${
                log.category === 'SECURITY' ? 'bg-indigo-950 text-indigo-300 border border-indigo-800' :
                log.category === 'DATABASE' ? 'bg-cyan-950 text-cyan-300 border border-cyan-800' :
                log.category === 'ENGINE' ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                'bg-slate-800 text-slate-300'
              }`}>
                {log.category}
              </span>
              <span className="text-slate-200 leading-relaxed">{log.message}</span>
            </div>
          ))}
        </div>

        {/* Terminal Footer status */}
        <div className="px-5 py-2.5 bg-slate-900/50 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-2">
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            <span>Integridad de datos: 100% verificada con firma criptográfica</span>
          </div>
          <span className="hidden sm:inline font-mono">PID 4192 · Hilos 16</span>
        </div>
      </div>
    </section>
  );
};
