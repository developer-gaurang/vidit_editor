import React from 'react';
import { motion } from 'framer-motion';
import { playTick, playClick } from '../utils/audioEffects';

const apps = [
  { name: 'Adobe Premiere Pro', category: 'Narrative Edits & Cuts', color: '#16003b', textColor: '#b9a0ff', border: '#b9a0ff' },
  { name: 'DaVinci Resolve', category: 'Surgical Color Grading', color: '#111827', textColor: '#38bdf8', border: '#38bdf8' },
  { name: 'Adobe After Effects', category: 'VFX & Motion Graphics', color: '#1d003b', textColor: '#eb93ff', border: '#eb93ff' },
  { name: 'Adobe Photoshop', category: 'Textures & Graphic Overlays', color: '#001e36', textColor: '#00a8ff', border: '#00a8ff' },
  { name: 'Figma', category: 'Layout Grids & visual hierarchy', color: '#1e1b4b', textColor: '#f43f5e', border: '#10b981' }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }
};

export default function AboutVidit() {
  return (
    <section id="about" style={{
      padding: '100px 20px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Ambient background glow */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '-10%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, var(--color-primary) 0%, transparent 70%)',
        opacity: 0.1,
        filter: 'blur(60px)',
        zIndex: 0
      }}></div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        style={{ width: '100%', padding: '0 5vw', margin: '0 auto', position: 'relative', zIndex: 1 }}
      >
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '60px',
          alignItems: 'center',
        }}>
          
          {/* Column 1: Narrative bio */}
          <motion.div variants={itemVariants} className="glass-panel" style={{ padding: '40px', marginBottom: 0 }}>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '13px',
              color: 'var(--color-secondary)',
              fontWeight: '700',
              textTransform: 'uppercase',
              marginBottom: '15px',
              letterSpacing: '2px',
              textShadow: '0 0 10px rgba(176, 38, 255, 0.4)'
            }}>
              // INIT BIO_PROFILE
            </div>

            <h2 style={{
              fontSize: '42px',
              fontFamily: 'var(--font-display)',
              marginBottom: '25px',
              background: 'linear-gradient(135deg, #fff 0%, var(--color-primary) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 20px rgba(0, 240, 255, 0.3)'
            }}>
              ABOUT VIDIT
            </h2>

            <p style={{
              color: 'var(--text-primary)',
              fontSize: '16px',
              lineHeight: '1.8',
              marginBottom: '20px',
              fontWeight: '400',
            }}>
              Hey there! I am Vidit Kesarwani, a video editor and colorist passionate about turning flat, raw clips into high-energy, narrative-driven digital content. I don't just cut frames—I structure sequences to capture attention, align to the beat, and drive retention.
            </p>
            <p style={{
              color: 'var(--text-secondary)',
              fontSize: '15px',
              lineHeight: '1.7',
              marginBottom: '30px',
            }}>
              By combining Figma grids for asset layout, Photoshop for graphic overlays, Premiere/Resolve for surgical cuts, and After Effects for kinetic text transitions, I compile every timeline clip with maximum precision. From reels to brand documentaries, my goal is to deliver export files that stand out in any feed.
            </p>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              marginTop: '30px',
              paddingTop: '25px',
              borderTop: '1px solid var(--border-muted)',
            }}>
              <motion.div 
                animate={{ boxShadow: ['0 0 10px var(--color-primary)', '0 0 25px var(--color-secondary)', '0 0 10px var(--color-primary)'] }}
                transition={{ duration: 4, repeat: Infinity }}
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
                  border: '2px solid rgba(255, 255, 255, 0.2)',
                }}
              />
              <div>
                <div style={{ fontWeight: 'bold', fontSize: '18px', color: '#fff' }}>Vidit Kesarwani</div>
                <div style={{ fontSize: '13px', color: 'var(--color-primary)', fontFamily: 'var(--font-mono)' }}>Editor & Color Science Tech</div>
              </div>
            </div>

            {/* Quick Contact Buttons */}
            <div style={{
              display: 'flex',
              gap: '15px',
              marginTop: '30px',
              flexWrap: 'wrap'
            }}>
              {/* WhatsApp Button */}
              <motion.a
                whileHover={{ scale: 1.05, boxShadow: '0 0 20px #25d366' }}
                whileTap={{ scale: 0.95 }}
                href="https://wa.me/919999999999?text=Hi%20Vidit%2C%20I%20saw%20your%20video%20editing%20portfolio%20and%20would%20love%20to%20discuss%20a%20project!"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => playTick()}
                onMouseDown={() => playClick()}
                style={{
                  flex: 1,
                  minWidth: '110px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  backgroundColor: 'rgba(37, 211, 102, 0.1)',
                  color: '#25d366',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '13px',
                  fontWeight: 'bold',
                  textDecoration: 'none',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  border: '1px solid #25d366',
                  cursor: 'pointer'
                }}
              >
                <span>💬</span> WhatsApp
              </motion.a>

              {/* Call Button */}
              <motion.a
                whileHover={{ scale: 1.05, boxShadow: '0 0 20px var(--color-primary)' }}
                whileTap={{ scale: 0.95 }}
                href="tel:+919999999999"
                onMouseEnter={() => playTick()}
                onMouseDown={() => playClick()}
                style={{
                  flex: 1,
                  minWidth: '110px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  backgroundColor: 'rgba(0, 240, 255, 0.1)',
                  color: 'var(--color-primary)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '13px',
                  fontWeight: 'bold',
                  textDecoration: 'none',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  border: '1px solid var(--color-primary)',
                  cursor: 'pointer'
                }}
              >
                <span>📞</span> Call Now
              </motion.a>
            </div>
          </motion.div>

          {/* Column 2: Creative Skill stack & software */}
          <motion.div variants={itemVariants}>
            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '32px',
              color: '#fff',
              marginBottom: '35px',
              letterSpacing: '1px',
              textShadow: '0 0 15px rgba(255,255,255,0.2)'
            }}>
              CREATIVE PIPELINE
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {apps.map((app, idx) => (
                <motion.div 
                  key={idx}
                  whileHover={{ scale: 1.02, x: 10, backgroundColor: 'rgba(25, 25, 40, 0.8)' }}
                  style={{
                    background: 'rgba(15, 15, 25, 0.5)',
                    border: '1px solid var(--border-muted)',
                    borderRadius: '12px',
                    padding: '20px 24px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
                  }}
                >
                  <div>
                    <h4 style={{ fontSize: '18px', fontWeight: '700', color: '#fff', marginBottom: '4px' }}>{app.name}</h4>
                    <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>{app.category}</span>
                  </div>

                  <div style={{
                    backgroundColor: 'rgba(0, 240, 255, 0.1)',
                    color: 'var(--color-primary)',
                    border: `1px solid var(--color-primary)`,
                    borderRadius: '6px',
                    padding: '6px 12px',
                    fontSize: '11px',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    boxShadow: '0 0 10px rgba(0,240,255,0.2)'
                  }}>
                    READY
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}
