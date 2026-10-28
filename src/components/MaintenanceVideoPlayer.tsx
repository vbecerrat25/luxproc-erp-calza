import React, { useRef, useEffect } from 'react';

export const MaintenanceVideoPlayer: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay fallback
      });
    }
  }, []);

  return (
    <div className="relative w-full max-w-[480px] aspect-square flex items-center justify-center select-none pointer-events-none">
      {/* Seamless blend with white background, acts identically to an animated PNG loop */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        disablePictureInPicture
        disableRemotePlayback
        className="w-full h-full object-contain pointer-events-none mix-blend-multiply select-none"
        aria-label="Animación 3D de espacio en mantenimiento con maquinaria en movimiento"
      >
        <source src="/assets/maintenance_video.mp4" type="video/mp4" />
        <source src="/assets/maintenance_video_cropped.mp4" type="video/mp4" />
      </video>
    </div>
  );
};
