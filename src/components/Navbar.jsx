import React from 'react';

export default function Navbar({ activeView, setActiveView, theme, soundEnabled, toggleSound }) {
  const menuItems = [
    { id: 'home', label: '01. Home' },
    { id: 'about', label: '02. Profile' },
    { id: 'portfolio', label: '03. Showcase' },
    { id: 'timeline', label: '04. Timeline' },
    { id: 'services', label: '05. Services' },
    { id: 'contact', label: '06. Inquire' },
    { id: 'admin', label: '07. Admin' }
  ];

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 8500,
      backgroundColor: 'var(--bg-panel)',
      borderBottom: '2.5px solid var(--text-primary)',
      width: '100%',
      transition: 'background-color 0.3s ease, border-color 0.3s ease'
    }}>
      {/* Simulation of Premiere Pro / After Effects Application Menu (Light Mode) */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '6px 20px',
        backgroundColor: theme === 'light' ? '#eae9e4' : '#171721',
        borderBottom: '1.5px solid var(--text-primary)',
        fontSize: '11px',
        fontFamily: 'var(--font-mono)',
        color: 'var(--text-primary)',
        fontWeight: '500',
        transition: 'background-color 0.3s ease, color 0.3s ease'
      }}>
        <div style={{ display: 'flex', gap: '15px' }}>
          <span style={{ cursor: 'pointer' }}>File</span>
          <span style={{ cursor: 'pointer' }}>Edit</span>
          <span style={{ cursor: 'pointer' }}>Clip</span>
          <span style={{ cursor: 'pointer' }}>Sequence</span>
          <span style={{ cursor: 'pointer' }}>Marker</span>
          <span style={{ cursor: 'pointer' }}>Graphics</span>
          <span style={{ cursor: 'pointer' }}>View</span>
          <span style={{ color: 'var(--color-primary)', fontWeight: 'bold' }}>
            Vidit_Kesarwani_Portfolio_{theme.toUpperCase()}.prproj
          </span>
        </div>
        
        {/* Toggle Mode and status indicators */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>


          {/* Sound switcher trigger */}
          <button
            onClick={toggleSound}
            style={{
              backgroundColor: 'var(--bg-panel)',
              color: 'var(--text-primary)',
              border: '1.5px solid var(--text-primary)',
              borderRadius: '4px',
              padding: '3px 10px',
              fontSize: '10px',
              fontFamily: 'var(--font-mono)',
              fontWeight: 'bold',
              boxShadow: '1.5px 1.5px 0px var(--text-primary)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            {soundEnabled ? '🔊 SFX: ON' : '🔇 SFX: MUTED'}
          </button>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-success)',
            }}></div>
            <span>QUEUE: ONLINE</span>
          </div>
        </div>
      </div>

      {/* Main Navigation tabs */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 40px',
        maxWidth: '1400px',
        margin: '0 auto',
        flexWrap: 'wrap',
        gap: '15px'
      }}>
        {/* Logo/Identity with Intersecting V/K Film SVG logo */}
        <div 
          onClick={() => setActiveView('home')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            cursor: 'pointer'
          }}
        >
          <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{
            filter: 'drop-shadow(1.5px 1.5px 0px var(--text-primary))',
          }}>
            {/* Film border */}
            <rect x="5" y="5" width="90" height="90" rx="16" fill="none" stroke="var(--text-primary)" strokeWidth="8" />
            <rect x="15" y="15" width="8" height="8" rx="2" fill="var(--color-primary)" stroke="var(--text-primary)" strokeWidth="2.5" />
            <rect x="77" y="15" width="8" height="8" rx="2" fill="var(--color-primary)" stroke="var(--text-primary)" strokeWidth="2.5" />
            <rect x="15" y="77" width="8" height="8" rx="2" fill="var(--color-primary)" stroke="var(--text-primary)" strokeWidth="2.5" />
            <rect x="77" y="77" width="8" height="8" rx="2" fill="var(--color-primary)" stroke="var(--text-primary)" strokeWidth="2.5" />
            
            {/* Initials V / K */}
            <path d="M30 35 L45 65 L60 35" stroke="var(--text-primary)" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M52 35 L52 65 M52 50 L68 35 M52 50 L68 65" stroke="var(--color-secondary)" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
          </svg>

          <div style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: '22px',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <span style={{ color: 'var(--text-primary)' }}>VIDIT</span>
            <span style={{ color: 'var(--color-secondary)' }}>.EDITS</span>
          </div>

          <div style={{
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            border: '2px solid var(--color-accent)',
            borderRadius: '6px',
            padding: '2px 8px',
            fontSize: '10px',
            fontFamily: 'var(--font-mono)',
            color: 'var(--color-accent)',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontWeight: 'bold',
            boxShadow: '1.5px 1.5px 0px var(--text-primary)'
          }}>
            <div style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-accent)',
              animation: 'blink 1s infinite alternate'
            }}></div>
            LIVE
          </div>
        </div>

        {/* Links */}
        <div className="nav-links-container">
          {menuItems.map((item) => {
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                style={{
                  background: isActive ? 'var(--bg-surface)' : 'transparent',
                  color: isActive ? 'var(--color-primary)' : 'var(--text-primary)',
                  border: '2px solid transparent',
                  borderBottom: isActive ? '2.5px solid var(--color-primary)' : '2px solid transparent',
                  padding: '8px 16px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '13px',
                  transition: 'all 0.2s ease',
                  borderRadius: '6px 6px 0 0',
                  fontWeight: isActive ? 'bold' : '600',
                  flexShrink: 0
                }}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
