import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function Hero({ setActiveView }) {
  const [scrollOffset, setScrollOffset] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const sliderContainerRef = useRef(null);

  // Refs for draggable nodes and container
  const containerRef = useRef(null);
  const psRef = useRef(null);
  const wheelRef = useRef(null);
  const lensRef = useRef(null);
  const sphereRef = useRef(null);
  const checkerRef = useRef(null);
  const stylusRef = useRef(null);

  // State to force-update connecting lines during active drag
  const [dragTick, setDragTick] = useState(0);
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

  // Helper to compute node centers relative to the parent container
  const getCenterCoords = (elRef) => {
    if (!elRef.current || !containerRef.current) return { x: 0, y: 0 };
    const rect = elRef.current.getBoundingClientRect();
    const parentRect = containerRef.current.getBoundingClientRect();
    return {
      x: Math.round((rect.left + rect.width / 2) - parentRect.left),
      y: Math.round((rect.top + rect.height / 2) - parentRect.top)
    };
  };

  // Helper to render high-tech HUD coordinate readout and status badge
  const renderHud = (elRef, name, status) => {
    const coords = getCenterCoords(elRef);
    if (!coords.x && !coords.y) return null;
    return (
      <>
        <div className="hud-label">{name} (X:{coords.x} Y:{coords.y})</div>
        <div className="hud-badge">{status}</div>
      </>
    );
  };

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
      <div 
        ref={containerRef}
        style={{
          width: '100vw',
          height: isMobile ? '460px' : '650px',
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
        }}
      >
        
        {/* BACKGROUND ELEMENTS */}
        {/* Bold Retro Serif Text "por" */}
        <div style={{
          position: 'absolute',
          fontFamily: 'var(--font-display)',
          fontSize: isMobile ? '140px' : '280px',
          fontWeight: '900',
          color: 'var(--color-secondary)',
          top: isMobile ? '120px' : '20px',
          right: isMobile ? '15%' : '25%',
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
          height: isMobile ? '380px' : '480px',
          backgroundColor: 'rgba(239, 68, 68, 0.4)',
          left: '52%',
          top: '20px',
          zIndex: 2,
        }}></div>
        
        {/* Rulers / Guides overlay */}
        <div style={{
          position: 'absolute',
          width: isMobile ? '180px' : '350px',
          height: '2px',
          backgroundColor: 'rgba(30, 27, 75, 0.1)',
          left: '20%',
          top: isMobile ? '240px' : '320px',
          transform: 'rotate(-15deg)',
          zIndex: 1,
        }}></div>

        {/* Dynamic Vector Bezier Path Overlay & Connecting Lines */}
        <svg style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '100%',
          height: '100%',
          zIndex: 2,
          pointerEvents: 'none',
        }}>
          <defs>
            <linearGradient id="gradient-path" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--color-primary)" />
              <stop offset="50%" stopColor="var(--color-secondary)" />
              <stop offset="100%" stopColor="var(--color-orange)" />
            </linearGradient>
            
            {/* Glow Filter */}
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {(() => {
            const psCenter = getCenterCoords(psRef);
            const wheelCenter = getCenterCoords(wheelRef);
            const lensCenter = getCenterCoords(lensRef);
            const sphereCenter = getCenterCoords(sphereRef);
            const checkerCenter = getCenterCoords(checkerRef);
            const stylusCenter = getCenterCoords(stylusRef);

            return (
              <>
                {/* 1. Dashed neon line: Wheel <-> Lens */}
                {wheelCenter.x && lensCenter.x ? (
                  <path
                    d={`M ${wheelCenter.x},${wheelCenter.y} L ${lensCenter.x},${lensCenter.y}`}
                    fill="none"
                    stroke="#ec4899"
                    strokeWidth="2.5"
                    strokeDasharray="6,6"
                    opacity="0.6"
                    filter="url(#glow)"
                  />
                ) : null}

                {/* 2. Neon cyan line: Lens <-> Stylus */}
                {lensCenter.x && stylusCenter.x ? (
                  <path
                    d={`M ${lensCenter.x},${lensCenter.y} L ${stylusCenter.x},${stylusCenter.y}`}
                    fill="none"
                    stroke="#00f0ff"
                    strokeWidth="2"
                    opacity="0.7"
                    filter="url(#glow)"
                  />
                ) : null}

                {/* 3. Neon green line: Checker <-> Sphere */}
                {checkerCenter.x && sphereCenter.x ? (
                  <path
                    d={`M ${checkerCenter.x},${checkerCenter.y} L ${sphereCenter.x},${sphereCenter.y}`}
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2"
                    strokeDasharray="4,4"
                    opacity="0.6"
                    filter="url(#glow)"
                  />
                ) : null}

                {/* 4. Interactive Figma Bezier Path: Photoshop <-> Camera Lens */}
                {(() => {
                  if (!psCenter.x || !lensCenter.x) return null;
                  const startPt = psCenter;
                  const endPt = lensCenter;
                  
                  // Dynamic control points
                  const cp1 = { x: startPt.x + (isMobile ? 30 : 90), y: startPt.y - (isMobile ? 50 : 150) };
                  const cp2 = { x: endPt.x - (isMobile ? 40 : 100), y: endPt.y - (isMobile ? 30 : 60) };

                  return (
                    <>
                      {/* Main curve */}
                      <path
                        d={`M ${startPt.x},${startPt.y} C ${cp1.x},${cp1.y} ${cp2.x},${cp2.y} ${endPt.x},${endPt.y}`}
                        fill="none"
                        stroke="url(#gradient-path)"
                        strokeWidth={isMobile ? "5" : "8"}
                        strokeLinecap="round"
                        filter="url(#glow)"
                      />

                      {/* Anchor Handles */}
                      <line x1={startPt.x} y1={startPt.y} x2={cp1.x} y2={cp1.y} stroke="#ff3b30" strokeWidth="1.5" strokeDasharray="3,3" opacity="0.8" />
                      <line x1={endPt.x} y1={endPt.y} x2={cp2.x} y2={cp2.y} stroke="#ff3b30" strokeWidth="1.5" strokeDasharray="3,3" opacity="0.8" />
                      
                      {/* Anchor boxes */}
                      <rect x={startPt.x - 4} y={startPt.y - 4} width="8" height="8" fill="#fff" stroke="#ff3b30" strokeWidth="1.5" />
                      <rect x={endPt.x - 4} y={endPt.y - 4} width="8" height="8" fill="#fff" stroke="#ff3b30" strokeWidth="1.5" />
                      
                      {/* Control circles */}
                      <circle cx={cp1.x} cy={cp1.y} r="4.5" fill="#ff3b30" />
                      <circle cx={cp2.x} cy={cp2.y} r="4.5" fill="#ff3b30" />
                      
                      {/* Blue vector cursor arrow pointing to control point 1 */}
                      <polygon 
                        points={`${cp1.x},${cp1.y + 20} ${cp1.x},${cp1.y} ${cp1.x + 15},${cp1.y + 8}`} 
                        fill="#00f0ff" 
                        stroke="#000" 
                        strokeWidth="1" 
                        transform={`rotate(-15, ${cp1.x}, ${cp1.y})`} 
                      />
                    </>
                  );
                })()}
              </>
            );
          })()}
        </svg>

        {/* DRAGGABLE NODE INTERACTIVE ELEMENTS */}

        {/* 1. Stand Color Checker Stand Card (Right side) */}
        <motion.div 
          ref={checkerRef}
          drag
          dragConstraints={containerRef}
          dragElastic={0.1}
          dragMomentum={false}
          onDrag={() => setDragTick(t => t + 1)}
          className="draggable-node"
          style={{
            position: 'absolute',
            right: isMobile ? '2%' : '12%',
            top: isMobile ? '40px' : '60px',
            zIndex: 10,
          }}
        >
          <div className="floating-slow" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative'
          }}>
            {/* Grey/Black Spheres on top of checker */}
            <div style={{ display: 'flex', gap: isMobile ? '10px' : '20px', marginBottom: '-5px', zIndex: 5 }}>
              <div style={{ width: isMobile ? '20px' : '35px', height: isMobile ? '20px' : '35px', borderRadius: '50%', background: 'radial-gradient(circle at 35% 35%, #555, #111)', boxShadow: '0 4px 6px rgba(0,0,0,0.2)' }}></div>
              <div style={{ width: isMobile ? '24px' : '40px', height: isMobile ? '24px' : '40px', borderRadius: '50%', background: 'radial-gradient(circle at 35% 35%, #bbb, #555)', boxShadow: '0 4px 6px rgba(0,0,0,0.2)' }}></div>
            </div>
            {/* Color card */}
            <div className="collage-color-checker">
              {['#3c221a', '#e0a986', '#597cb3', '#5a623f', '#7faad7', '#5db197',
                '#e68235', '#49449a', '#c34e56', '#502a5c', '#98c13f', '#e6a61a',
                '#2c3272', '#418239', '#8e1b21', '#ebca12', '#c34d89', '#138cb4',
                '#ffffff', '#c7c7c7', '#939393', '#5e5e5e', '#363636', '#000000'
              ].map((col, idx) => (
                <div key={idx} style={{ backgroundColor: col, width: '100%', height: '100%', border: '0.5px solid #000' }}></div>
              ))}
            </div>
            {/* Card Stand pole */}
            <div style={{ width: '3px', height: isMobile ? '70px' : '150px', backgroundColor: 'var(--text-primary)', marginTop: '-1px' }}></div>
            <div style={{ width: isMobile ? '25px' : '40px', height: '3px', backgroundColor: 'var(--text-primary)' }}></div>
            
            {renderHud(checkerRef, "COLOR_CHECKER", "CALIBRATION_GRID")}
          </div>
        </motion.div>

        {/* 2. Photoshop Icon (Left side) */}
        <motion.div 
          ref={psRef}
          drag
          dragConstraints={containerRef}
          dragElastic={0.1}
          dragMomentum={false}
          onDrag={() => setDragTick(t => t + 1)}
          className="draggable-node"
          style={{
            position: 'absolute',
            left: isMobile ? '5%' : '10%',
            top: isMobile ? '70px' : '120px',
            zIndex: 10,
          }}
        >
          <div className="collage-ps-icon floating-medium" style={{ position: 'relative' }}>
            Ps
            {renderHud(psRef, "PHOTOSHOP", "PSD_ENV_01")}
          </div>
        </motion.div>

        {/* 3. Color Wheel (Center Top) */}
        <motion.div 
          ref={wheelRef}
          drag
          dragConstraints={containerRef}
          dragElastic={0.1}
          dragMomentum={false}
          onDrag={() => setDragTick(t => t + 1)}
          className="draggable-node"
          style={{
            position: 'absolute',
            left: isMobile ? '38%' : '35%',
            top: isMobile ? '30px' : '50px',
            zIndex: 10,
          }}
        >
          <div className="collage-color-wheel floating-slow" style={{ position: 'relative' }}>
            <div className="collage-color-wheel-center"></div>
            {renderHud(wheelRef, "COLOR_WHEEL", "LUT_RGB_CALIBRATED")}
          </div>
        </motion.div>

        {/* 4. Stylus Drawing Pen (Floating next to camera) */}
        <motion.div 
          ref={stylusRef}
          drag
          dragConstraints={containerRef}
          dragElastic={0.1}
          dragMomentum={false}
          onDrag={() => setDragTick(t => t + 1)}
          className="draggable-node"
          style={{
            position: 'absolute',
            left: isMobile ? '52%' : '58%',
            top: isMobile ? '180px' : '230px',
            zIndex: 11,
          }}
        >
          <div className="floating-fast" style={{
            width: isMobile ? '8px' : '12px',
            height: isMobile ? '150px' : '240px',
            background: 'linear-gradient(180deg, #18181b 0%, #3f3f46 70%, #71717a 90%, #00f0ff 100%)',
            border: '1.5px solid var(--text-primary)',
            borderRadius: '6px',
            transform: 'rotate(5deg)',
            boxShadow: '4px 8px 15px rgba(0,0,0,0.2)',
            position: 'relative'
          }}>
            {/* Clip detailing stylus */}
            <div style={{ width: '100%', height: '4px', backgroundColor: '#e4e4e7', marginTop: isMobile ? '90px' : '140px' }}></div>
            <div style={{ width: '100%', height: '8px', backgroundColor: '#a1a1aa', marginTop: '10px' }}></div>
            {renderHud(stylusRef, "VECT_PEN", "STYLUS_V1")}
          </div>
        </motion.div>

        {/* 5. Camera Lens Helios 44-2 (Center Bottom) */}
        <motion.div 
          ref={lensRef}
          drag
          dragConstraints={containerRef}
          dragElastic={0.1}
          dragMomentum={false}
          onDrag={() => setDragTick(t => t + 1)}
          className="draggable-node"
          style={{
            position: 'absolute',
            left: isMobile ? '12%' : '30%',
            bottom: isMobile ? '30px' : '20px',
            zIndex: 12,
          }}
        >
          <div className="collage-lens floating-medium" style={{
            border: isMobile ? '6px solid var(--text-primary)' : '12px solid var(--text-primary)',
            boxShadow: '10px 15px 30px rgba(0,0,0,0.3)',
            position: 'relative'
          }}>
            <div className="collage-lens-reflection"></div>
            <div className="collage-lens-reflection2"></div>
            {/* Lens text prints */}
            <div style={{
              color: 'rgba(255,255,255,0.4)',
              fontSize: isMobile ? '6px' : '10px',
              fontFamily: 'var(--font-mono)',
              position: 'absolute',
              textAlign: 'center',
              width: '100%',
              top: isMobile ? '10px' : '20px',
              pointerEvents: 'none',
            }}>
              HELIOS 44-2 58mm f:2
            </div>
            <div style={{
              color: 'rgba(255,255,255,0.25)',
              fontSize: isMobile ? '5px' : '9px',
              fontFamily: 'var(--font-mono)',
              position: 'absolute',
              textAlign: 'center',
              width: '100%',
              bottom: isMobile ? '10px' : '22px',
              pointerEvents: 'none',
            }}>
              Nº 8213456
            </div>
            {renderHud(lensRef, "HELIOS_LENS", "GLASS_58MM")}
          </div>
        </motion.div>

        {/* 6. Bright Green Glossy 3D Sphere (Right Side) */}
        <motion.div 
          ref={sphereRef}
          drag
          dragConstraints={containerRef}
          dragElastic={0.1}
          dragMomentum={false}
          onDrag={() => setDragTick(t => t + 1)}
          className="draggable-node"
          style={{
            position: 'absolute',
            right: isMobile ? '8%' : '18%',
            bottom: isMobile ? '50px' : '100px',
            zIndex: 10,
          }}
        >
          <div className="collage-sphere floating-slow" style={{
            border: isMobile ? '1.5px solid var(--text-primary)' : '3px solid var(--text-primary)',
            position: 'relative'
          }}>
            {renderHud(sphereRef, "GREEN_SPHERE", "3D_RENDER_BALL")}
          </div>
        </motion.div>

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
