import React, { useState, useEffect, useRef } from 'react';

export const AnimatedMaintenanceDiorama: React.FC = () => {
  // Real-time typed code animation on the holographic tablet
  const [codeLines, setCodeLines] = useState<string[]>([
    '<head>',
    '  <meta charset="utf-8" />',
    '  <title>NexusCore v3.2</title>',
    '</head>',
    '<body>',
    '  <Platform status="deploying">',
    '    <Performance boost="240%" />',
    '    <Database sync="100%" />',
    '  </Platform>',
    '</body>',
  ]);
  const [activeLineIdx, setActiveLineIdx] = useState<number>(5);
  const [forkliftPos, setForkliftPos] = useState<number>(0);
  const [carPos, setCarPos] = useState<number>(0);
  const [robotAngle, setRobotAngle] = useState<number>(0);
  const [sparks, setSparks] = useState<{ id: number; x: number; y: number; vx: number; vy: number; life: number }[]>([]);

  const sparkIdCounter = useRef(0);

  // Animate typed code line cycle
  useEffect(() => {
    const codeTimer = setInterval(() => {
      setActiveLineIdx((prev) => (prev + 1) % codeLines.length);
    }, 1800);
    return () => clearInterval(codeTimer);
  }, [codeLines.length]);

  // Smooth animation loop for physics & spark particles
  useEffect(() => {
    let animId: number;
    let t = 0;

    const loop = () => {
      t += 0.025;
      // Forklift travels back and forth along isometric ramp
      setForkliftPos(Math.sin(t * 0.8));
      // Car glides along track
      setCarPos(Math.sin(t * 0.6));
      // Robot arm pivots and welds
      setRobotAngle(Math.sin(t * 1.2));

      // Emit welding sparks periodically when robot arm is active
      if (Math.sin(t * 1.2) > 0.8 && Math.random() > 0.4) {
        const newSparks = Array.from({ length: 4 }, () => ({
          id: ++sparkIdCounter.current,
          x: 215 + (Math.random() - 0.5) * 6,
          y: 200 + (Math.random() - 0.5) * 6,
          vx: (Math.random() - 0.5) * 3,
          vy: -Math.random() * 2.5 - 0.5,
          life: 1.0,
        }));
        setSparks((prev) => [...prev.slice(-20), ...newSparks]);
      }

      setSparks((prev) =>
        prev
          .map((s) => ({
            ...s,
            x: s.x + s.vx,
            y: s.y + s.vy,
            vy: s.vy + 0.1, // gravity
            life: s.life - 0.04,
          }))
          .filter((s) => s.life > 0)
      );

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Isometric position offsets for forklift and car
  // Isometric ramp: +x goes right-down, -x goes left-up
  const flX = 115 + forkliftPos * 22;
  const flY = 345 + forkliftPos * 11;
  const forkLiftHeight = (Math.sin(forkliftPos * 3) + 1) * 4;

  // Car along upper lane
  const carX = 230 + carPos * 28;
  const carY = 285 + carPos * 14;

  // Second small car in background
  const car2X = 275 - carPos * 18;
  const car2Y = 245 - carPos * 9;

  return (
    <div className="relative w-full max-w-[520px] aspect-[468/486] select-none group">
      {/* Ambient background glow */}
      <div className="absolute -inset-6 bg-gradient-to-tr from-cyan-200/50 via-sky-100/40 to-transparent rounded-full filter blur-3xl -z-10 pointer-events-none" />

      {/* Base SVG viewport 0 0 468 486 */}
      <svg
        viewBox="0 0 468 486"
        className="w-full h-full drop-shadow-xl overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Clip path strictly cropping out any text from original image */}
          <clipPath id="machineryOnly">
            <rect x="0" y="0" width="468" height="486" />
          </clipPath>

          {/* Gradients */}
          <linearGradient id="neonCyan" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#38bdf8" stopOpacity="1" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.8" />
          </linearGradient>

          <linearGradient id="laserBeam" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0" />
            <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#0891b2" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="screenGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0284c7" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.4" />
          </linearGradient>

          {/* Shadow filters */}
          <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* 1. Base 3D Isometric Render (cropped exactly to remove right text) */}
        <image
          href="/assets/aistudio/image_06f8ccd1.png"
          width="880"
          height="486"
          x="0"
          y="0"
          clipPath="url(#machineryOnly)"
        />

        {/* 2. Platform Neon Edge Glow Pulse */}
        <path
          d="M 52 380 L 155 435 L 360 325 L 260 270 Z"
          fill="none"
          stroke="url(#neonCyan)"
          strokeWidth="2.5"
          strokeDasharray="12 6"
          className="opacity-75"
          style={{
            animation: 'laserSweep 6s linear infinite',
          }}
        />

        {/* 3. ANIMATED GEARS (Engranajes girando) */}
        {/* Large gear 1 */}
        <g transform="translate(68, 255)">
          <g style={{ transformOrigin: '0 0', animation: 'gearSpin 9s linear infinite' }}>
            <circle r="24" fill="none" stroke="#0ea5e9" strokeWidth="4" opacity="0.85" />
            <circle r="12" fill="#0369a1" opacity="0.6" />
            {/* Gear teeth */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
              <rect
                key={angle}
                x="-3.5"
                y="-27"
                width="7"
                height="7"
                rx="1.5"
                fill="#38bdf8"
                transform={`rotate(${angle})`}
              />
            ))}
            <circle r="4" fill="#ffffff" />
          </g>
        </g>

        {/* Interlocking gear 2 (spinning counter-clockwise) */}
        <g transform="translate(106, 235)">
          <g style={{ transformOrigin: '0 0', animation: 'gearSpin 6s linear infinite reverse' }}>
            <circle r="17" fill="none" stroke="#06b6d4" strokeWidth="3.5" opacity="0.85" />
            <circle r="8" fill="#0891b2" opacity="0.6" />
            {/* Gear teeth */}
            {[0, 60, 120, 180, 240, 300].map((angle) => (
              <rect
                key={angle}
                x="-2.5"
                y="-20"
                width="5"
                height="6"
                rx="1"
                fill="#67e8f9"
                transform={`rotate(${angle})`}
              />
            ))}
            <circle r="3" fill="#ffffff" />
          </g>
        </g>

        {/* Small gear 3 */}
        <g transform="translate(126, 275)">
          <g style={{ transformOrigin: '0 0', animation: 'gearSpin 5s linear infinite' }}>
            <circle r="13" fill="none" stroke="#38bdf8" strokeWidth="3" opacity="0.8" />
            {[0, 60, 120, 180, 240, 300].map((angle) => (
              <rect
                key={angle}
                x="-2"
                y="-15"
                width="4"
                height="5"
                rx="1"
                fill="#38bdf8"
                transform={`rotate(${angle})`}
              />
            ))}
            <circle r="2.5" fill="#ffffff" />
          </g>
        </g>

        {/* 4. REAL-TIME CODING ON HOLOGRAPHIC TABLET (El código que se programa) */}
        <g transform="translate(162, 180) skewY(18) scale(0.85, 0.95)">
          {/* Glass overlay background */}
          <rect
            x="0"
            y="0"
            width="82"
            height="110"
            rx="5"
            fill="url(#screenGlow)"
            stroke="#38bdf8"
            strokeWidth="1.2"
            opacity="0.85"
            filter="url(#glowFilter)"
          />

          {/* Holographic Header Bar */}
          <rect x="0" y="0" width="82" height="12" rx="4" fill="#0f172a" opacity="0.7" />
          <circle cx="8" cy="6" r="1.8" fill="#f87171" />
          <circle cx="15" cy="6" r="1.8" fill="#fbbf24" />
          <circle cx="22" cy="6" r="1.8" fill="#34d399" />
          <text x="32" y="8.5" fill="#bae6fd" fontSize="5" fontFamily="monospace" fontWeight="bold">
            deploy.tsx
          </text>

          {/* Typing code lines */}
          {codeLines.slice(0, activeLineIdx + 1).map((line, idx) => (
            <text
              key={idx}
              x="6"
              y={24 + idx * 8.5}
              fill={
                line.includes('<head>') || line.includes('<body>')
                  ? '#38bdf8'
                  : line.includes('status') || line.includes('boost')
                  ? '#34d399'
                  : '#e0f2fe'
              }
              fontSize="5.2"
              fontFamily="monospace"
              fontWeight={idx === activeLineIdx ? 'bold' : 'normal'}
              className="transition-all"
            >
              {line}
            </text>
          ))}

          {/* Blinking Cursor */}
          <rect
            x="6"
            y={24 + activeLineIdx * 8.5 + 2}
            width="4"
            height="1.2"
            fill="#38bdf8"
            className="animate-pulse"
          />
        </g>

        {/* 5. ANIMATED ROBOTIC ARM (El brazo robótico que se mueve y ensambla) */}
        <g transform="translate(255, 240)">
          {/* Base rotation */}
          <circle cx="0" cy="0" r="14" fill="#1e293b" stroke="#0ea5e9" strokeWidth="2" />
          <circle cx="0" cy="0" r="7" fill="#0284c7" />

          {/* Lower arm swinging */}
          <g transform={`rotate(${-35 + robotAngle * 12})`}>
            <rect x="-4" y="-38" width="8" height="38" rx="3" fill="#334155" stroke="#38bdf8" strokeWidth="1.2" />
            <circle cx="0" cy="-38" r="5" fill="#0ea5e9" />

            {/* Upper arm extending */}
            <g transform={`translate(0, -38) rotate(${65 - robotAngle * 20})`}>
              <rect x="-3" y="-36" width="6" height="36" rx="2.5" fill="#475569" stroke="#67e8f9" strokeWidth="1" />
              <circle cx="0" cy="-36" r="4.5" fill="#0284c7" />

              {/* Gripper actuator & code cube */}
              <g transform="translate(0, -36)">
                {/* Gripper prongs */}
                <path d="M -5 0 L -8 10 L -4 11" fill="none" stroke="#38bdf8" strokeWidth="1.8" />
                <path d="M 5 0 L 8 10 L 4 11" fill="none" stroke="#38bdf8" strokeWidth="1.8" />

                {/* Glowing Block / Chip being placed into <body> */}
                <g transform="translate(-5, 5)">
                  <rect
                    x="0"
                    y="0"
                    width="10"
                    height="10"
                    rx="2"
                    fill="#06b6d4"
                    stroke="#ffffff"
                    strokeWidth="1"
                    filter="url(#glowFilter)"
                  />
                  <text x="1.5" y="7" fill="#ffffff" fontSize="4.5" fontWeight="bold" fontFamily="monospace">
                    &lt;/&gt;
                  </text>
                </g>

                {/* Laser welder beam tip */}
                <line x1="0" y1="0" x2="0" y2="15" stroke="#22d3ee" strokeWidth="1.5" strokeDasharray="3 2" className="animate-pulse" />
              </g>
            </g>
          </g>
        </g>

        {/* 6. WELDING / CODING SPARKS PARTICLES */}
        {sparks.map((s) => (
          <circle
            key={s.id}
            cx={s.x}
            cy={s.y}
            r={1.4 * s.life}
            fill="#38bdf8"
            opacity={s.life}
            filter="url(#glowFilter)"
          />
        ))}

        {/* 7. ANIMATED FORKLIFT / BOX CARRIER (Cargador de cajas en movimiento) */}
        <g transform={`translate(${flX}, ${flY})`}>
          {/* Forklift chassis */}
          <rect x="-14" y="-12" width="28" height="16" rx="4" fill="#0284c7" stroke="#38bdf8" strokeWidth="1.2" />
          {/* Cabin */}
          <rect x="-10" y="-22" width="16" height="12" rx="2" fill="#0f172a" stroke="#38bdf8" strokeWidth="1" />
          <rect x="-8" y="-20" width="12" height="8" rx="1" fill="#38bdf8" opacity="0.6" />
          {/* Wheels */}
          <circle cx="-9" cy="4" r="4" fill="#0f172a" stroke="#64748b" strokeWidth="1.5" />
          <circle cx="9" cy="4" r="4" fill="#0f172a" stroke="#64748b" strokeWidth="1.5" />
          {/* Headlight beam */}
          <polygon
            points="14,-5 36,-12 36,4"
            fill="url(#laserBeam)"
            opacity="0.5"
            transform="rotate(10)"
          />

          {/* Fork mechanism & Moving Boxes (Cajas) */}
          <g transform={`translate(14, ${-2 - forkLiftHeight})`}>
            {/* Fork prongs */}
            <path d="M 0 -10 L 0 6 L 14 6" fill="none" stroke="#64748b" strokeWidth="2" />
            {/* Box 1 */}
            <rect x="2" y="-5" width="10" height="9" rx="1.5" fill="#f59e0b" stroke="#b45309" strokeWidth="1" />
            <line x1="2" y1="-0.5" x2="12" y2="-0.5" stroke="#fbbf24" strokeWidth="0.8" />
            {/* Box 2 on top */}
            <rect x="3" y="-14" width="8" height="8" rx="1.5" fill="#0d9488" stroke="#115e59" strokeWidth="1" />
            <line x1="3" y1="-10" x2="11" y2="-10" stroke="#2dd4bf" strokeWidth="0.8" />
          </g>
        </g>

        {/* 8. MOVING AUTONOMOUS CARS (Los carros en movimiento) */}
        {/* Car 1: lower platform track */}
        <g transform={`translate(${carX}, ${carY})`}>
          {/* Shadow */}
          <ellipse cx="0" cy="5" rx="15" ry="4" fill="#000000" opacity="0.25" />
          {/* Car body - sleek aerodynamic */}
          <path
            d="M -14 0 Q -10 -8 0 -8 Q 12 -8 15 0 Q 14 6 -2 6 Q -12 6 -14 0 Z"
            fill="#1e293b"
            stroke="#06b6d4"
            strokeWidth="1"
          />
          {/* Cyan cockpit glass */}
          <path d="M -6 -1 Q -3 -6 3 -6 Q 8 -6 9 -1 Z" fill="#38bdf8" opacity="0.8" />
          {/* Headlights */}
          <circle cx="14" cy="1" r="1.5" fill="#ffffff" filter="url(#glowFilter)" />
          {/* Tail light */}
          <circle cx="-13" cy="1" r="1" fill="#ef4444" />
        </g>

        {/* Car 2: background lane */}
        <g transform={`translate(${car2X}, ${car2Y}) scale(0.75)`}>
          <ellipse cx="0" cy="4" rx="13" ry="3.5" fill="#000000" opacity="0.2" />
          <path
            d="M -13 0 Q -9 -7 0 -7 Q 10 -7 13 0 Q 12 5 -2 5 Q -10 5 -13 0 Z"
            fill="#334155"
            stroke="#38bdf8"
            strokeWidth="0.9"
          />
          <path d="M -5 -1 Q -2 -5 3 -5 Q 7 -5 8 -1 Z" fill="#67e8f9" opacity="0.75" />
          <circle cx="12" cy="1" r="1.3" fill="#ffffff" filter="url(#glowFilter)" />
        </g>

        {/* 9. FLYING DRONE CARRYING BOXES (El dron que vuela con hélices y paquetes) */}
        <g transform="translate(265, 345)">
          {/* Smooth hovering animation on drone */}
          <g
            style={{
              animation: 'gentleFloat 3.2s ease-in-out infinite',
            }}
          >
            {/* Drone shadow on floor below */}
            <ellipse cx="0" cy="48" rx="16" ry="4" fill="#000000" opacity="0.2" />

            {/* Drone body center */}
            <ellipse cx="0" cy="0" rx="9" ry="5.5" fill="#0f172a" stroke="#0ea5e9" strokeWidth="1.2" />
            <circle cx="0" cy="-1" r="2.5" fill="#38bdf8" filter="url(#glowFilter)" />

            {/* 4 Rotor Arms */}
            <line x1="-8" y1="-3" x2="-18" y2="-8" stroke="#475569" strokeWidth="2" />
            <line x1="8" y1="-3" x2="18" y2="-8" stroke="#475569" strokeWidth="2" />
            <line x1="-8" y1="3" x2="-18" y2="7" stroke="#475569" strokeWidth="2" />
            <line x1="8" y1="3" x2="18" y2="7" stroke="#475569" strokeWidth="2" />

            {/* Spinning Rotor Blades (4 rotores girando a alta velocidad) */}
            {/* Rotor 1 */}
            <g transform="translate(-18, -8)">
              <ellipse cx="0" cy="0" rx="9" ry="2" fill="#38bdf8" opacity="0.4" className="animate-spin" style={{ animationDuration: '0.12s' }} />
              <circle cx="0" cy="0" r="1.8" fill="#0284c7" />
            </g>
            {/* Rotor 2 */}
            <g transform="translate(18, -8)">
              <ellipse cx="0" cy="0" rx="9" ry="2" fill="#38bdf8" opacity="0.4" className="animate-spin" style={{ animationDuration: '0.12s' }} />
              <circle cx="0" cy="0" r="1.8" fill="#0284c7" />
            </g>
            {/* Rotor 3 */}
            <g transform="translate(-18, 7)">
              <ellipse cx="0" cy="0" rx="9" ry="2" fill="#38bdf8" opacity="0.4" className="animate-spin" style={{ animationDuration: '0.12s' }} />
              <circle cx="0" cy="0" r="1.8" fill="#0284c7" />
            </g>
            {/* Rotor 4 */}
            <g transform="translate(18, 7)">
              <ellipse cx="0" cy="0" rx="9" ry="2" fill="#38bdf8" opacity="0.4" className="animate-spin" style={{ animationDuration: '0.12s' }} />
              <circle cx="0" cy="0" r="1.8" fill="#0284c7" />
            </g>

            {/* Navigation strobe lights */}
            <circle cx="-7" cy="0" r="1" fill="#ef4444" className="animate-ping" />
            <circle cx="7" cy="0" r="1" fill="#22c55e" className="animate-ping" />

            {/* Suspension cable holding boxes */}
            <line x1="-3" y1="4" x2="-3" y2="15" stroke="#94a3b8" strokeWidth="1" />
            <line x1="3" y1="4" x2="3" y2="15" stroke="#94a3b8" strokeWidth="1" />

            {/* Drone Cargo Box 1 (Caja colgante) */}
            <g transform="translate(-7, 15)">
              <rect x="0" y="0" width="14" height="11" rx="1.5" fill="#f59e0b" stroke="#d97706" strokeWidth="1" />
              {/* Box strapping tape */}
              <line x1="7" y1="0" x2="7" y2="11" stroke="#fbbf24" strokeWidth="1.2" />
              <line x1="0" y1="5.5" x2="14" y2="5.5" stroke="#fbbf24" strokeWidth="1.2" />
            </g>

            {/* Drone Cargo Box 2 attached */}
            <g transform="translate(8, 17) scale(0.85)">
              <rect x="0" y="0" width="12" height="10" rx="1.5" fill="#0284c7" stroke="#0369a1" strokeWidth="1" />
              <line x1="6" y1="0" x2="6" y2="10" stroke="#38bdf8" strokeWidth="1.2" />
            </g>
          </g>
        </g>

        {/* 10. SCANNING LASER BEAM (Barrido interactivo) */}
        <rect
          x="0"
          y="0"
          width="468"
          height="70"
          fill="url(#laserBeam)"
          className="animate-laser pointer-events-none"
        />
      </svg>
    </div>
  );
};
