import React, { useState } from 'react';
import { Bell, Check, Sparkles, X, Mail, MessageSquare } from 'lucide-react';

interface NotifyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotifyModal: React.FC<NotifyModalProps> = ({ isOpen, onClose }) => {
  const [channel, setChannel] = useState<'email' | 'whatsapp'>('email');
  const [contactValue, setContactValue] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactValue.trim()) {
      setError('Por favor ingresa un correo o número válido.');
      return;
    }

    if (channel === 'email' && !contactValue.includes('@')) {
      setError('Por favor ingresa un correo electrónico con formato válido.');
      return;
    }

    // Save locally
    try {
      const existing = JSON.parse(localStorage.getItem('nexus_notify_list') || '[]');
      existing.push({ channel, contact: contactValue, timestamp: new Date().toISOString() });
      localStorage.setItem('nexus_notify_list', JSON.stringify(existing));
    } catch {
      // ignore
    }

    setError('');
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 sm:p-8 relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-6">
            <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-400">
              <Check className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">¡Suscripción Confirmada!</h3>
            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              Te avisaremos a <span className="font-semibold text-amber-300">{contactValue}</span> en el segundo exacto en que la plataforma finalice el despliegue.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setContactValue('');
                onClose();
              }}
              className="w-full py-2.5 px-4 bg-amber-400 hover:bg-amber-300 text-slate-950 font-semibold rounded-xl text-sm transition-all cursor-pointer"
            >
              Listo, volver a la transmisión
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-amber-400 uppercase mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Acceso Anticipado Inmediato</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
              Sé el primero en entrar
            </h3>
            <p className="text-sm text-slate-400 mb-6">
              Ingresa tus datos y nuestro sistema automatizado te enviará una notificación directa en cuanto abramos los servidores.
            </p>

            {/* Channel Tabs */}
            <div className="flex rounded-xl bg-slate-950 p-1 border border-slate-800 mb-4 text-xs font-medium">
              <button
                type="button"
                onClick={() => {
                  setChannel('email');
                  setError('');
                }}
                className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-2 cursor-pointer transition-all ${
                  channel === 'email'
                    ? 'bg-slate-800 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Correo Electrónico</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setChannel('whatsapp');
                  setError('');
                }}
                className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-2 cursor-pointer transition-all ${
                  channel === 'whatsapp'
                    ? 'bg-slate-800 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp / SMS</span>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  {channel === 'email' ? 'Tu correo electrónico corporativo o personal' : 'Número de WhatsApp con código de país'}
                </label>
                <input
                  type={channel === 'email' ? 'email' : 'tel'}
                  value={contactValue}
                  onChange={(e) => setContactValue(e.target.value)}
                  placeholder={channel === 'email' ? 'ejemplo@usuario.com' : '+34 612 345 678'}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-700/80 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
                />
                {error && <p className="text-xs text-rose-400 mt-1.5">{error}</p>}
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                <span>Cero spam. Solo te enviaremos una notificación cuando esté 100% activo.</span>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-amber-400 hover:bg-amber-300 active:scale-98 text-slate-950 font-bold rounded-xl text-sm transition-all shadow-md shadow-amber-500/20 cursor-pointer flex items-center justify-center gap-2"
              >
                <Bell className="w-4 h-4" />
                <span>Notificarme Inmediatamente</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
