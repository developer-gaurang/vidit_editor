import React, { useState, useEffect, useRef } from 'react';

export default function Hero({ setActiveView }) {
  const [scrollOffset, setScrollOffset] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const sliderContainerRef = useRef(null);

  // Monitor scroll for the dynamic fade-out and slide-down animation
  useEffect(() => {
    const handleScroll = () => {
      setScrollOffset(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSliderMove = (clientX) => {
    if (!sliderContainerRef.current) return;
    const rect = sliderContainerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e) => {
    if (e.touches[0]) {
      handleSliderMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e) => {
    if (e.buttons === 1) { // Left-click dragging
      handleSliderMove(e.clientX);
    }
  };

  // Auto animate slider at start
  useEffect(() => {
    let direction = 1;
    let count = 0;
    const interval = setInterval(() => {
      if (count > 30) {
        clearInterval(interval);
        return;
      }
      setSliderPosition((prev) => {
        if (prev >= 65) direction = -1;
        if (prev <= 35) direction = 1;
        count++;
        return prev + direction * 1.5;
      });
    }, 45);
    return () => clearInterval(interval);
  }, []);

  // Calculate scroll fade properties
  const opacity = Math.max(0, 1 - scrollOffset / 400);
  const translateY = scrollOffset * 0.4; // parallax slide-down

  return (
    <section className="grid-cinematic" style={{
      position: 'relative',
      minHeight: '135vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: '60px',
      overflow: 'hidden',
      borderBottom: '2.5px solid var(--text-primary)',
    }}>
      
      {/* 1. SCROLL FADING COLLAGE CONTAINER */}
      <div style={{
        width: '100%',
        maxWidth: '1000px',
        height: '520px',
        position: 'relative',
        margin: '20px auto 40px auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: opacity,
        transform: `translateY(${translateY}px)`,
        transition: 'opacity 0.05s ease-out, transform 0.05s ease-out',
        zIndex: 10,
        pointerEvents: opacity < 0.1 ? 'none' : 'auto',
      }}>
        
        {/* BACKGROUND ELEMENTS */}
        {/* Bold Retro Serif Text "por" */}
        <div style={{
          position: 'absolute',
          fontFamily: 'var(--font-display)',
          fontSize: '280px',
          fontWeight: '900',
          color: 'var(--color-secondary)',
          top: '20px',
          right: '25%',
          opacity: 0.9,
          zIndex: 1,
          pointerEvents: 'none',
          userSelect: 'none',
          letterSpacing: '-15px',
        }}>
          por
        </div>

        {/* Technical Grid/Ruler Line */}
        <div style={{
          position: 'absolute',
          width: '2px',
          height: '450px',
          backgroundColor: 'rgba(239, 68, 68, 0.4)',
          left: '52%',
          top: '20px',
          zIndex: 2,
        }}></div>
        
        {/* Rulers / Guides overlay */}
        <div style={{
          position: 'absolute',
          width: '350px',
          height: '2px',
          backgroundColor: 'rgba(30, 27, 75, 0.1)',
          left: '20%',
          top: '320px',
          transform: 'rotate(-15deg)',
          zIndex: 1,
        }}></div>

        {/* Stand Color Checker Stand Card (Right side) */}
        <div className="floating-slow" style={{
          position: 'absolute',
          right: '12%',
          top: '60px',
          zIndex: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          {/* Grey/Black Spheres on top of checker */}
          <div style={{ display: 'flex', gap: '20px', marginBottom: '-5px', zIndex: 5 }}>
            <div style={{ width: '35px', height: '35px', borderRadius: '50%', background: 'radial-gradient(circle at 35% 35%, #555, #111)', boxShadow: '0 4px 6px rgba(0,0,0,0.2)' }}></div>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'radial-gradient(circle at 35% 35%, #bbb, #555)', boxShadow: '0 4px 6px rgba(0,0,0,0.2)' }}></div>
          </div>
          {/* Color card */}
          <div className="collage-color-checker">
            {/* 24 square grid of calibration colors */}
            {['#3c221a', '#e0a986', '#597cb3', '#5a623f', '#7faad7', '#5db197',
              '#e68235', '#49449a', '#c34e56', '#502a5c', '#98c13f', '#e6a61a',
              '#2c3272', '#418239', '#8e1b21', '#ebca12', '#c34d89', '#138cb4',
              '#ffffff', '#c7c7c7', '#939393', '#5e5e5e', '#363636', '#000000'
            ].map((col, idx) => (
              <div key={idx} style={{ backgroundColor: col, width: '100%', height: '100%', border: '0.5px solid #000' }}></div>
            ))}
          </div>
          {/* Card Stand pole */}
          <div style={{ width: '3px', height: '150px', backgroundColor: 'var(--text-primary)', marginTop: '-1px' }}></div>
          <div style={{ width: '40px', height: '3px', backgroundColor: 'var(--text-primary)' }}></div>
        </div>

        {/* Photoshop Icon (Left side) */}
        <div className="collage-ps-icon floating-medium" style={{
          position: 'absolute',
          left: '10%',
          top: '120px',
          zIndex: 3,
        }}>
          Ps
        </div>

        {/* Figma Logo representation / Bezier curves */}
        {/* Dynamic Vector Bezier Path Overlay */}
        <svg style={{
          position: 'absolute',
          left: '8%',
          top: '200px',
          width: '350px',
          height: '250px',
          zIndex: 4,
          pointerEvents: 'none',
        }}>
          <path
            d="M 50,180 C 120,20 200,220 280,10"
            fill="none"
            stroke="url(#gradient-path)"
            strokeWidth="8"
            strokeLinecap="round"
          />
          {/* Gradient definitions */}
          <defs>
            <linearGradient id="gradient-path" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--color-primary)" />
              <stop offset="50%" stopColor="var(--color-secondary)" />
              <stop offset="100%" stopColor="var(--color-orange)" />
            </linearGradient>
          </defs>
          
          {/* Anchor Handles */}
          <line x1="50" y1="180" x2="120" y2="20" stroke="#ff3b30" strokeWidth="1.5" strokeDasharray="3,3" />
          <line x1="280" y1="10" x2="200" y2="220" stroke="#ff3b30" strokeWidth="1.5" strokeDasharray="3,3" />
          
          {/* Interactive anchor boxes */}
          <rect x="46" y="176" width="8" height="8" fill="#fff" stroke="#ff3b30" strokeWidth="1.5" />
          <rect x="276" y="6" width="8" height="8" fill="#fff" stroke="#ff3b30" strokeWidth="1.5" />
          <circle cx="120" cy="20" r="4" fill="#ff3b30" />
          <circle cx="200" cy="220" r="4" fill="#ff3b30" />
          
          {/* Blue vector cursor arrow */}
          <polygon points="120,40 120,20 135,28" fill="#00f0ff" stroke="#000" strokeWidth="1" transform="rotate(-15, 120, 20)" />
        </svg>

        {/* Color Wheel (Center Top) */}
        <div className="collage-color-wheel floating-slow" style={{
          position: 'absolute',
          left: '35%',
          top: '50px',
          zIndex: 3,
        }}>
          <div className="collage-color-wheel-center"></div>
        </div>

        {/* Stylus Drawing Pen (Floating next to camera) */}
        <div className="floating-fast" style={{
          position: 'absolute',
          left: '58%',
          top: '230px',
          width: '12px',
          height: '240px',
          background: 'linear-gradient(180deg, #18181b 0%, #3f3f46 70%, #71717a 90%, #00f0ff 100%)',
          border: '1.5px solid var(--text-primary)',
          borderRadius: '6px',
          transform: 'rotate(5deg)',
          zIndex: 6,
          boxShadow: '4px 8px 15px rgba(0,0,0,0.2)',
        }}>
          {/* Clip detailing stylus */}
          <div style={{ width: '100%', height: '4px', backgroundColor: '#e4e4e7', marginTop: '140px' }}></div>
          <div style={{ width: '100%', height: '8px', backgroundColor: '#a1a1aa', marginTop: '10px' }}></div>
        </div>

        {/* Camera Lens Helios 44-2 (Center Bottom) */}
        <div className="collage-lens floating-medium" style={{
          position: 'absolute',
          left: '30%',
          bottom: '20px',
          zIndex: 5,
          border: '12px solid var(--text-primary)',
          boxShadow: '10px 15px 30px rgba(0,0,0,0.3)',
        }}>
          <div className="collage-lens-reflection"></div>
          <div className="collage-lens-reflection2"></div>
          {/* Lens text prints */}
          <div style={{
            color: 'rgba(255,255,255,0.4)',
            fontSize: '10px',
            fontFamily: 'var(--font-mono)',
            position: 'absolute',
            textAlign: 'center',
            width: '100%',
            top: '20px',
            pointerEvents: 'none',
          }}>
            HELIOS 44-2 58mm f:2
          </div>
          <div style={{
            color: 'rgba(255,255,255,0.25)',
            fontSize: '9px',
            fontFamily: 'var(--font-mono)',
            position: 'absolute',
            textAlign: 'center',
            width: '100%',
            bottom: '22px',
            pointerEvents: 'none',
          }}>
            Nº 8213456
          </div>
        </div>

        {/* Bright Green Glossy 3D Sphere (Right Side) */}
        <div className="collage-sphere floating-slow" style={{
          position: 'absolute',
          right: '18%',
          bottom: '100px',
          zIndex: 4,
          border: '3px solid var(--text-primary)',
        }}></div>

      </div>

      {/* 2. JAGGED BLUE spikes at the bottom of the section */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '160px',
        zIndex: 8,
        display: 'flex',
        alignItems: 'flex-end',
        pointerEvents: 'none',
      }}>
        <svg viewBox="0 0 1440 200" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
          <polygon
            points="0,200 80,110 170,165 240,60 320,130 420,80 500,170 590,50 670,140 760,65 850,150 940,90 1020,160 1100,50 1210,120 1310,40 1390,125 1440,80 1440,200"
            fill="#1e3a8a" /* Royal blue deep */
            stroke="var(--text-primary)"
            strokeWidth="3.5"
          />
        </svg>
      </div>

      {/* 3. HERO TYPOGRAPHY & INTRO DETAILS */}
      <div style={{
        maxWidth: '900px',
        width: '100%',
        textAlign: 'center',
        padding: '0 20px',
        zIndex: 12,
        marginTop: '-30px',
      }}>
        {/* Intro Tag */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          backgroundColor: 'var(--bg-panel)',
          border: '2px solid var(--text-primary)',
          padding: '6px 18px',
          borderRadius: '50px',
          color: 'var(--text-primary)',
          fontFamily: 'var(--font-mono)',
          fontWeight: '700',
          fontSize: '12px',
          marginBottom: '20px',
          boxShadow: '2px 2px 0px var(--text-primary)',
        }}>
          <span style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: 'var(--color-secondary)',
            boxShadow: '0 0 8px var(--color-secondary)',
          }}></span>
          COLLAGE. MOTION. COLOR. PACING.
        </div>

        {/* Title */}
        <h1 className="title-glow" style={{
          fontSize: 'clamp(36px, 5.5vw, 68px)',
          lineHeight: '1.1',
          marginBottom: '20px',
          letterSpacing: '-2.5px',
        }}>
          VIDIT KESARWANI
        </h1>

        {/* Subtitle */}
        <p style={{
          color: 'var(--text-primary)',
          fontWeight: '500',
          fontSize: 'clamp(15px, 1.8vw, 18px)',
          maxWidth: '650px',
          margin: '0 auto 35px auto',
          lineHeight: '1.6',
        }}>
          Crafting raw visuals into cinematic, high-retention digital stories. Bringing photoshop precision, figma structuring, and Davinci grades to every timeline sequence.
        </p>

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '20px',
          marginBottom: '65px',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={() => setActiveView('portfolio')}
            className="glow-btn-solid"
          >
            📂 Explore Project Bin
          </button>
          <button
            onClick={() => setActiveView('contact')}
            className="glow-btn"
          >
            ⚡ Start Edit Sequence
          </button>
        </div>

        {/* Interactive Grading Slider Block (Tactile Light Theme) */}
        <div style={{
          marginBottom: '80px',
          textAlign: 'center',
        }}>
          <h3 style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '13px',
            color: 'var(--text-primary)',
            fontWeight: '700',
            marginBottom: '15px',
            textTransform: 'uppercase',
            letterSpacing: '1px',
          }}>
            🕹 BEFORE/AFTER GRADING SCRUBBER
          </h3>

          <div
            ref={sliderContainerRef}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            style={{
              width: '100%',
              maxWidth: '800px',
              height: '340px',
              margin: '0 auto',
              position: 'relative',
              borderRadius: '12px',
              overflow: 'hidden',
              border: '3px solid var(--text-primary)',
              cursor: 'ew-resize',
              boxShadow: '6px 6px 0px var(--text-primary)',
              userSelect: 'none',
              background: '#000',
            }}
          >
            {/* Raw Footage Layer (LOG style) */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.1)), url("https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1025&auto=format&fit=crop") center/cover no-repeat',
              filter: 'contrast(0.4) saturate(0.2) brightness(0.95)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <div style={{
                position: 'absolute',
                left: '20px',
                top: '20px',
                fontFamily: 'var(--font-mono)',
                backgroundColor: '#ffffff',
                border: '2px solid var(--text-primary)',
                padding: '4px 10px',
                fontSize: '11px',
                borderRadius: '4px',
                color: 'var(--text-primary)',
                fontWeight: 'bold',
              }}>
                [ FLAT RAW LOG FOOTAGE ]
              </div>
            </div>

            {/* Graded & Edited Layer (Vibrant, high energy) */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'linear-gradient(rgba(236, 72, 153, 0.05), rgba(37, 99, 235, 0.05)), url("https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1025&auto=format&fit=crop") center/cover no-repeat',
              filter: 'contrast(1.3) saturate(1.55) brightness(1.05) hue-rotate(-5deg)',
              clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <div style={{
                position: 'absolute',
                right: '20px',
                top: '20px',
                fontFamily: 'var(--font-mono)',
                backgroundColor: 'var(--color-secondary)',
                border: '2px solid var(--text-primary)',
                padding: '4px 10px',
                fontSize: '11px',
                borderRadius: '4px',
                color: '#ffffff',
                fontWeight: 'bold',
                boxShadow: '2px 2px 0px var(--text-primary)',
              }}>
                [ FINAL COLOR GRADE EXPORT ]
              </div>
            </div>

            {/* Playhead Sliding Divider */}
            <div style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: `${sliderPosition}%`,
              width: '3.5px',
              backgroundColor: 'var(--text-primary)',
              pointerEvents: 'none',
              zIndex: 10,
            }}>
              {/* Playhead Handle */}
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                backgroundColor: 'var(--bg-deep)',
                border: '3px solid var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
              }}>
                <div style={{ display: 'flex', gap: '3px' }}>
                  <div style={{ width: '2.5px', height: '12px', backgroundColor: 'var(--text-primary)' }}></div>
                  <div style={{ width: '2.5px', height: '12px', backgroundColor: 'var(--text-primary)' }}></div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

    </section>
  );
}
