import React, { useState, useEffect } from 'react';
import CustomCursor from './components/CustomCursor';
import { isSoundEnabled, setSoundEnabled, playTick, playClick, playCut, playChime } from './utils/audioEffects';
import Preloader from './components/Preloader';
import InteractiveNleWorkspace from './components/InteractiveNleWorkspace';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutVidit from './components/AboutVidit';
import PortfolioGrid from './components/PortfolioGrid';
import EditingTimeline from './components/EditingTimeline';
import Services from './components/Services';
import ContactForm from './components/ContactForm';
import AdminPanel from './components/AdminPanel';

export default function App() {
  const [theme, setTheme] = useState('dark'); // permanently dark mode
  const [isLoading, setIsLoading] = useState(true);
  const [activeView, setActiveView] = useState('home');
  const [activeTool, setActiveTool] = useState('select'); // select (V), razor (C), pen (P), hand (H), text (T)
  const [soundEnabled, setSoundEnabledState] = useState(isSoundEnabled);

  const toggleSound = () => {
    const newVal = !soundEnabled;
    setSoundEnabled(newVal);
    setSoundEnabledState(newVal);
    if (newVal) {
      playTick();
    }
  };

  const handlePreloaderComplete = () => {
    setIsLoading(false);
    playChime();
  };
  
  // Right master VU mixer bouncing state
  const [vuLevels, setVuLevels] = useState({ left: 10, right: 9 });

  useEffect(() => {
    let interval;
    if (!isLoading) {
      interval = setInterval(() => {
        setVuLevels({
          left: Math.floor(Math.random() * 12) + 2,
          right: Math.floor(Math.random() * 11) + 2
        });
      }, 90);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  const handleNavigate = (viewId) => {
    playTick();
    if (viewId === 'admin') {
      setActiveView('admin');
      window.scrollTo({ top: 0 });
    } else {
      setActiveView('home'); // Ensure we are on the main portfolio page layout
      setTimeout(() => {
        const element = document.getElementById(viewId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 50);
    }
  };

  return (
    <div 
      className={`theme-${theme}`} 
      style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column', 
        backgroundColor: 'var(--bg-deep)', 
        color: 'var(--text-primary)',
        transition: 'background-color 0.3s ease, color 0.3s ease'
      }}
    >
      {/* Cinematic Loading Preloader */}
      {isLoading && (
        <Preloader onComplete={handlePreloaderComplete} />
      )}

      {/* Full-Screen Interactive NLE Tool Overlay (Captures Pen, Razor, Hand, and Type actions) */}
      {!isLoading && (
        <InteractiveNleWorkspace activeTool={activeTool} />
      )}

      {/* Custom Scrubber Cursor */}
      <CustomCursor activeTool={activeTool} />

      {/* Premiere Pro-themed Navigation Bar */}
      <Navbar 
        activeView={activeView === 'admin' ? 'admin' : activeView} 
        setActiveView={handleNavigate} 
        theme={theme} 
        soundEnabled={soundEnabled}
        toggleSound={toggleSound}
      />

      {/* Desktop Sticky NLE Toolbox (Left) */}
      {activeView !== 'admin' && !isLoading && (
        <div className="nle-toolbox">
          <button 
            title="Selection Tool (V)" 
            className={`nle-tool-btn ${activeTool === 'select' ? 'active' : ''}`}
            onClick={() => {
              setActiveTool('select');
              playClick();
            }}
          >
            ➔
          </button>
          <button 
            title="Razor Tool (C)" 
            className={`nle-tool-btn ${activeTool === 'razor' ? 'active' : ''}`}
            onClick={() => {
              setActiveTool('razor');
              playCut();
            }}
          >
            ✂️
          </button>
          <button 
            title="Pen Tool (P)" 
            className={`nle-tool-btn ${activeTool === 'pen' ? 'active' : ''}`}
            onClick={() => {
              setActiveTool('pen');
              playClick();
            }}
          >
            ✒️
          </button>
          <button 
            title="Hand Tool (H)" 
            className={`nle-tool-btn ${activeTool === 'hand' ? 'active' : ''}`}
            onClick={() => {
              setActiveTool('hand');
              playClick();
            }}
          >
            ✋
          </button>
          <button 
            title="Type Tool (T)" 
            className={`nle-tool-btn ${activeTool === 'text' ? 'active' : ''}`}
            onClick={() => {
              setActiveTool('text');
              playClick();
            }}
          >
            T
          </button>
        </div>
      )}

      {/* Desktop Sticky Master Volume VU Levels (Right) */}
      {activeView !== 'admin' && !isLoading && (
        <div className="nle-master-vu">
          <div style={{ display: 'flex', gap: '3px', flex: 1 }}>
            {/* Left Track VU */}
            <div className="vu-meter" style={{ height: '220px' }}>
              {Array(15).fill(false).map((_, i) => {
                const reverseIdx = 14 - i;
                const active = reverseIdx < vuLevels.left;
                let colorClass = '';
                if (reverseIdx >= 12) colorClass = 'red';
                else if (reverseIdx >= 9) colorClass = 'yellow';
                return <div key={i} className={`vu-bar ${colorClass} ${active ? 'active' : ''}`} />;
              })}
            </div>
            {/* Right Track VU */}
            <div className="vu-meter" style={{ height: '220px' }}>
              {Array(15).fill(false).map((_, i) => {
                const reverseIdx = 14 - i;
                const active = reverseIdx < vuLevels.right;
                let colorClass = '';
                if (reverseIdx >= 12) colorClass = 'red';
                else if (reverseIdx >= 9) colorClass = 'yellow';
                return <div key={i} className={`vu-bar ${colorClass} ${active ? 'active' : ''}`} />;
              })}
            </div>
          </div>
          <span className="nle-vu-db-text">MASTER</span>
        </div>
      )}

      {/* Main Content Router */}
      <main style={{ 
        flex: 1, 
        paddingLeft: activeView !== 'admin' ? 'clamp(0px, 6vw, 90px)' : '0px', 
        paddingRight: activeView !== 'admin' ? 'clamp(0px, 6vw, 85px)' : '0px',
        transition: 'all 0.25s ease'
      }}>
        {activeView === 'admin' ? (
          <AdminPanel />
        ) : (
          <>
            {/* Home Section */}
            <div id="home">
              <Hero setActiveView={handleNavigate} />
            </div>

            {/* About Vidit Section */}
            <div id="about" style={{ width: '100%', margin: '80px 0', position: 'relative', zIndex: 10 }}>
              <AboutVidit />
            </div>

            {/* Showcase / Portfolio Section */}
            <div id="portfolio" style={{ width: '100%', margin: '80px 0', position: 'relative', zIndex: 10 }}>
              <PortfolioGrid />
            </div>

            {/* Editor Timeline Section */}
            <div id="timeline" style={{ width: '100%', margin: '80px 0', position: 'relative', zIndex: 10 }}>
              <EditingTimeline />
            </div>

            {/* Services Section */}
            <div id="services" style={{ width: '100%', margin: '80px 0', position: 'relative', zIndex: 10 }}>
              <Services />
            </div>

            {/* Inquiry / Contact Form Section */}
            <div id="contact" style={{ width: '100%', margin: '80px 0', position: 'relative', zIndex: 10 }}>
              <ContactForm />
            </div>
          </>
        )}
      </main>

      {/* Premiere Pro-themed bottom Application tray */}
      {activeView !== 'admin' && !isLoading && (
        <div style={{
          backgroundColor: theme === 'light' ? '#eae9e4' : '#171721',
          borderTop: '2px solid var(--text-primary)',
          borderBottom: '2.5px solid var(--text-primary)',
          padding: '6px 25px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '11px',
          fontFamily: 'var(--font-mono)',
          fontWeight: 'bold',
          color: 'var(--text-primary)',
          userSelect: 'none',
          transition: 'background-color 0.3s ease, color 0.3s ease',
          position: 'relative',
          zIndex: 8500
        }}>
          <div style={{ display: 'flex', gap: '20px' }}>
            <span>DISK SPACE: 1.2TB / 4.0TB FREE</span>
            <span>RAM PREVIEW CACHE: 94.2 GB (92%)</span>
          </div>
          <div style={{ display: 'flex', gap: '25px', alignItems: 'center' }}>
            <span>RENDER PRESET: UHD 4K ProRes 422HQ</span>
            <span style={{ color: 'var(--color-success)' }}>● ENGINE RUNNING</span>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer style={{
        backgroundColor: '#0f172a',
        borderTop: '2.5px solid var(--text-primary)',
        padding: '50px 20px',
        textAlign: 'center',
        fontSize: '13px',
        color: '#f8fafc',
        fontFamily: 'var(--font-mono)',
        position: 'relative',
        zIndex: 8500
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px',
        }}>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontWeight: 'bold', fontSize: '14px', marginBottom: '5px' }}>
              © {new Date().getFullYear()} VIDIT KESARWANI. ALL RIGHT CUTS RESERVED.
            </div>
            <div style={{ fontSize: '12px', color: '#94a3b8' }}>
              Made with ⚡ by <span style={{ color: 'var(--color-secondary)', fontWeight: 'bold' }}>Gaurang Verma</span> | Belonging to{' '}
              <a 
                href="https://oryendynamics.com" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ 
                  color: 'var(--color-primary)', 
                  fontWeight: 'bold', 
                  textDecoration: 'underline',
                  cursor: 'pointer'
                }}
              >
                Oryen Dynamics
              </a>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '20px' }}>
            <span style={{ color: 'var(--color-primary)', cursor: 'pointer' }} onClick={() => handleNavigate('home')}>01. TOP</span>
            <span style={{ color: 'var(--color-secondary)', cursor: 'pointer' }} onClick={() => handleNavigate('about')}>02. BIO</span>
            <span style={{ color: 'var(--color-primary)', cursor: 'pointer' }} onClick={() => handleNavigate('portfolio')}>03. BIN</span>
            <span style={{ color: 'var(--color-secondary)', cursor: 'pointer' }} onClick={() => handleNavigate('admin')}>06. ADMIN</span>
          </div>
          
          <div style={{
            fontSize: '11px',
            backgroundColor: '#1e293b',
            padding: '6px 12px',
            border: '2px solid var(--text-primary)',
            borderRadius: '6px',
            color: '#fff',
            boxShadow: '2px 2px 0px var(--text-primary)',
          }}>
            EXPORT STATUS: 4K RENDERED
          </div>
        </div>
      </footer>
    </div>
  );
}
