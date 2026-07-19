import React, { useState, useEffect } from 'react';

export default function CustomCursor({ activeTool }) {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [hovered, setHovered] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [visible, setVisible] = useState(true); // Toggle visibility in UI zones
  const [timecode, setTimecode] = useState('00:00:00:00');

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX: x, clientY: y } = e;
      setPosition({ x, y });

      const maxScreenWidth = window.innerWidth || 1920;
      const totalSimulatedSeconds = 90;
      
      const horizontalPercent = Math.max(0, Math.min(1, x / maxScreenWidth));
      const currentRawSeconds = horizontalPercent * totalSimulatedSeconds;
      
      const minutes = Math.floor(currentRawSeconds / 60);
      const seconds = Math.floor(currentRawSeconds % 60);
      const frames = Math.floor((x % 30) * 0.8) % 24;

      const pad = (num) => String(num).padStart(2, '0');
      setTimecode(`00:${pad(minutes)}:${pad(seconds)}:${pad(frames)}`);
    };

    const handleMouseDown = () => setClicking(true);
    const handleMouseUp = () => setClicking(false);

    const handleMouseOver = (e) => {
      const target = e.target;
      
      // Determine if mouse is over application menus / controls
      const isOverUI = 
        target.closest('nav') || 
        target.closest('.nle-toolbox') || 
        target.closest('footer') || 
        target.closest('.nle-panel-header') ||
        target.closest('.nle-master-vu') ||
        target.closest('input') ||
        target.closest('textarea') ||
        target.closest('select') ||
        target.closest('button') ||
        target.closest('a');
      
      setVisible(!isOverUI);

      const isHoverable = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('button') || 
        target.closest('a') ||
        target.closest('.project-card') ||
        target.closest('.timeline-block') ||
        target.closest('input') ||
        target.closest('textarea') ||
        target.closest('select') ||
        target.closest('.collage-item') ||
        target.classList.contains('collage-color-wheel') ||
        target.classList.contains('collage-lens') ||
        target.classList.contains('collage-ps-icon');
      
      setHovered(!!isHoverable);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  // Define cursor details based on selected toolbox tool
  const getToolCursorDetails = () => {
    switch (activeTool) {
      case 'razor':
        return {
          icon: '✂️',
          label: 'EDIT CUT',
          color: 'var(--color-accent)'
        };
      case 'pen':
        return {
          icon: '✒️',
          label: 'PATH ANCHOR',
          color: 'var(--color-secondary)'
        };
      case 'hand':
        return {
          icon: '✋',
          label: 'SCRUB GRAB',
          color: 'var(--color-orange)'
        };
      case 'text':
        return {
          icon: '📝',
          label: 'KINETIC TEXT',
          color: 'var(--color-primary)'
        };
      case 'select':
      default:
        return {
          icon: null,
          label: hovered ? 'EDIT CUT' : timecode,
          color: hovered ? 'var(--color-secondary)' : 'var(--color-primary)'
        };
    }
  };

  const cursorDetails = getToolCursorDetails();

  // Hide custom cursor completely if not visible
  if (!visible) return null;

  return (
    <>
      <div
        className={`custom-scrubber-cursor ${hovered ? 'hovered' : ''} ${clicking ? 'clicking' : ''}`}
        style={{
          position: 'fixed',
          left: `${position.x}px`,
          top: `${position.y}px`,
          pointerEvents: 'none',
          zIndex: 10000,
          display: 'none',
          transform: 'translate(-50%, -50%)',
        }}
      >
        {cursorDetails.icon ? (
          /* Render Emoji/Tool Shape */
          <div style={{
            fontSize: hovered ? '24px' : '18px',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: `translate(-50%, -50%) ${clicking ? 'scale(0.8)' : ''}`,
            transition: 'all 0.1s ease',
          }}>
            {cursorDetails.icon}
          </div>
        ) : (
          /* Render Playhead Arrow Shape */
          <>
            <div style={{
              width: 0,
              height: 0,
              borderLeft: '7px solid transparent',
              borderRight: '7px solid transparent',
              borderTop: `11px solid ${cursorDetails.color}`,
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -100%)',
              transition: 'border-color 0.2s ease',
            }}></div>

            <div style={{
              width: '1.5px',
              height: hovered ? '35px' : '22px',
              backgroundColor: cursorDetails.color,
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, 0%)',
              transition: 'all 0.2s ease',
            }}></div>
          </>
        )}

        {/* Floating Timecode Badge */}
        <div style={{
          position: 'absolute',
          left: '20px',
          top: '6px',
          backgroundColor: 'var(--bg-panel)',
          border: '2px solid var(--text-primary)',
          padding: '2px 8px',
          borderRadius: '6px',
          color: cursorDetails.color,
          fontFamily: 'var(--font-mono)',
          fontSize: '10px',
          fontWeight: 'bold',
          whiteSpace: 'nowrap',
          boxShadow: '2px 2px 0px var(--text-primary)',
          transform: hovered || clicking ? 'translateY(-2px) rotate(-1deg)' : 'none',
          transition: 'all 0.15s ease',
        }}>
          {cursorDetails.label}
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .custom-scrubber-cursor {
            display: block !important;
          }
        }
      `}</style>
    </>
  );
}
