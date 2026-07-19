import React from 'react';
import { playTick, playClick } from '../utils/audioEffects';

const apps = [
  { name: 'Adobe Premiere Pro', category: 'Narrative Edits & Cuts', color: '#16003b', textColor: '#b9a0ff', border: '#b9a0ff' },
  { name: 'DaVinci Resolve', category: 'Surgical Color Grading', color: '#111827', textColor: '#38bdf8', border: '#38bdf8' },
  { name: 'Adobe After Effects', category: 'VFX & Motion Graphics', color: '#1d003b', textColor: '#eb93ff', border: '#eb93ff' },
  { name: 'Adobe Photoshop', category: 'Textures & Graphic Overlays', color: '#001e36', textColor: '#00a8ff', border: '#00a8ff' },
  { name: 'Figma', category: 'Layout Grids & visual hierarchy', color: '#1e1b4b', textColor: '#f43f5e', border: '#10b981' }
];

export default function AboutVidit() {
  return (
    <section id="about" style={{
      padding: '80px 20px',
      backgroundColor: 'var(--bg-deep)',
      borderBottom: '2.5px solid var(--text-primary)',
      backgroundImage: 'linear-gradient(rgba(30, 27, 75, 0.01) 1px, transparent 1px), linear-gradient(90deg, rgba(30, 27, 75, 0.01) 1px, transparent 1px)',
      backgroundSize: '20px 20px',
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        
        {/* Section Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '40px',
          alignItems: 'center',
        }}>
          
          {/* Column 1: Narrative bio */}
          <div style={{
            backgroundColor: 'var(--bg-panel)',
            border: '3px solid var(--text-primary)',
            borderRadius: '12px',
            padding: '35px',
            boxShadow: '6px 6px 0px var(--text-primary)',
          }}>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              color: 'var(--color-secondary)',
              fontWeight: '700',
              textTransform: 'uppercase',
              marginBottom: '10px',
              letterSpacing: '1px',
            }}>
              [ BIO PROFILE ]
            </div>

            <h2 className="title-glow" style={{
              fontSize: '36px',
              fontFamily: 'var(--font-display)',
              marginBottom: '20px',
            }}>
              ABOUT VIDIT
            </h2>

            <p style={{
              color: 'var(--text-primary)',
              fontSize: '15px',
              lineHeight: '1.7',
              marginBottom: '20px',
              fontWeight: '500',
            }}>
              Hey there! I am Vidit Kesarwani, a video editor and colorist passionate about turning flat, raw clips into high-energy, narrative-driven digital content. I don't just cut frames—I structure sequences to capture attention, align to the beat, and drive retention.
            </p>
            <p style={{
              color: 'var(--text-secondary)',
              fontSize: '14px',
              lineHeight: '1.6',
              marginBottom: '20px',
            }}>
              By combining Figma grids for asset layout, Photoshop for graphic overlays, Premiere/Resolve for surgical cuts, and After Effects for kinetic text transitions, I compile every timeline clip with maximum precision. From reels to brand documentaries, my goal is to deliver export files that stand out in any feed.
            </p>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '15px',
              marginTop: '30px',
              paddingTop: '20px',
              borderTop: '2px dashed var(--border-muted)',
            }}>
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, var(--color-primary), var(--color-secondary))',
                border: '2px solid var(--text-primary)',
              }}></div>
              <div>
                <div style={{ fontWeight: 'bold', fontSize: '15px' }}>Vidit Kesarwani</div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>Editor & Color Science Tech</div>
              </div>
            </div>

            {/* Quick Contact Buttons */}
            <div style={{
              display: 'flex',
              gap: '10px',
              marginTop: '20px',
              flexWrap: 'wrap'
            }}>
              {/* WhatsApp Button */}
              <a
                href="https://wa.me/919999999999?text=Hi%20Vidit%2C%20I%20saw%20your%20video%20editing%20portfolio%20and%20would%20love%20to%20discuss%20a%20project!"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => playTick()}
                onMouseDown={() => playClick()}
                style={{
                  flex: 1,
                  minWidth: '100px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  backgroundColor: '#25d366',
                  color: '#ffffff',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  textDecoration: 'none',
                  padding: '10px 14px',
                  borderRadius: '6px',
                  border: '2px solid var(--text-primary)',
                  boxShadow: '3px 3px 0px var(--text-primary)',
                  transition: 'transform 0.1s ease, box-shadow 0.1s ease',
                  cursor: 'pointer'
                }}
                className="contact-btn-hover"
              >
                <span>💬</span> WhatsApp
              </a>

              {/* Instagram Button */}
              <a
                href="https://www.instagram.com/vidit_kesarwani/"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => playTick()}
                onMouseDown={() => playClick()}
                style={{
                  flex: 1,
                  minWidth: '100px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
                  color: '#ffffff',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  textDecoration: 'none',
                  padding: '10px 14px',
                  borderRadius: '6px',
                  border: '2px solid var(--text-primary)',
                  boxShadow: '3px 3px 0px var(--text-primary)',
                  transition: 'transform 0.1s ease, box-shadow 0.1s ease',
                  cursor: 'pointer'
                }}
                className="contact-btn-hover"
              >
                <span>📸</span> Instagram
              </a>

              {/* Call Button */}
              <a
                href="tel:+919999999999"
                onMouseEnter={() => playTick()}
                onMouseDown={() => playClick()}
                style={{
                  flex: 1,
                  minWidth: '100px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  backgroundColor: 'var(--color-primary)',
                  color: '#ffffff',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  textDecoration: 'none',
                  padding: '10px 14px',
                  borderRadius: '6px',
                  border: '2px solid var(--text-primary)',
                  boxShadow: '3px 3px 0px var(--text-primary)',
                  transition: 'transform 0.1s ease, box-shadow 0.1s ease',
                  cursor: 'pointer'
                }}
                className="contact-btn-hover"
              >
                <span>📞</span> Call Now
              </a>
            </div>
          </div>

          {/* Column 2: Creative Skill stack & software */}
          <div>
            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '26px',
              color: 'var(--text-primary)',
              marginBottom: '25px',
              letterSpacing: '-1px',
            }}>
              CREATIVE PIPELINE & APPS
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {apps.map((app, idx) => (
                <div 
                  key={idx}
                  style={{
                    backgroundColor: 'var(--bg-panel)',
                    border: '2px solid var(--text-primary)',
                    borderRadius: '8px',
                    padding: '16px 20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    transition: 'all 0.2s ease',
                    boxShadow: '3px 3px 0px var(--text-primary)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '5px 5px 0px var(--color-primary)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '3px 3px 0px var(--text-primary)';
                  }}
                >
                  <div>
                    <h4 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-primary)' }}>{app.name}</h4>
                    <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{app.category}</span>
                  </div>

                  <div style={{
                    backgroundColor: app.color,
                    color: app.textColor,
                    border: `1.5px solid ${app.border}`,
                    borderRadius: '4px',
                    padding: '4px 8px',
                    fontSize: '10px',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                  }}>
                    READY
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
