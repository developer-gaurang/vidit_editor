import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function Hero({ setActiveView }) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const sliderContainerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect and track mobile vs. desktop viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
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

      {/* 2. THE MAIN TYPOGRAPHY / HEADLINE AREA */}
      <div style={{
        position: 'relative',
        zIndex: 20,
        width: '100%',
        padding: '0 20px',
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
          width: '100%',
        }}>
          <p style={{
            fontSize: isMobile ? '16px' : '20px',
            lineHeight: '1.6',
            color: 'var(--text-secondary)',
            margin: '0 auto',
            padding: '0 15px',
            textTransform: 'uppercase',
            letterSpacing: '1px',
          }}>
            🕹 BEFORE/AFTER GRADING SCRUBBER
          </p>

          <div
            ref={sliderContainerRef}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            style={{
              width: '100%',
              height: 'clamp(180px, 45vw, 340px)',
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
