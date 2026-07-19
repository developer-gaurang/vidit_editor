import React, { useState, useEffect, useRef } from 'react';

export default function InteractiveNleWorkspace({ activeTool }) {
  const [lines, setLines] = useState([]); // Pen drawings: [{ points: [{x, y}], color }]
  const [isDrawing, setIsDrawing] = useState(false);
  
  const [physicsItems, setPhysicsItems] = useState([]); // Razor falling icons
  const [textTags, setTextTags] = useState([]); // Type tool texts: [{ x, y, text, isEditing }]
  const [activeTextId, setActiveTextId] = useState(null);

  const canvasRef = useRef(null);
  const drawingCanvasRef = useRef(null);
  const physicsLoopRef = useRef(null);
  const mouseStartRef = useRef({ x: 0, y: 0 });
  const scrollStartRef = useRef({ left: 0, top: 0 });
  const isDraggingPage = useRef(false);

  // Cycle colors for drawing paths
  const penColorRef = useRef('#2563eb');
  const penColors = ['#2563eb', '#ec4899', '#f97316', '#10b981', '#a855f7'];
  const colorCounterRef = useRef(0);

  // Clear workspace drawings and text tag notes
  const clearWorkspace = () => {
    setLines([]);
    setTextTags([]);
    setPhysicsItems([]);
    const canvas = drawingCanvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  // 1. DYNAMIC DRAWING CANVAS HANDLERS
  const startDrawing = (e) => {
    if (activeTool !== 'pen') return;
    setIsDrawing(true);
    
    // Cycle pen colors
    colorCounterRef.current = (colorCounterRef.current + 1) % penColors.length;
    penColorRef.current = penColors[colorCounterRef.current];

    const rect = drawingCanvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setLines(prev => [...prev, { points: [{ x, y }], color: penColorRef.current }]);
  };

  const draw = (e) => {
    if (!isDrawing || activeTool !== 'pen') return;
    const canvas = drawingCanvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setLines(prev => {
      const currentLines = [...prev];
      const activeLine = currentLines[currentLines.length - 1];
      if (activeLine) {
        activeLine.points.push({ x, y });
        
        // Draw directly to canvas for real-time responsiveness
        ctx.strokeStyle = activeLine.color;
        ctx.lineWidth = 3.5;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        
        const pts = activeLine.points;
        if (pts.length > 1) {
          ctx.beginPath();
          ctx.moveTo(pts[pts.length - 2].x, pts[pts.length - 2].y);
          ctx.lineTo(pts[pts.length - 1].x, pts[pts.length - 1].y);
          ctx.stroke();
        }
      }
      return currentLines;
    });
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  // Redraw lines on resizing
  useEffect(() => {
    const canvas = drawingCanvasRef.current;
    if (!canvas) return;
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Redraw after resizing
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.lineWidth = 3.5;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      
      lines.forEach(line => {
        ctx.strokeStyle = line.color;
        const pts = line.points;
        if (pts.length < 2) return;
        ctx.beginPath();
        ctx.moveTo(pts[0].x, pts[0].y);
        for (let i = 1; i < pts.length; i++) {
          ctx.lineTo(pts[i].x, pts[i].y);
        }
        ctx.stroke();
      });
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [lines]);

  // 2. RAZOR PHYSICS CUT SLICER
  const handleRazorCut = (e) => {
    if (activeTool !== 'razor') return;

    const clickX = e.clientX;
    const clickY = e.clientY;

    // Spawn 6 falling app icons & VK logo blocks
    const iconsList = ['Pr', 'Ae', 'Ps', 'Dr', 'VKLogo', 'Clapper', 'AudioTrack'];
    const newItems = [];

    for (let i = 0; i < 7; i++) {
      const angle = (Math.random() - 0.5) * Math.PI; // upward/outward spread
      const speed = Math.random() * 5 + 3;

      newItems.push({
        id: 'PHYS-' + Math.random().toString(36).substring(2, 9),
        x: clickX,
        y: clickY,
        vx: Math.sin(angle) * speed,
        vy: -Math.cos(angle) * speed - 2, // upward initial push
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 12,
        type: iconsList[i % iconsList.length],
        color: penColors[i % penColors.length],
        alpha: 1.0,
      });
    }

    setPhysicsItems(prev => [...prev, ...newItems]);
  };

  // Loop updating gravity physics items
  useEffect(() => {
    const updatePhysics = () => {
      setPhysicsItems(prev => {
        if (prev.length === 0) return prev;

        return prev.map(item => {
          let nextVy = item.vy + 0.35; // Gravity
          let nextY = item.y + nextVy;
          let nextX = item.x + item.vx;
          let nextRot = item.rotation + item.rotationSpeed;
          let nextAlpha = item.alpha - 0.008; // slow fade

          // Bottom screen bounce
          const floor = window.innerHeight - 50;
          if (nextY > floor) {
            nextY = floor;
            nextVy = -Math.abs(nextVy) * 0.55; // bounce bounce
            nextRot += item.rotationSpeed * 0.5;
          }

          return {
            ...item,
            x: nextX,
            y: nextY,
            vy: nextVy,
            rotation: nextRot,
            alpha: nextAlpha
          };
        }).filter(item => item.alpha > 0);
      });

      physicsLoopRef.current = requestAnimationFrame(updatePhysics);
    };

    physicsLoopRef.current = requestAnimationFrame(updatePhysics);
    return () => cancelAnimationFrame(physicsLoopRef.current);
  }, []);

  // 3. TYPE WRITING TOOL
  const handleTypeClick = (e) => {
    if (activeTool !== 'text') return;
    
    // Ignore if click is on input box
    if (e.target.tagName === 'INPUT') return;

    const clickX = e.clientX + window.scrollX;
    const clickY = e.clientY + window.scrollY;

    const newTagId = 'TEXT-' + Math.random().toString(36).substring(2, 9);
    
    const newTag = {
      id: newTagId,
      x: clickX,
      y: clickY,
      text: '',
      isEditing: true
    };

    setTextTags(prev => [...prev, newTag]);
    setActiveTextId(newTagId);
  };

  const handleTextSave = (id, text) => {
    if (!text.trim()) {
      // Remove empty tags
      setTextTags(prev => prev.filter(t => t.id !== id));
    } else {
      setTextTags(prev => prev.map(t => {
        if (t.id === id) {
          return { ...t, text, isEditing: false };
        }
        return t;
      }));
    }
    setActiveTextId(null);
  };

  // 4. HAND GRAB PAGE PANNING
  const handleHandStart = (e) => {
    if (activeTool !== 'hand') return;
    isDraggingPage.current = true;
    mouseStartRef.current = { x: e.clientX, y: e.clientY };
    scrollStartRef.current = {
      left: window.scrollX,
      top: window.scrollY
    };
  };

  const handleHandDrag = (e) => {
    if (!isDraggingPage.current || activeTool !== 'hand') return;
    
    const dx = e.clientX - mouseStartRef.current.x;
    const dy = e.clientY - mouseStartRef.current.y;
    
    window.scrollTo(
      scrollStartRef.current.left - dx,
      scrollStartRef.current.top - dy
    );
  };

  const handleHandStop = () => {
    isDraggingPage.current = false;
  };

  // Determine pointer events wrapper
  const isOverlayInteractive = activeTool !== 'select';

  return (
    <>
      {/* Interactive Overlay Layer */}
      <div
        onMouseDown={(e) => {
          startDrawing(e);
          handleRazorCut(e);
          handleTypeClick(e);
          handleHandStart(e);
        }}
        onMouseMove={(e) => {
          draw(e);
          handleHandDrag(e);
        }}
        onMouseUp={() => {
          stopDrawing();
          handleHandStop();
        }}
        onMouseLeave={() => {
          stopDrawing();
          handleHandStop();
        }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 8000,
          pointerEvents: isOverlayInteractive ? 'auto' : 'none',
        }}
      >
        {/* Draw Canvas */}
        <canvas
          ref={drawingCanvasRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
          }}
        />

        {/* Clear/Reset overlay button (Shown when there is drawing/text markup) */}
        {isOverlayInteractive && (lines.length > 0 || textTags.length > 0) && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              clearWorkspace();
            }}
            className="glow-btn"
            style={{
              position: 'fixed',
              bottom: '80px',
              left: '80px',
              padding: '6px 14px',
              fontSize: '11px',
              zIndex: 9010,
              boxShadow: '2px 2px 0px var(--text-primary)',
            }}
          >
            🧹 CLEAR CANVAS MARKUP
          </button>
        )}

        {/* Floating text inputs (Rendered relative to absolute document scroll) */}
        {textTags.map(tag => (
          <div
            key={tag.id}
            style={{
              position: 'absolute',
              left: `${tag.x - window.scrollX}px`,
              top: `${tag.y - window.scrollY}px`,
              zIndex: 8020,
              pointerEvents: 'auto',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {tag.isEditing ? (
              <input
                autoFocus
                type="text"
                placeholder="Type note & Enter..."
                defaultValue={tag.text}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleTextSave(tag.id, e.target.value);
                  }
                }}
                onBlur={(e) => handleTextSave(tag.id, e.target.value)}
                style={{
                  backgroundColor: '#ffffff',
                  border: '2.5px solid var(--text-primary)',
                  borderRadius: '6px',
                  padding: '6px 10px',
                  color: 'var(--color-primary)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  outline: 'none',
                  boxShadow: '3px 3px 0px var(--text-primary)',
                  minWidth: '150px',
                }}
              />
            ) : (
              <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: '2px solid var(--text-primary)',
                borderRadius: '6px',
                padding: '4px 10px',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                fontWeight: 'bold',
                boxShadow: '2px 2px 0px var(--text-primary)',
                whiteSpace: 'nowrap',
              }}>
                💬 {tag.text}
              </div>
            )}
          </div>
        ))}

        {/* Tumbling Physics Sliced Icons (Razor Cut output) */}
        {physicsItems.map((item) => {
          
          // Render different NLE icons tumbling
          const renderItemIcon = () => {
            switch (item.type) {
              case 'Pr':
                return <span style={{ color: '#b9a0ff' }}>Pr</span>;
              case 'Ae':
                return <span style={{ color: '#eb93ff' }}>Ae</span>;
              case 'Ps':
                return <span style={{ color: '#00a8ff' }}>Ps</span>;
              case 'Dr':
                return <span style={{ color: '#38bdf8' }}>Dr</span>;
              case 'Clapper':
                return <span>🎬</span>;
              case 'AudioTrack':
                return <span>🎵</span>;
              case 'VKLogo':
              default:
                return (
                  <svg width="22" height="22" viewBox="0 0 100 100" fill="none">
                    <rect x="5" y="5" width="90" height="90" rx="16" fill="var(--color-primary)" stroke="var(--text-primary)" strokeWidth="10" />
                    <path d="M30 35 L45 65 L60 35" stroke="#fff" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                );
            }
          };

          return (
            <div
              key={item.id}
              style={{
                position: 'absolute',
                left: `${item.x}px`,
                top: `${item.y}px`,
                width: '40px',
                height: '40px',
                backgroundColor: item.type === 'VKLogo' ? 'transparent' : 'var(--text-primary)',
                border: item.type === 'VKLogo' ? 'none' : '2px solid #ffffff',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-mono)',
                fontSize: '14px',
                fontWeight: 'bold',
                boxShadow: item.type === 'VKLogo' ? 'none' : '2px 2px 5px rgba(0,0,0,0.3)',
                transform: `translate(-50%, -50%) rotate(${item.rotation}deg)`,
                opacity: item.alpha,
                pointerEvents: 'none',
                zIndex: 8030,
              }}
            >
              {renderItemIcon()}
            </div>
          );
        })}

      </div>
    </>
  );
}
