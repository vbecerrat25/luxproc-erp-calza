import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  RotateCcw,
  Sparkles,
  Layers,
  Radio,
  Sliders
} from 'lucide-react';
import { ambientAudio } from '../utils/audioAmbience.ts';

interface LiveWorkingVideoHeroProps {
  onOpenNotify: () => void;
}

export const LiveWorkingVideoHero: React.FC<LiveWorkingVideoHeroProps> = ({ onOpenNotify }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [motionSpeed, setMotionSpeed] = useState<number>(1);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [selectedTagline, setSelectedTagline] = useState<number>(0);
  const [currentTimecode, setCurrentTimecode] = useState<string>('00:00:00');
  const [localTime, setLocalTime] = useState<string>('');
  
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const taglines = [
    {
      badge: 'DESPLIEGUE EN CURSO',
      title: 'Estamos trabajando en nuevas mejoras',
      subtitle: 'Nuestro equipo de ingeniería y diseño está sincronizando la nueva infraestructura para elevar la velocidad y confiabilidad de tu experiencia.',
    },
    {
      badge: 'ACTUALIZACIÓN EN VIVO',
      title: 'Estamos brindando actualizaciones',
      subtitle: 'Implementando optimizaciones de rendimiento en tiempo real y renovando el ecosistema interactivo para ti.',
    },
    {
      badge: 'EXPERIENCIA CONTINUA',
      title: 'Optimizando tu experiencia de usuario',
      subtitle: 'Cada detalle está siendo calibrado: tiempos de respuesta instantáneos, mayor estabilidad y herramientas actualizadas.',
    },
  ];

  // Local clock and stream timecode
  useEffect(() => {
    let seconds = 248;
    const interval = setInterval(() => {
      seconds++;
      const hrs = Math.floor(seconds / 3600).toString().padStart(2, '0');
      const mins = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
      const secs = (seconds % 60).toString().padStart(2, '0');
      setCurrentTimecode(`${hrs}:${mins}:${secs}`);

      const now = new Date();
      setLocalTime(now.toLocaleTimeString('es-ES', { hour12: false }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Ambient floating particle canvas overlay
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle setup
    const particles = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 1,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: -Math.random() * 0.6 - 0.2,
      opacity: Math.random() * 0.6 + 0.2,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.speedX * motionSpeed;
        p.y += p.speedY * motionSpeed;

        if (p.y < 0) {
          p.y = height + 5;
          p.x = Math.random() * width;
        }
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245, 158, 11, ${p.opacity * 0.8})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = 'rgba(245, 158, 11, 0.4)';
        ctx.fill();
      });

      if (isPlaying) {
        animationId = requestAnimationFrame(render);
      }
    };

    if (isPlaying) {
      animationId = requestAnimationFrame(render);
    }

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isPlaying, motionSpeed]);

  const toggleAudio = () => {
    const isNowPlaying = ambientAudio.toggle();
    setIsMuted(!isNowPlaying);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const activeTagline = taglines[selectedTagline];

  return (
    <section id="transmision" className="pt-6 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Top Selector pills for phrasing options requested by user */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-slate-400">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-emerald-400 font-semibold">FEED ACTIVO</span>
          <span aria-hidden="true">·</span>
          <span>SALA DE OPERACIONES</span>
          <span aria-hidden="true">·</span>
          <span>{localTime || 'EN LÍNEA'}</span>
        </div>

        {/* Message Mode Switcher */}
        <div className="flex items-center bg-slate-900/90 p-1 rounded-lg border border-slate-800 text-xs text-slate-300">
          <Sliders className="w-3.5 h-3.5 text-amber-400 ml-2 mr-1" />
          <span className="text-slate-400 mr-2 text-[11px] uppercase tracking-wider hidden sm:inline">Modo:</span>
          {taglines.map((t, idx) => (
            <button
              key={t.badge}
              onClick={() => setSelectedTagline(idx)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer ${
                selectedTagline === idx
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {idx === 0 ? 'Estamos trabajando' : idx === 1 ? 'Actualizaciones' : 'Experiencia'}
            </button>
          ))}
        </div>
      </div>

      {/* Main Video-Like Simulated Frame */}
      <div
        ref={containerRef}
        className={`relative w-full rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl transition-all ${
          isFullscreen ? 'fixed inset-0 z-50 rounded-none border-none' : 'aspect-[16/9] min-h-[460px] md:min-h-[560px]'
        }`}
      >
        {/* Background Animated Image with Ken Burns video motion */}
        <div className="absolute inset-0 overflow-hidden bg-slate-950">
          <img
            src="/src/assets/images/hero_maintenance_workspace_1792503399893.jpg"
            alt="Equipo de ingeniería trabajando en vivo en la actualización del sistema"
            className={`w-full h-full object-cover select-none transition-transform duration-1000 ${
              isPlaying ? 'animate-video-pan' : 'scale-100'
            }`}
            style={{
              animationDuration: `${16 / motionSpeed}s`,
              animationPlayState: isPlaying ? 'running' : 'paused',
            }}
          />

          {/* High-Contrast Measured Scrims & Cinematic Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/65 to-slate-950/40" />
          <div className="absolute inset-0 bg-radial from-transparent via-slate-950/30 to-slate-950/90" />

          {/* Subtle Video Scanline Animation */}
          <div className="absolute inset-0 pointer-events-none opacity-20">
            <div className="w-full h-24 bg-gradient-to-b from-transparent via-amber-400/20 to-transparent animate-scanline" />
          </div>

          {/* Film Grain & Particle Canvas */}
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-10" />
        </div>

        {/* Video HUD Overlays */}
        <div className="relative z-20 h-full flex flex-col justify-between p-5 sm:p-8 md:p-10 pointer-events-none">
          {/* Top HUD bar */}
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-red-950/80 border border-red-500/40 text-red-300 px-3 py-1 rounded-md text-xs font-mono font-semibold tracking-wider">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span>REC · LIVE FEED</span>
              </div>
              <div className="hidden sm:flex items-center gap-2 bg-slate-900/80 border border-slate-700/60 px-3 py-1 rounded-md text-xs font-mono text-slate-300">
                <Radio className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                <span>CANAL 01 // SALA DE ACTUALIZACIÓN</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-slate-300 bg-slate-900/80 border border-slate-700/60 px-3 py-1 rounded-md">
              <span className="text-amber-400">4K HDR</span>
              <span aria-hidden="true">·</span>
              <span>60 FPS</span>
              <span aria-hidden="true" className="hidden sm:inline">·</span>
              <span className="hidden sm:inline text-emerald-400">99.98% RED</span>
            </div>
          </div>

          {/* Center Content: Animated Typography & Main Focus */}
          <div className="my-auto max-w-3xl pointer-events-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-semibold tracking-wider uppercase mb-4 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{activeTagline.badge}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-4 leading-tight drop-shadow-md">
              {activeTagline.title}
            </h1>

            <p className="text-base sm:text-lg text-slate-200 leading-relaxed mb-6 max-w-2xl font-normal drop-shadow">
              {activeTagline.subtitle}
            </p>

            {/* Action buttons inside the hero */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenNotify}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-semibold text-sm sm:text-base transition-all transform active:scale-95 shadow-lg shadow-amber-500/25 flex items-center gap-2 cursor-pointer"
              >
                <span>Avisarme cuando esté listo</span>
                <span className="text-xs bg-slate-950/20 px-2 py-0.5 rounded text-slate-950 font-mono">Gratis</span>
              </button>

              <a
                href="#progreso"
                className="px-5 py-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700/80 text-sm font-medium transition-all flex items-center gap-2"
              >
                <Layers className="w-4 h-4 text-amber-400" />
                <span>Ver registro de cambios</span>
              </a>
            </div>
          </div>

          {/* Bottom Interactive Video Player Controls */}
          <div className="w-full bg-slate-950/85 backdrop-blur-md rounded-xl p-3 border border-slate-800/80 pointer-events-auto flex flex-wrap items-center justify-between gap-3 text-xs">
            {/* Play/Pause & Live scrubber */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition-colors cursor-pointer"
                title={isPlaying ? 'Pausar animación de video' : 'Reproducir animación'}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 text-amber-400" />}
              </button>

              <button
                onClick={toggleAudio}
                className={`p-2 rounded-lg border transition-colors cursor-pointer flex items-center gap-1.5 ${
                  isMuted
                    ? 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    : 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                }`}
                title={isMuted ? 'Activar ambiente sonoro de estudio' : 'Silenciar sonido ambiental'}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 animate-pulse" />}
                <span className="hidden sm:inline font-mono text-[11px]">
                  {isMuted ? 'Audio Off' : 'Ambiente Activo'}
                </span>
              </button>

              <div className="flex items-center gap-2 font-mono text-slate-300">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                <span className="tabular-nums text-slate-200 font-semibold">{currentTimecode}</span>
              </div>
            </div>

            {/* Speed & Video Controls */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Speed Buttons */}
              <div className="flex items-center bg-slate-900 rounded-lg p-0.5 border border-slate-800">
                {[0.5, 1, 1.5, 2].map((spd) => (
                  <button
                    key={spd}
                    onClick={() => setMotionSpeed(spd)}
                    className={`px-2 py-1 rounded text-[11px] font-mono cursor-pointer transition-colors ${
                      motionSpeed === spd
                        ? 'bg-amber-500 text-slate-950 font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {spd}x
                  </button>
                ))}
              </div>

              {/* Reset view */}
              <button
                onClick={() => {
                  setMotionSpeed(1);
                  setIsPlaying(true);
                }}
                className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors cursor-pointer"
                title="Restablecer vista normal"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              {/* Fullscreen */}
              <button
                onClick={toggleFullscreen}
                className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors cursor-pointer"
                title="Pantalla completa"
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
