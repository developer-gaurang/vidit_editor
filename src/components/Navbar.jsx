import React from 'react';
import { motion } from 'framer-motion';

export default function Navbar({ activeView, setActiveView, theme, soundEnabled, toggleSound }) {
  const menuItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'Profile' },
    { id: 'portfolio', label: 'Showcase' },
    { id: 'timeline', label: 'Timeline' },
    { id: 'services', label: 'Services' },
    { id: 'contact', label: 'Inquire' }
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      style={{
        position: 'sticky',
        top: 20,
        zIndex: 8500,
        width: '90%',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '12px 24px',
        background: 'rgba(15, 15, 25, 0.4)',
        border: '1px solid var(--border-muted)',
        borderRadius: '30px',
        backdropFilter: 'blur(15px)',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      {/* Logo */}
      <motion.div 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setActiveView('home')}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          cursor: 'pointer'
        }}
      >
        <svg width="35" height="35" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="15" y="15" width="8" height="8" rx="2" fill="var(--color-primary)" />
          <rect x="77" y="15" width="8" height="8" rx="2" fill="var(--color-primary)" />
          <rect x="15" y="77" width="8" height="8" rx="2" fill="var(--color-primary)" />
          <rect x="77" y="77" width="8" height="8" rx="2" fill="var(--color-primary)" />
          
          <path d="M30 35 L45 65 L60 35" stroke="#fff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M52 35 L52 65 M52 50 L68 35 M52 50 L68 65" stroke="var(--color-secondary)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

        <div style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          fontSize: '20px',
          letterSpacing: '1px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}>
          <span style={{ color: '#fff' }}>VIDIT</span>
          <span style={{ color: 'var(--color-secondary)', textShadow: '0 0 10px var(--color-secondary)' }}>.EDITS</span>
        </div>
      </motion.div>

      {/* Navigation Links */}
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        {menuItems.map((item) => {
          const isActive = activeView === item.id;
          return (
            <motion.button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              whileHover={{ scale: 1.05, background: 'rgba(0, 240, 255, 0.1)' }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: isActive ? 'var(--color-primary)' : 'transparent',
                color: isActive ? '#000' : 'var(--text-secondary)',
                border: 'none',
                borderRadius: '20px',
                padding: '8px 16px',
                fontFamily: 'var(--font-mono)',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                boxShadow: isActive ? '0 0 15px rgba(0, 240, 255, 0.4)' : 'none',
              }}
            >
              {item.label}
            </motion.button>
          );
        })}
      </div>

      {/* Utilities */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        {/* Sound Toggle */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleSound}
          style={{
            background: soundEnabled ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
            border: `1px solid ${soundEnabled ? 'var(--color-success)' : 'var(--color-accent)'}`,
            color: soundEnabled ? 'var(--color-success)' : 'var(--color-accent)',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontSize: '16px',
            boxShadow: `0 0 10px ${soundEnabled ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)'}`
          }}
          title={soundEnabled ? "Mute Audio" : "Enable Audio"}
        >
          {soundEnabled ? '🔊' : '🔇'}
        </motion.button>
      </div>
    </motion.nav>
  );
}
