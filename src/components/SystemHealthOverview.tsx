import React, { useState } from 'react';
import { ShieldCheck, HelpCircle, ChevronDown, ChevronUp, LifeBuoy, CheckCircle2, AlertCircle } from 'lucide-react';

interface SystemHealthOverviewProps {
  onOpenNotify: () => void;
}

export const SystemHealthOverview: React.FC<SystemHealthOverviewProps> = ({ onOpenNotify }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [ticketSent, setTicketSent] = useState<boolean>(false);
  const [ticketEmail, setTicketEmail] = useState<string>('');
  const [ticketMsg, setTicketMsg] = useState<string>('');
  const [showEmergencyModal, setShowEmergencyModal] = useState<boolean>(false);

  const services = [
    { name: 'Pasarela de Autenticación & Cuentas', status: 'En Mantenimiento Programado', operational: false, progress: '94%' },
    { name: 'Almacenamiento y Archivos Multimedia', status: 'Operacional (Modo Lectura Segura)', operational: true, progress: '100%' },
    { name: 'Base de Datos Principal & Clúster', status: 'Optimizando Índices', operational: false, progress: '88%' },
    { name: 'Red de Distribución CDN Edge', status: '100% Operacional', operational: true, progress: '100%' },
    { name: 'Servicios de Notificaciones & Webhooks', status: 'En espera de reinicio', operational: false, progress: '75%' },
  ];

  const faqs = [
    {
      q: '¿Se perderá mi información o configuración guardada?',
      a: 'Absolutamente no. Antes de iniciar cualquier actualización, generamos una instantánea inmutable de toda la base de datos con verificación de hash SHA-256. Todo tu historial, configuraciones y datos están 100% seguros.',
    },
    {
      q: '¿Cuánto tiempo tomará la finalización del despliegue?',
      a: 'El tiempo estimado restante es de aproximadamente 15 a 20 minutos. Puedes registrar tu correo o número de contacto arriba para recibir una notificación automática tan pronto como los servidores abran el acceso.',
    },
    {
      q: '¿Qué mejoras notaré una vez que regrese la plataforma?',
      a: 'Notarás una carga casi instantánea de tus paneles, una interfaz más limpia y responsiva, menor consumo de datos móviles y nuevas funciones analíticas preparadas para ti.',
    },
    {
      q: '¿Puedo solicitar soporte técnico de emergencia en este momento?',
      a: 'Sí, nuestro equipo de guardia técnica sigue activo. Utiliza el botón de soporte de emergencia a continuación para enviar una consulta prioritaria.',
    },
  ];

  const handleSendEmergencyTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketEmail.trim()) return;
    setTicketSent(true);
    setTimeout(() => {
      setShowEmergencyModal(false);
      setTicketSent(false);
      setTicketEmail('');
      setTicketMsg('');
    }, 2500);
  };

  return (
    <section id="estado" className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-900">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left column: Services status */}
        <div className="lg:col-span-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-amber-400 uppercase mb-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Monitoreo de Infraestructura</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
              Salud de Módulos y Servidores
            </h2>
            <p className="text-slate-400 text-sm mb-6">
              Estado en tiempo real de cada uno de los subsistemas durante el proceso de actualización.
            </p>

            <div className="space-y-3">
              {services.map((svc) => (
                <div
                  key={svc.name}
                  className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    {svc.operational ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse shrink-0" />
                    )}
                    <span className="font-medium text-slate-200">{svc.name}</span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`font-mono ${svc.operational ? 'text-emerald-400' : 'text-amber-300'}`}>
                      {svc.progress}
                    </span>
                    <span className="text-slate-500 hidden sm:inline font-mono">· {svc.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="text-xs text-slate-400">
              ¿Requieres asistencia operativa prioritaria?
            </div>
            <button
              onClick={() => setShowEmergencyModal(true)}
              className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-medium transition-colors flex items-center gap-2 cursor-pointer"
            >
              <LifeBuoy className="w-3.5 h-3.5 text-amber-400" />
              <span>Contactar a Guardia Técnica</span>
            </button>
          </div>
        </div>

        {/* Right column: FAQ Accordion */}
        <div className="lg:col-span-6">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-amber-400 uppercase mb-2">
            <HelpCircle className="w-4 h-4 text-amber-400" />
            <span>Preguntas Frecuentes</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
            Respuestas a tus dudas
          </h2>
          <p className="text-slate-400 text-sm mb-6">
            Todo lo que necesitas saber mientras preparamos la nueva versión.
          </p>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={faq.q}
                  className="rounded-xl border border-slate-800 bg-slate-900/50 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-4 text-left flex items-center justify-between gap-4 text-sm font-semibold text-slate-200 hover:text-white transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-amber-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-slate-800/60 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Emergency Contact Modal */}
      {showEmergencyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-amber-400 text-sm font-bold">
                <LifeBuoy className="w-4 h-4" />
                <span>Ticket de Guardia Técnica 24/7</span>
              </div>
              <button
                onClick={() => setShowEmergencyModal(false)}
                className="text-slate-400 hover:text-white text-xs cursor-pointer"
              >
                Cerrar ✕
              </button>
            </div>

            {ticketSent ? (
              <div className="text-center py-6">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-white mb-1">¡Ticket Enviado con Éxito!</h3>
                <p className="text-xs text-slate-300">
                  Un ingeniero de operaciones revisará tu caso en menos de 5 minutos y se comunicará contigo.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSendEmergencyTicket} className="space-y-4">
                <p className="text-xs text-slate-400">
                  Si tu operación depende de un servicio crítico durante este mantenimiento, déjanos tu correo y prioridad.
                </p>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Tu Correo Electrónico</label>
                  <input
                    type="email"
                    required
                    value={ticketEmail}
                    onChange={(e) => setTicketEmail(e.target.value)}
                    placeholder="ejemplo@empresa.com"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Mensaje o Detalle de Urgencia</label>
                  <textarea
                    rows={3}
                    required
                    value={ticketMsg}
                    onChange={(e) => setTicketMsg(e.target.value)}
                    placeholder="Describe brevemente el acceso o consulta urgente..."
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-amber-400 resize-none"
                  />
                </div>
                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowEmergencyModal(false)}
                    className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-semibold cursor-pointer"
                  >
                    Enviar a Ingeniero de Guardia
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
