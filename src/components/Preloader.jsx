import React, { useState, useEffect } from 'react';

const statuses = [
  'Reading Flat LOG Camera Profiles...',
  'Importing raw 4K sequence bins...',
  'Caching DaVinci Resolve color nodes...',
  'Conforming audio waveforms & Foley...',
  'Applying After Effects motion tracking...',
  'Rendering final cuts to timeline...',
  'Export complete. Launching sequence...'
];

const appIcons = [
  { name: 'Pr', color: '#16003b', text: '#b9a0ff', desc: 'Premiere' },
  { name: 'Dr', color: '#111827', text: '#38bdf8', desc: 'Resolve' },
  { name: 'Ae', color: '#1d003b', text: '#eb93ff', desc: 'AfterEffects' },
  { name: 'Ps', color: '#001e36', text: '#00a8ff', desc: 'Photoshop' }
];

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [statusIdx, setStatusIdx] = useState(0);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    // Update progress bar
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            setFade(true);
            setTimeout(onComplete, 800); // Allow fade animation to complete
          }, 400);
          return 100;
        }
        
        // Random incremental steps
        const step = Math.floor(Math.random() * 8) + 4;
        return Math.min(100, prev + step);
      });
    }, 150);

    // Update status text cycle
    const statusInterval = setInterval(() => {
      setStatusIdx((prev) => (prev + 1) % statuses.length);
    }, 450);

    return () => {
      clearInterval(progressInterval);
      clearInterval(statusInterval);
    };
  }, [onComplete]);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'var(--bg-deep)',
      zIndex: 99999,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      transition: 'opacity 0.8s cubic-bezier(0.25, 1, 0.5, 1)',
      opacity: fade ? 0 : 1,
      pointerEvents: fade ? 'none' : 'auto',
      fontFamily: 'var(--font-sans)',
      backgroundImage: 'linear-gradient(rgba(30, 27, 75, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(30, 27, 75, 0.02) 1px, transparent 1px)',
      backgroundSize: '30px 30px',
    }}>
      
      {/* 1. GEOMETRIC SVG VK LOGO */}
      <div style={{
        marginBottom: '40px',
        animation: 'preloaderLogoPulse 2s infinite alternate',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}>
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{
          filter: 'drop-shadow(3px 3px 0px var(--text-primary))',
        }}>
          {/* Outer Film Frame */}
          <rect x="5" y="5" width="90" height="90" rx="16" fill="none" stroke="var(--text-primary)" strokeWidth="6" />
          
          {/* Film perforations */}
          <rect x="15" y="15" width="8" height="8" rx="2" fill="var(--color-primary)" stroke="var(--text-primary)" strokeWidth="2" />
          <rect x="77" y="15" width="8" height="8" rx="2" fill="var(--color-primary)" stroke="var(--text-primary)" strokeWidth="2" />
          <rect x="15" y="77" width="8" height="8" rx="2" fill="var(--color-primary)" stroke="var(--text-primary)" strokeWidth="2" />
          <rect x="77" y="77" width="8" height="8" rx="2" fill="var(--color-primary)" stroke="var(--text-primary)" strokeWidth="2" />
          
          {/* Intersecting V and K */}
          <path d="M30 35 L45 65 L60 35" stroke="var(--text-primary)" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M52 35 L52 65 M52 50 L68 35 M52 50 L68 65" stroke="var(--color-secondary)" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
          
          {/* Center Playhead Needle */}
          <polygon points="50,47 50,55 56,51" fill="var(--color-success)" stroke="var(--text-primary)" strokeWidth="1.5" />
        </svg>

        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '24px',
          fontWeight: '800',
          color: 'var(--text-primary)',
          letterSpacing: '2px',
          marginTop: '20px',
          textTransform: 'uppercase',
        }}>
          VIDIT KESARWANI
        </h2>
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          fontWeight: 'bold',
          color: 'var(--text-secondary)',
          letterSpacing: '1px',
        }}>
          POST-PRODUCTION ENGINE v4.0
        </span>
      </div>

      {/* 2. PROGRESS CARD */}
      <div style={{
        width: '90%',
        maxWidth: '450px',
        backgroundColor: 'var(--bg-panel)',
        border: '3px solid var(--text-primary)',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '6px 6px 0px var(--text-primary)',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}>
        {/* Progress percent count */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontFamily: 'var(--font-mono)',
          fontSize: '13px',
          fontWeight: 'bold',
          color: 'var(--text-primary)',
        }}>
          <span>STATUS: EXPORTING SEQUENCE</span>
          <span style={{ color: 'var(--color-primary)' }}>{progress}%</span>
        </div>

        {/* Loading Progress Bar */}
        <div style={{
          width: '100%',
          height: '14px',
          backgroundColor: 'var(--bg-surface)',
          border: '2.5px solid var(--text-primary)',
          borderRadius: '8px',
          overflow: 'hidden',
          position: 'relative',
        }}>
          <div style={{
            width: `${progress}%`,
            height: '100%',
            backgroundColor: 'var(--color-primary)',
            backgroundImage: 'linear-gradient(45deg, rgba(255,255,255,0.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.15) 75%, transparent 75%, transparent)',
            backgroundSize: '15px 15px',
            transition: 'width 0.2s ease',
          }}></div>
        </div>

        {/* Caching/Loading status logs */}
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '12px',
          color: 'var(--text-secondary)',
          fontWeight: '600',
          textAlign: 'center',
          height: '18px',
        }}>
          {statuses[statusIdx]}
        </div>
      </div>

      {/* 3. FLASHING EDITING SOFTWARE APP TILES */}
      <div style={{
        marginTop: '35px',
        display: 'flex',
        gap: '15px',
        alignItems: 'center',
      }}>
        {appIcons.map((app, idx) => {
          // Highlight active icons based on load progress
          const isActive = progress >= (idx + 1) * 20;
          return (
            <div
              key={idx}
              style={{
                width: '45px',
                height: '45px',
                backgroundColor: isActive ? app.color : 'var(--bg-panel)',
                color: isActive ? app.text : 'var(--text-muted)',
                border: '2px solid var(--text-primary)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-mono)',
                fontSize: '16px',
                fontWeight: 'bold',
                boxShadow: isActive ? '2px 2px 0px var(--text-primary)' : 'none',
                transform: isActive ? 'translateY(-2px)' : 'none',
                transition: 'all 0.25s ease',
              }}
            >
              {app.name}
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes preloaderLogoPulse {
          0% { transform: scale(0.96); }
          100% { transform: scale(1.02); }
        }
      `}</style>

    </div>
  );
}
