import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const projects = [
  {
    id: 1,
    title: 'Cyberpunk Tokyo Night Reel',
    category: 'reels',
    software: 'Premiere Pro / After Effects',
    duration: '00:01:15',
    thumbnail: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=600&auto=format&fit=crop',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-dj-playing-music-at-a-club-41712-large.mp4',
    description: 'High-energy cyberpunk-style transitions, speed ramps, and heavy glitch color grading for Tokyo nightlife promotional reel.',
    fps: '23.976 fps',
    resolution: '3840 x 2160 (4K)'
  },
  {
    id: 2,
    title: 'Iceland Volcanic Landscape',
    category: 'cinematic',
    software: 'DaVinci Resolve / Premiere Pro',
    duration: '00:02:40',
    thumbnail: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=600&auto=format&fit=crop',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-thick-snow-covered-forest-41611-large.mp4',
    description: 'Surgical color matching, HDR grading, and seamless sky replacements to create an ethereal nature exploration documentary.',
    fps: '24.000 fps',
    resolution: '4096 x 2160 (Cinema 4K)'
  },
  {
    id: 3,
    title: 'Urban Streetwear Promo',
    category: 'commercials',
    software: 'Premiere Pro / After Effects',
    duration: '00:00:45',
    thumbnail: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=600&auto=format&fit=crop',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-urban-city-traffic-at-night-41582-large.mp4',
    description: 'Pacing aligned to a custom lo-fi hip-hop track, featuring rotoscoping text, paper-rip textures, and film burn overlays.',
    fps: '29.970 fps',
    resolution: '1920 x 1080 (FHD)'
  },
  {
    id: 4,
    title: 'Adventure Travel Vlog',
    category: 'vlogs',
    software: 'Premiere Pro / Audition',
    duration: '00:10:15',
    thumbnail: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600&auto=format&fit=crop',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-woman-filming-with-her-smartphone-43241-large.mp4',
    description: 'Engaging modern vlog edits: custom subtitling overlays, zoom transitions, ambient sound design, and audio cleaning.',
    fps: '60.000 fps',
    resolution: '1920 x 1080 (FHD)'
  }
];

export default function PortfolioGrid() {
  const [filter, setFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  
  // Custom video player state
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showSafeGuides, setShowSafeGuides] = useState(false);
  const [vuLevels, setVuLevels] = useState(Array(15).fill(false));
  
  const videoRef = useRef(null);

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.category === filter);

  // Animate VU levels when playing
  useEffect(() => {
    let interval;
    if (isPlaying && selectedProject) {
      interval = setInterval(() => {
        const activeCount = Math.floor(Math.random() * 11) + 2; 
        setVuLevels(Array(15).fill(false).map((_, i) => i < activeCount));
      }, 80);
    } else {
      setVuLevels(Array(15).fill(false));
    }
    return () => clearInterval(interval);
  }, [isPlaying, selectedProject]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch(err => console.log('Autoplay blocked:', err));
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleScrub = (e) => {
    if (videoRef.current && duration) {
      const scrubTime = parseFloat(e.target.value);
      videoRef.current.currentTime = scrubTime;
      setCurrentTime(scrubTime);
    }
  };

  const changeSpeed = (rate) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = rate;
      setPlaybackRate(rate);
    }
  };

  const formatTimecode = (seconds, fpsStr) => {
    if (isNaN(seconds)) return '00:00:00:00';
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    const fps = parseFloat(fpsStr) || 24.0;
    const frames = Math.floor((seconds % 1) * fps);
    
    const pad = (num) => String(num).padStart(2, '0');
    return `${pad(hrs)}:${pad(mins)}:${pad(secs)}:${pad(frames)}`;
  };

  const openProject = (project) => {
    setSelectedProject(project);
    setIsPlaying(false);
    setCurrentTime(0);
    setPlaybackRate(1);
    setShowSafeGuides(false);
  };

  const closeProject = () => {
    setSelectedProject(null);
    setIsPlaying(false);
  };

  return (
    <section style={{
      padding: '80px 20px',
      position: 'relative',
      zIndex: 10
    }}>
      <div style={{ width: '100%', padding: '0 5vw', margin: '0 auto' }}>
        
        {/* Title */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '50px' }}
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
            PROJECT BIN
          </h2>
          <p style={{ color: 'var(--text-secondary)', margin: '0 auto', fontSize: '16px' }}>
            Browse through some of my finest cuts, color grades, and edits. Select a sequence to load it in the viewport monitor.
          </p>
        </motion.div>

        {/* Categories */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '15px',
            marginBottom: '50px',
            flexWrap: 'wrap'
          }}
        >
          {[
            { id: 'all', label: 'All Assets' },
            { id: 'reels', label: 'Reels & Shorts' },
            { id: 'cinematic', label: 'Cinematic' },
            { id: 'commercials', label: 'Commercials' },
            { id: 'vlogs', label: 'Travel & Vlogs' }
          ].map(tab => (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(tab.id)}
              style={{
                backgroundColor: filter === tab.id ? 'rgba(0, 240, 255, 0.15)' : 'rgba(25, 25, 40, 0.5)',
                color: filter === tab.id ? 'var(--color-primary)' : 'var(--text-secondary)',
                border: filter === tab.id ? '1px solid var(--color-primary)' : '1px solid var(--border-muted)',
                borderRadius: '20px',
                padding: '10px 24px',
                fontFamily: 'var(--font-mono)',
                fontSize: '14px',
                fontWeight: '600',
                transition: 'all 0.3s ease',
                boxShadow: filter === tab.id ? '0 0 15px rgba(0,240,255,0.3)' : 'none',
                cursor: 'pointer',
                backdropFilter: 'blur(10px)'
              }}
            >
              {tab.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Project Grid */}
        <motion.div 
          layout
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '30px',
          }}
        >
          <AnimatePresence>
            {filteredProjects.map(project => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}
                key={project.id}
                onClick={() => openProject(project)}
                style={{
                  background: 'rgba(15, 15, 25, 0.6)',
                  border: '1px solid var(--border-muted)',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  backdropFilter: 'blur(10px)'
                }}
              >
                {/* Thumbnail image */}
                <div style={{
                  position: 'relative',
                  width: '100%',
                  paddingTop: '56.25%',
                  background: `url(${project.thumbnail}) center/cover no-repeat`,
                }}>
                  {/* Tech specifications label */}
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    color: 'var(--color-primary)',
                    fontWeight: 'bold',
                    border: '1px solid var(--color-primary)',
                    backdropFilter: 'blur(4px)',
                    zIndex: 1,
                  }}>
                    {project.duration}
                  </div>
                </div>

                {/* Card info bottom */}
                <div style={{ padding: '24px' }}>
                  <h4 style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '18px',
                    fontWeight: '700',
                    color: '#fff',
                    marginBottom: '8px',
                  }}>
                    {project.title}
                  </h4>
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '13px',
                    color: 'var(--color-secondary)',
                    fontWeight: '600',
                  }}>
                    {project.software}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        {/* Viewport Editor Modal (Light Theme Monitor Console) */}
        {selectedProject && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(30, 27, 75, 0.75)',
            backdropFilter: 'blur(4px)',
            zIndex: 9000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}>
            {/* Modal Body: Styled like NLE Program Monitor Console */}
            <div style={{
              width: '100%',
              maxWidth: '1000px',
              backgroundColor: 'var(--bg-panel)',
              border: '3px solid var(--text-primary)',
              borderRadius: '12px',
              boxShadow: '10px 10px 0px var(--text-primary)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
            }}>
              
              {/* Monitor Titlebar */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px 20px',
                backgroundColor: '#eae9e4',
                borderBottom: '2.5px solid var(--text-primary)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-primary)',
                  }}></span>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '13px',
                    color: 'var(--text-primary)',
                    fontWeight: 'bold',
                  }}>
                    Program Monitor: {selectedProject.title}
                  </span>
                </div>
                <button
                  onClick={closeProject}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-primary)',
                    fontSize: '20px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => e.target.style.color = 'var(--color-accent)'}
                  onMouseLeave={e => e.target.style.color = 'var(--text-primary)'}
                >
                  ✕
                </button>
              </div>

              {/* Main Monitor Screen Area */}
              <div 
                className="monitor-screen-area"
                style={{
                  borderBottom: '2.5px solid var(--text-primary)',
                  position: 'relative',
                }}
              >
                
                {/* Simulated Viewer Screen */}
                <div style={{
                  flex: 1,
                  position: 'relative',
                  minWidth: '280px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: '#000',
                  aspectRatio: '16/9',
                }}>
                  <video
                    ref={videoRef}
                    src={selectedProject.videoUrl}
                    loop
                    onClick={togglePlay}
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleLoadedMetadata}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                    }}
                  />

                  {/* Simulated Safe Guides Overlay */}
                  {showSafeGuides && (
                    <div style={{
                      position: 'absolute',
                      top: '10%',
                      left: '10%',
                      right: '10%',
                      bottom: '10%',
                      border: '1.5px dashed rgba(255, 255, 255, 0.35)',
                      pointerEvents: 'none',
                      zIndex: 10,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <div style={{
                        width: '90%',
                        height: '90%',
                        border: '1px dashed rgba(255, 255, 255, 0.2)',
                      }}></div>
                      {/* Crosshair */}
                      <div style={{ position: 'absolute', width: '20px', height: '1px', backgroundColor: 'rgba(255,255,255,0.4)' }}></div>
                      <div style={{ position: 'absolute', height: '20px', width: '1px', backgroundColor: 'rgba(255,255,255,0.4)' }}></div>
                    </div>
                  )}

                  {/* REC indicator */}
                  <div className="rec-dot">
                    LIVE PREVIEW
                  </div>

                  {/* Timecode Bottom-Left */}
                  <div className="viewport-timecode" style={{ zIndex: 6 }}>
                    {formatTimecode(currentTime, selectedProject.fps)}
                  </div>

                  {/* Specs Bottom-Right */}
                  <div style={{
                    position: 'absolute',
                    bottom: '20px',
                    right: '20px',
                    fontFamily: 'var(--font-mono)',
                    color: '#ffffff',
                    fontSize: '11px',
                    zIndex: 6,
                    background: 'rgba(0,0,0,0.7)',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}>
                    {selectedProject.resolution} | {selectedProject.fps}
                  </div>
                </div>

                {/* Right Side Panel: Audio VU meters (Light Frame, colorful indicators) */}
                <div className="monitor-vu-panel">
                  <span style={{ fontSize: '9px', fontFamily: 'var(--font-mono)', color: 'var(--text-primary)', fontWeight: 'bold' }}>CH 1/2</span>
                  <div style={{ display: 'flex', gap: '5px' }}>
                    {/* Left VU */}
                    <div className="vu-meter">
                      {vuLevels.slice().reverse().map((active, i) => {
                        const originalIndex = 14 - i;
                        let colorClass = '';
                        if (originalIndex >= 12) colorClass = 'red';
                        else if (originalIndex >= 9) colorClass = 'yellow';
                        return (
                          <div 
                            key={i} 
                            className={`vu-bar ${colorClass} ${active ? 'active' : ''}`}
                          />
                        );
                      })}
                    </div>
                    {/* Right VU */}
                    <div className="vu-meter">
                      {vuLevels.slice().reverse().map((active, i) => {
                        const originalIndex = 14 - i;
                        let colorClass = '';
                        if (originalIndex >= 12) colorClass = 'red';
                        else if (originalIndex >= 9) colorClass = 'yellow';
                        const rightActive = active && (Math.random() > 0.15 || originalIndex < 5);
                        return (
                          <div 
                            key={i} 
                            className={`vu-bar ${colorClass} ${rightActive ? 'active' : ''}`}
                          />
                        );
                      })}
                    </div>
                  </div>
                  <span style={{ fontSize: '9px', fontFamily: 'var(--font-mono)', color: 'var(--text-primary)', fontWeight: 'bold' }}>dB</span>
                </div>
              </div>

              {/* Viewport Control Dashboard */}
              <div style={{
                padding: '20px',
                backgroundColor: 'var(--bg-panel)',
              }}>
                {/* Timeline Seekbar / Scrubber */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px',
                  marginBottom: '20px',
                }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-primary)', fontWeight: 'bold' }}>
                    {formatTimecode(0, selectedProject.fps)}
                  </span>
                  <input
                    type="range"
                    min="0"
                    max={duration || 100}
                    step="0.01"
                    value={currentTime}
                    onChange={handleScrub}
                    style={{
                      flex: 1,
                      accentColor: 'var(--color-primary)',
                      cursor: 'pointer',
                      height: '8px',
                      border: '1.5px solid var(--text-primary)',
                      borderRadius: '4px',
                    }}
                  />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-primary)', fontWeight: 'bold' }}>
                    {formatTimecode(duration, selectedProject.fps)}
                  </span>
                </div>

                {/* Control Panel Buttons */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '15px',
                }}>
                  {/* Left Controls: Playback Tools */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {/* Play/Pause */}
                    <button
                      onClick={togglePlay}
                      style={{
                        backgroundColor: isPlaying ? 'rgba(239, 68, 68, 0.1)' : 'rgba(37, 99, 235, 0.1)',
                        border: '2px solid var(--text-primary)',
                        borderRadius: '6px',
                        width: '44px',
                        height: '38px',
                        color: 'var(--text-primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        boxShadow: '2px 2px 0px var(--text-primary)',
                      }}
                    >
                      {isPlaying ? (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                          <rect x="4" y="4" width="4" height="16" />
                          <rect x="16" y="4" width="4" height="16" />
                        </svg>
                      ) : (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M8 5V19L19 12L8 5Z" />
                        </svg>
                      )}
                    </button>

                    {/* Toggle Safe Margins */}
                    <button
                      onClick={() => setShowSafeGuides(!showSafeGuides)}
                      style={{
                        backgroundColor: showSafeGuides ? 'rgba(37, 99, 235, 0.15)' : 'transparent',
                        border: '2px solid var(--text-primary)',
                        borderRadius: '6px',
                        padding: '8px 14px',
                        fontSize: '12px',
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 'bold',
                        color: 'var(--text-primary)',
                        cursor: 'pointer',
                        boxShadow: '2px 2px 0px var(--text-primary)',
                      }}
                    >
                      📺 SAFE GUIDES
                    </button>
                  </div>

                  {/* Middle Controls: Video Specs Info */}
                  <div style={{
                    fontSize: '13px',
                    fontFamily: 'var(--font-sans)',
                    color: 'var(--text-secondary)',
                    fontWeight: '500',
                    maxWidth: '400px',
                    textAlign: 'center',
                  }}>
                    {selectedProject.description}
                  </div>

                  {/* Right Controls: Playback Speeds */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-primary)', fontWeight: 'bold' }}>SPEED:</span>
                    {[0.5, 1, 1.5, 2].map(speed => (
                      <button
                        key={speed}
                        onClick={() => changeSpeed(speed)}
                        style={{
                          backgroundColor: playbackRate === speed ? 'var(--color-primary)' : 'var(--bg-panel)',
                          border: '2px solid var(--text-primary)',
                          borderRadius: '4px',
                          padding: '4px 10px',
                          fontSize: '11px',
                          fontFamily: 'var(--font-mono)',
                          fontWeight: 'bold',
                          color: playbackRate === speed ? '#ffffff' : 'var(--text-primary)',
                          cursor: 'pointer',
                          boxShadow: '1.5px 1.5px 0px var(--text-primary)',
                        }}
                      >
                        {speed}x
                      </button>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
