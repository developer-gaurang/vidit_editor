import React from 'react';
import { motion } from 'framer-motion';

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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
};

export default function Services() {
  return (
    <section style={{
      padding: '100px 20px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Ambient background glow */}
      <div style={{
        position: 'absolute',
        top: '50%',
        right: '-10%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, var(--color-secondary) 0%, transparent 70%)',
        opacity: 0.08,
        filter: 'blur(60px)',
        zIndex: 0
      }}></div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        style={{ width: '100%', padding: '0 5vw', margin: '0 auto', position: 'relative', zIndex: 1 }}
      >
        
        {/* Title */}
        <motion.div variants={itemVariants} style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '48px',
            marginBottom: '15px',
            background: 'linear-gradient(135deg, #fff 0%, var(--color-primary) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 0 30px rgba(0, 240, 255, 0.4)'
          }}>
            POST-PRODUCTION TOOLKIT
          </h2>
          <p style={{ color: 'var(--text-secondary)', margin: '0 auto', fontSize: '16px' }}>
            A comprehensive suite of video capabilities tailored to make your digital content compete at a studio-broadcast level.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '30px',
        }}>
          {servicesList.map((service, index) => (
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              key={index}
              style={{
                background: 'rgba(15, 15, 25, 0.5)',
                border: '1px solid var(--border-muted)',
                borderRadius: '16px',
                padding: '40px 30px',
                position: 'relative',
                overflow: 'hidden',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.2)',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-primary)';
                e.currentTarget.style.boxShadow = '0 0 30px rgba(0, 240, 255, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-muted)';
                e.currentTarget.style.boxShadow = '0 8px 32px 0 rgba(0, 0, 0, 0.2)';
              }}
            >
              {/* Icon Container */}
              <motion.div 
                whileHover={{ rotate: 5, scale: 1.1 }}
                style={{
                  background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.1), rgba(176, 38, 255, 0.1))',
                  border: '1px solid rgba(0, 240, 255, 0.3)',
                  borderRadius: '12px',
                  width: '70px',
                  height: '70px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '25px',
                  color: '#fff',
                  boxShadow: '0 0 15px rgba(0, 240, 255, 0.15)',
                }}>
                {service.icon}
              </motion.div>

              {/* Toolbar Tool Label */}
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                color: 'var(--color-primary)',
                fontWeight: 'bold',
                marginBottom: '10px',
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
              }}>
                {service.toolName}
              </div>

              {/* Service Title */}
              <h4 style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '22px',
                fontWeight: '700',
                color: '#fff',
                marginBottom: '15px',
              }}>
                {service.title}
              </h4>

              {/* Description */}
              <p style={{
                color: 'var(--text-secondary)',
                fontSize: '15px',
                lineHeight: '1.7',
                fontWeight: '400',
              }}>
                {service.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </motion.div>
    </section>
  );
}
