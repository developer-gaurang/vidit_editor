import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const timelineClips = {
  V3: [
    { id: 't1', title: 'Color Grading LUT', start: 10, width: 25, color: 'linear-gradient(90deg, #d946ef 0%, #8b5cf6 100%)', technique: 'Color Science & Grading', desc: 'Applied custom Teal & Orange LUT with precise lift-gamma-gain wheel corrections. Raised exposure highlights to make city neon glow while keeping shadows clean and noiseless.' },
    { id: 't2', title: 'Glitch VFX Overlay', start: 45, width: 15, color: 'linear-gradient(90deg, #ef4444 0%, #dc2626 100%)', technique: 'VFX / Distortion', desc: 'Hand-crafted digital glitch displacement map transitions. Split the RGB channels (Red, Green, Blue offsets) at major transition points for high-energy rhythmic sync.' },
    { id: 't3', title: 'Anamorphic Letterbox', start: 0, width: 100, color: 'rgba(30, 27, 75, 0.08)', textColor: 'var(--text-primary)', technique: 'Aspect Ratio Styling', desc: 'Set cinematic 2.39:1 widescreen borders. Added subtle film grain overlays (35mm texture) to take away digital clinical sharpness and add organic analog texture.' }
  ],
  V2: [
    { id: 'b1', title: 'Tokyo Drone B-Roll', start: 10, width: 25, color: 'linear-gradient(90deg, #10b981 0%, #059669 100%)', technique: 'Speed Ramping / Motion', desc: 'Drone fly-through footage. Applied dynamic speed ramping (Fast-Slow-Fast) synchronized to the kick drum of the audio track to emphasize spatial scale.' },
    { id: 'b2', title: 'Subway Transition Close-up', start: 45, width: 20, color: 'linear-gradient(90deg, #10b981 0%, #059669 100%)', technique: 'Match Cuts', desc: 'Subway door closing matched with the slide of a camera pan. This seamless match cut carries motion energy forward without feeling jarring.' }
  ],
  V1: [
    { id: 'a1', title: 'Interview talking-head', start: 0, width: 45, color: 'linear-gradient(90deg, #3b82f6 0%, #06b6d4 100%)', technique: 'Narrative A-Roll', desc: 'Core talking-head footage. Applied precise skin-tone preservation masks and multi-camera angle stabilization to ensure a locked-in interview focal point.' },
    { id: 'a2', title: 'Outro Hook', start: 65, width: 35, color: 'linear-gradient(90deg, #3b82f6 0%, #06b6d4 100%)', technique: 'Call To Action Cut', desc: 'End sequence outro. Inserted custom animated lower-third social graphics and animated screen overlays to prompt likes and subscribes.' }
  ],
  A1: [
    { id: 'd1', title: 'Dialogue VO Track', start: 0, width: 45, color: '#eab308', textColor: '#000', technique: 'Audio Dialogue Polish', desc: 'Cleaned voiceover by removing plosives and sibilance. Applied dialogue compression, dynamic EQ to remove mud (250Hz cut), and slight room denoiser.' },
    { id: 'd2', title: 'Outro VO', start: 65, width: 35, color: '#eab308', textColor: '#000', technique: 'Ending VO Pacing', desc: 'Balanced ending dialogue with background tracks using sidechain compression (ducking). Dialogue automatically lowers music by -6dB when voice is active.' }
  ],
  A2: [
    { id: 's1', title: 'Whoosh transition SFX', start: 9, width: 3, color: '#f97316', textColor: '#000', technique: 'Ambient Audio Design', desc: 'Cinematic whoosh sound design overlaid with high-frequency whip pans to accentuate speed ramp visual movements.' },
    { id: 's2', title: 'Sub-bass drop impact', start: 44, width: 4, color: '#f97316', textColor: '#000', technique: 'Immersive Impacts', desc: 'Heavy sub-bass impact aligned to the transition. Added a 50Hz sine sweep to provide tactile chest-thumping energy in headphone/subwoofer mixes.' }
  ],
  A3: [
    { id: 'm1', title: 'Cyberpunk Synthwave Beat', start: 0, width: 100, color: '#f43f5e', technique: 'Musical Scoring & Ducking', desc: 'Main music track. Edited the music length non-destructively using beat-matching splice points, shortening the 4-minute track down to a tight 1.5 minutes.' }
  ]
};

export default function EditingTimeline() {
  const [selectedClip, setSelectedClip] = useState(timelineClips.V3[0]);
  const [playheadPos, setPlayheadPos] = useState(22);

  const selectClip = (clip) => {
    setSelectedClip(clip);
    setPlayheadPos(clip.start + (clip.width / 2));
  };

  const handleTimelineClick = (e) => {
    if (e.target.className.includes('timeline-track-content')) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const percentage = (clickX / rect.width) * 100;
      setPlayheadPos(Math.max(0, Math.min(100, percentage)));
    }
  };

  return (
    <section style={{
      padding: '80px 20px',
      position: 'relative',
      zIndex: 10
    }}>
      <div style={{ width: '100%', padding: '0 5vw', margin: '0 auto' }}>
        
        {/* Section Title */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '45px' }}
        >
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '48px',
            marginBottom: '15px',
            background: 'linear-gradient(135deg, #fff 0%, var(--color-primary) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 0 30px rgba(0, 240, 255, 0.4)'
          }}>
            ACTIVE TIMELINE SEQUENCE
          </h2>
          <p style={{ color: 'var(--text-secondary)', margin: '0 auto', fontSize: '16px' }}>
            Click on any timeline clip inside the editing tracks to inspect the breakdown, software workflow, and editorial decisions.
          </p>
        </motion.div>

        {/* Timeline Panel Frame (Glassmorphism) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            background: 'rgba(15, 15, 25, 0.6)',
            border: '1px solid var(--border-muted)',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            flexDirection: 'column',
            marginBottom: '35px',
          }}
        >
          
          {/* Timeline Titlebar */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '12px 20px',
            background: 'rgba(0, 0, 0, 0.3)',
            borderBottom: '1px solid var(--border-muted)',
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            color: '#fff',
            fontWeight: '600',
          }}>
            <div style={{ display: 'flex', gap: '20px' }}>
              <span style={{ color: 'var(--color-primary)', textShadow: '0 0 10px var(--color-primary)' }}>
                Timeline: Cyberpunk_Edit_V3
              </span>
              <span style={{ color: 'var(--text-secondary)' }}>Timecode: 00:00:24:18</span>
            </div>
            <div style={{ display: 'flex', gap: '15px', color: 'var(--text-secondary)' }}>
              <span>V: 23.976 fps</span>
              <span>A: Stereo 48kHz</span>
            </div>
          </div>

          {/* Scrollable Tracks Wrapper for Mobile Responsiveness */}
          <div style={{ overflowX: 'auto', width: '100%', scrollbarWidth: 'thin' }}>
            <div style={{ minWidth: '800px', position: 'relative' }}>

          {/* Time Ruler (Seconds indicators) */}
          <div style={{
            height: '25px',
            borderBottom: '1px solid var(--border-muted)',
            background: 'rgba(0, 0, 0, 0.2)',
            position: 'relative',
            paddingLeft: '110px',
          }}>
            {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((tick) => (
              <div 
                key={tick} 
                style={{
                  position: 'absolute',
                  left: `calc(110px + (100% - 130px) * ${tick / 100})`,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                }}
              >
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--text-primary)', fontWeight: '600', marginBottom: '3px' }}>
                  00:{String(Math.floor((tick * 60) / 100)).padStart(2, '0')}:00
                </span>
                <div style={{ width: '1.5px', height: '6px', backgroundColor: 'var(--text-primary)' }}></div>
              </div>
            ))}
          </div>

          {/* Tracks Area Container */}
          <div 
            onClick={handleTimelineClick}
            style={{
              position: 'relative',
              backgroundColor: '#e5e3db',
              userSelect: 'none',
            }}
          >
            {/* Vertical Playhead Rule line */}
            <div style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: `calc(110px + (100% - 130px) * ${playheadPos / 100})`,
              width: '2px',
              backgroundColor: 'var(--color-accent)',
              boxShadow: '0 0 5px var(--color-accent)',
              zIndex: 10,
              pointerEvents: 'none',
            }}>
              {/* Playhead marker indicator at the top */}
              <div style={{
                position: 'absolute',
                top: '-6px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '0',
                height: '0',
                borderLeft: '7px solid transparent',
                borderRight: '7px solid transparent',
                borderTop: '10px solid var(--color-accent)',
              }}></div>
            </div>

            {/* Tracks */}
            {Object.keys(timelineClips).map((trackKey) => {
              const clips = timelineClips[trackKey];
              const isVideo = trackKey.startsWith('V');
              
              return (
                <div
                  key={trackKey}
                  className="timeline-track-content"
                  style={{
                    height: '50px',
                    borderBottom: '1.5px solid var(--text-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    position: 'relative',
                    paddingLeft: '110px',
                    backgroundColor: isVideo ? '#f8f7f4' : '#f0efe9',
                  }}
                >
                  {/* Track Info Tab Header */}
                  <div style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    width: '110px',
                    height: '100%',
                    backgroundColor: '#eae9e4',
                    borderRight: '2px solid var(--text-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0 10px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    color: 'var(--text-primary)',
                    fontWeight: 'bold',
                    zIndex: 5,
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <span style={{ 
                        color: isVideo ? 'var(--color-primary)' : 'var(--color-secondary)',
                      }}>
                        {trackKey}
                      </span>
                      <span style={{ fontSize: '9px', color: 'var(--text-secondary)' }}>
                        {isVideo ? 'VID' : 'AUD'}
                      </span>
                    </div>
                    <div style={{ display: 'flex', gap: '6px', fontSize: '10px' }}>
                      <span style={{ cursor: 'pointer' }}>🔒</span>
                      <span style={{ cursor: 'pointer' }}>{isVideo ? '👁️' : '🔇'}</span>
                    </div>
                  </div>

                  {/* Clips on this track */}
                  {clips.map((clip) => {
                    const isActive = selectedClip.id === clip.id;
                    return (
                      <div
                        key={clip.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          selectClip(clip);
                        }}
                        style={{
                          position: 'absolute',
                          left: `calc(110px + (100% - 130px) * ${clip.start / 100})`,
                          width: `calc((100% - 130px) * ${clip.width / 100})`,
                          height: '75%',
                          background: clip.color,
                          borderRadius: '6px',
                          border: '2px solid var(--text-primary)',
                          display: 'flex',
                          alignItems: 'center',
                          padding: '0 8px',
                          cursor: 'pointer',
                          fontSize: '11px',
                          fontWeight: 'bold',
                          color: clip.textColor || '#ffffff',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          boxShadow: isActive ? '3px 3px 0px var(--text-primary)' : '1.5px 1.5px 0px rgba(0,0,0,0.15)',
                          transform: isActive ? 'translate(-1.5px, -1.5px)' : 'none',
                          transition: 'all 0.15s ease',
                          zIndex: isActive ? 4 : 2,
                        }}
                      >
                        {clip.title}
                      </div>
                    );
                  })}
                </div>
              );
            })}
            </div>
          </div>
        </div>
      </motion.div>

        {/* Effect Controls Panel */}
        <div style={{
          backgroundColor: 'var(--bg-panel)',
          border: '3px solid var(--text-primary)',
          borderRadius: '12px',
          padding: '25px',
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '20px',
          boxShadow: '6px 6px 0px var(--text-primary)',
        }}>
          
          {/* Header */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '2px solid var(--text-primary)',
            paddingBottom: '15px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                backgroundColor: 'rgba(37, 99, 235, 0.1)',
                border: '2px solid var(--color-primary)',
                borderRadius: '6px',
                padding: '4px 12px',
                fontSize: '11px',
                fontFamily: 'var(--font-mono)',
                color: 'var(--color-primary)',
                fontWeight: 'bold',
                boxShadow: '1.5px 1.5px 0px var(--text-primary)',
              }}>
                EFFECT CONTROLS
              </div>
              <h3 style={{
                fontSize: '20px',
                fontFamily: 'var(--font-sans)',
                fontWeight: '700',
                color: 'var(--text-primary)',
              }}>
                {selectedClip.title}
              </h3>
            </div>
            
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              color: 'var(--text-secondary)',
              fontWeight: '600',
            }}>
              Duration: {selectedClip.width}% of timeline track
            </div>
          </div>

          {/* Details Body */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '30px',
          }}>
            <div>
              <h5 style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                color: 'var(--text-secondary)',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                marginBottom: '10px',
                letterSpacing: '1px',
              }}>
                Workflow Technique
              </h5>
              <div style={{
                color: 'var(--color-secondary)',
                fontFamily: 'var(--font-display)',
                fontSize: '22px',
                fontWeight: '700',
                lineHeight: '1.3',
              }}>
                {selectedClip.technique}
              </div>
            </div>

            <div>
              <h5 style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                color: 'var(--text-secondary)',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                marginBottom: '10px',
                letterSpacing: '1px',
              }}>
                Editorial Decision & Action
              </h5>
              <p style={{
                color: 'var(--text-primary)',
                fontSize: '14px',
                lineHeight: '1.6',
                fontWeight: '500',
              }}>
                {selectedClip.desc}
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
