import React from 'react';

const servicesList = [
  {
    title: 'Cinematic Narrative Editing',
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="8" y1="13" x2="16" y2="13" stroke="var(--color-primary)" strokeWidth="2.5" />
        <line x1="8" y1="17" x2="14" y2="17" stroke="var(--color-primary)" strokeWidth="2.5" />
      </svg>
    ),
    toolName: 'Razor Blade / Edit Tool [C]',
    desc: 'Pacing is everything. I edit long-form documentaries, corporate presentations, and engaging travel vlogs with precise narrative flow. Keeping retention rates high and structures tight.'
  },
  {
    title: 'Color Correction & Grading',
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10" />
        <path d="M12 2a15.3 15.3 0 0 0-4 10 15.3 15.3 0 0 0 4 10" stroke="var(--color-secondary)" strokeWidth="2.5" />
        <line x1="2" y1="12" x2="22" y2="12" />
      </svg>
    ),
    toolName: 'Color Lift/Gamma/Gain [G]',
    desc: 'Taking flat LOG camera footage and transforming it. Balancing exposure, neutralizing skin tones, matching multi-cam shoots, and applying custom stylistic color grades (Teal/Orange, film emulation).'
  },
  {
    title: 'Sound Design & Audio Polish',
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="2" x2="12" y2="22" stroke="var(--color-primary)" strokeWidth="3" />
        <line x1="17" y1="5" x2="17" y2="19" />
        <line x1="22" y1="9" x2="22" y2="15" />
        <line x1="7" y1="5" x2="7" y2="19" />
        <line x1="2" y1="9" x2="2" y2="15" />
      </svg>
    ),
    toolName: 'Audio Waveform & EQ [A]',
    desc: 'Sound is 50% of the video. I clean up muddy voiceovers, remove room echoes/noise, splice immersive sound effects (whooshes, risers, hits), and execute dynamic background score mixing.'
  },
  {
    title: 'Kinetic Motion Graphics & VFX',
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <rect x="7" y="7" width="4" height="4" fill="var(--color-secondary)" />
        <rect x="13" y="13" width="4" height="4" fill="var(--color-primary)" />
        <path d="M10 9h3v3" stroke="var(--color-primary)" strokeWidth="2" />
      </svg>
    ),
    toolName: 'Keyframes / Motion Tracking [M]',
    desc: 'Creating custom lower-thirds, modern kinetic caption overlays, dynamic charts/viz, transition zooms, and executing screen replacements or object removals.'
  }
];

export default function Services() {
  return (
    <section style={{
      padding: '80px 20px',
      backgroundColor: 'var(--bg-deep)',
      borderBottom: '2.5px solid var(--text-primary)',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h2 className="title-glow" style={{
            fontFamily: 'var(--font-display)',
            fontSize: '42px',
            marginBottom: '15px'
          }}>
            POST-PRODUCTION TOOLKIT
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', fontWeight: '500' }}>
            A comprehensive suite of video capabilities tailored to make your digital content compete at a studio-broadcast level.
          </p>
        </div>

        {/* Services Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '30px',
        }}>
          {servicesList.map((service, index) => (
            <div
              key={index}
              style={{
                backgroundColor: 'var(--bg-panel)',
                border: '3px solid var(--text-primary)',
                borderRadius: '12px',
                padding: '30px 25px',
                transition: 'all 0.25s ease',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '4px 4px 0px var(--text-primary)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-primary)';
                e.currentTarget.style.transform = 'translate(-4px, -4px)';
                e.currentTarget.style.boxShadow = '8px 8px 0px var(--color-primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--text-primary)';
                e.currentTarget.style.transform = 'translate(0, 0)';
                e.currentTarget.style.boxShadow = '4px 4px 0px var(--text-primary)';
              }}
            >
              {/* Scanline Corner Element */}
              <div style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '60px',
                height: '60px',
                background: 'linear-gradient(135deg, transparent 50%, rgba(37, 99, 235, 0.05) 50%)',
                pointerEvents: 'none',
              }}></div>

              {/* Icon Container */}
              <div style={{
                backgroundColor: 'var(--bg-surface)',
                border: '2px solid var(--text-primary)',
                borderRadius: '8px',
                width: '60px',
                height: '60px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '25px',
                color: 'var(--text-primary)',
                boxShadow: '2px 2px 0px var(--text-primary)',
              }}>
                {service.icon}
              </div>

              {/* Toolbar Tool Label */}
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: 'var(--text-secondary)',
                fontWeight: 'bold',
                marginBottom: '8px',
                textTransform: 'uppercase',
                letterSpacing: '1px',
              }}>
                {service.toolName}
              </div>

              {/* Service Title */}
              <h4 style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '19px',
                fontWeight: '700',
                color: 'var(--text-primary)',
                marginBottom: '12px',
              }}>
                {service.title}
              </h4>

              {/* Description */}
              <p style={{
                color: 'var(--text-secondary)',
                fontSize: '14px',
                lineHeight: '1.6',
                fontWeight: '500',
              }}>
                {service.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Visual decoration: Film strip ticker */}
        <div style={{ marginTop: '70px' }}>
          <div className="film-roll">
            <div className="film-strip">
              {[
                'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=240&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=240&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=240&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=240&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=240&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=240&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=240&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=240&auto=format&fit=crop'
              ].map((img, i) => (
                <div 
                  key={i} 
                  className="film-frame"
                  style={{ backgroundImage: `url(${img})` }}
                />
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
