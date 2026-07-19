import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { playTick, playClick, playChime, playError, playKeyboard } from '../utils/audioEffects';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'reel',
    footageSize: 'medium',
    budget: 'medium',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    playKeyboard();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError('Please fill in all required fields (Name, Email, Project Details).');
      playError();
      return;
    }

    try {
      const newLead = {
        id: 'LEAD-' + Math.random().toString(36).substring(2, 9).toUpperCase(),
        timestamp: new Date().toISOString(),
        status: 'new',
        ...formData
      };

      const existingLeads = JSON.parse(localStorage.getItem('vidit_leads') || '[]');
      existingLeads.unshift(newLead);
      localStorage.setItem('vidit_leads', JSON.stringify(existingLeads));

      playChime();
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        projectType: 'reel',
        footageSize: 'medium',
        budget: 'medium',
        message: '',
      });
    } catch (err) {
      console.error('Localstorage error:', err);
      setError('Something went wrong saving the inquiry. Please try again.');
      playError();
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <section style={{
      padding: '100px 20px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background glow */}
      <div style={{
        position: 'absolute',
        bottom: '-10%',
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
        viewport={{ once: true, amount: 0.1 }}
        style={{ width: '100%', padding: '0 5vw', margin: '0 auto', zIndex: 10, position: 'relative' }}
      >
        
        {/* Title */}
        <motion.div variants={itemVariants} style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '48px',
            marginBottom: '15px',
            background: 'linear-gradient(135deg, #fff 0%, var(--color-primary) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 0 30px rgba(0, 240, 255, 0.4)'
          }}>
            START A NEW PROJECT
          </h2>
          <p style={{ color: 'var(--text-secondary)', margin: '0 auto', fontSize: '16px' }}>
            Submit your sequence requirements, and let’s construct a visual masterpiece. Leads flow directly into the render queue admin dashboard.
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '40px',
          alignItems: 'start'
        }}>
          {/* Left Column: Quick channels */}
          <motion.div variants={itemVariants} style={{
            background: 'rgba(15, 15, 25, 0.5)',
            border: '1px solid var(--border-muted)',
            borderRadius: '16px',
            padding: '40px',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.2)',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}>
            <div>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '13px',
                color: 'var(--color-secondary)',
                fontWeight: '700',
                textTransform: 'uppercase',
                marginBottom: '10px',
                letterSpacing: '2px',
              }}>
                // DIRECT CHANNELS
              </div>
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '32px',
                color: '#fff',
                marginBottom: '15px'
              }}>
                INSTANT CONNECT
              </h3>
              <p style={{
                color: 'var(--text-secondary)',
                fontSize: '15px',
                lineHeight: '1.6',
                fontWeight: '400'
              }}>
                Skip the render settings form and talk to Vidit directly via chat or voice. Ideal for urgent edits, quick consultation, or direct bookings.
              </p>
            </div>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '15px',
              marginTop: '15px'
            }}>
              {/* WhatsApp Option Card */}
              <motion.a
                whileHover={{ scale: 1.02, x: 10, borderColor: '#25d366', boxShadow: '0 0 15px rgba(37,211,102,0.2)' }}
                href="https://wa.me/919999999999?text=Hi%20Vidit%2C%20I%20saw%20your%20video%20editing%20portfolio%20and%20would%20love%20to%20discuss%20a%20project!"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => playTick()}
                onMouseDown={() => playClick()}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px',
                  background: 'rgba(0, 0, 0, 0.2)',
                  border: '1px solid var(--border-muted)',
                  borderRadius: '12px',
                  padding: '20px',
                  textDecoration: 'none',
                  color: '#fff',
                  cursor: 'pointer'
                }}
              >
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '12px',
                  background: 'rgba(37, 211, 102, 0.1)',
                  color: '#25d366',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  border: '1px solid rgba(37, 211, 102, 0.3)',
                  flexShrink: 0
                }}>
                  💬
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: '16px', fontWeight: 'bold', fontFamily: 'var(--font-mono)' }}>WHATSAPP DIRECT</h4>
                  <span style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'block' }}>Instant chat, avg response: 15 mins</span>
                </div>
              </motion.a>

              {/* Instagram Option Card */}
              <motion.a
                whileHover={{ scale: 1.02, x: 10, borderColor: 'var(--color-secondary)', boxShadow: '0 0 15px rgba(185,48,181,0.2)' }}
                href="https://www.instagram.com/vidit_kesarwani/"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => playTick()}
                onMouseDown={() => playClick()}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px',
                  background: 'rgba(0, 0, 0, 0.2)',
                  border: '1px solid var(--border-muted)',
                  borderRadius: '12px',
                  padding: '20px',
                  textDecoration: 'none',
                  color: '#fff',
                  cursor: 'pointer'
                }}
              >
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '12px',
                  background: 'rgba(185, 48, 181, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  border: '1px solid rgba(185, 48, 181, 0.3)',
                  flexShrink: 0
                }}>
                  📸
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: '16px', fontWeight: 'bold', fontFamily: 'var(--font-mono)' }}>INSTAGRAM PROFILE</h4>
                  <span style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'block' }}>View reels & send DM</span>
                </div>
              </motion.a>
            </div>
          </motion.div>

          {/* Right Column: Form / Success Dialog */}
          <motion.div variants={itemVariants}>
            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  background: 'rgba(16, 185, 129, 0.05)',
                  border: '1px solid var(--color-success)',
                  borderRadius: '16px',
                  padding: '50px 30px',
                  textAlign: 'center',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 0 40px rgba(16, 185, 129, 0.15)',
                }}>
                <motion.div 
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  style={{
                    width: '70px',
                    height: '70px',
                    borderRadius: '50%',
                    background: 'rgba(16, 185, 129, 0.15)',
                    border: '2px solid var(--color-success)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 25px auto',
                    boxShadow: '0 0 20px rgba(16, 185, 129, 0.3)',
                  }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-success)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </motion.div>
                <h4 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '28px',
                  color: '#fff',
                  marginBottom: '15px',
                  textTransform: 'uppercase',
                }}>
                  Lead Export Successful
                </h4>
                <p style={{
                  color: 'var(--text-secondary)',
                  fontSize: '16px',
                  lineHeight: '1.6',
                  maxWidth: '500px',
                  margin: '0 auto 30px auto',
                }}>
                  Your request has been successfully recorded in Vidit’s project queue. The editor will analyze your reference cuts and reach out shortly.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSubmitted(false)}
                  style={{
                    background: 'var(--color-primary)',
                    color: '#000',
                    border: 'none',
                    padding: '14px 30px',
                    borderRadius: '8px',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    boxShadow: '0 0 20px rgba(0, 240, 255, 0.4)'
                  }}
                >
                  START NEW SEQUENCE
                </motion.button>
              </motion.div>
            ) : (
              /* Contact Form Layout */
              <form 
                onSubmit={handleSubmit}
                style={{
                  background: 'rgba(15, 15, 25, 0.5)',
                  border: '1px solid var(--border-muted)',
                  borderRadius: '16px',
                  padding: '40px',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.2)',
                }}
              >
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                      background: 'rgba(239, 68, 68, 0.1)',
                      border: '1px solid var(--color-accent)',
                      borderRadius: '8px',
                      padding: '15px',
                      fontSize: '14px',
                      color: 'var(--color-accent)',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 'bold',
                      marginBottom: '25px',
                      boxShadow: '0 0 15px rgba(239, 68, 68, 0.2)'
                    }}>
                    ⚠ ERROR: {error}
                  </motion.div>
                )}

                <style>{`
                  .futuristic-input {
                    width: 100%;
                    background: rgba(0, 0, 0, 0.3);
                    border: 1px solid var(--border-muted);
                    color: #fff;
                    padding: 14px 18px;
                    border-radius: 8px;
                    font-family: var(--font-sans);
                    font-size: 15px;
                    transition: all 0.3s ease;
                    outline: none;
                    margin-top: 8px;
                  }
                  .futuristic-input:focus {
                    border-color: var(--color-primary);
                    box-shadow: 0 0 15px rgba(0, 240, 255, 0.2);
                    background: rgba(0, 0, 0, 0.5);
                  }
                  .futuristic-label {
                    font-family: var(--font-mono);
                    font-size: 12px;
                    color: var(--text-secondary);
                    text-transform: uppercase;
                    letter-spacing: 1px;
                  }
                  .futuristic-input option {
                    background: var(--bg-deep);
                    color: #fff;
                  }
                `}</style>

                {/* Row 1: Name and Email */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '25px',
                  marginBottom: '25px',
                }}>
                  <div>
                    <label className="futuristic-label" htmlFor="name">Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. John Doe"
                      className="futuristic-input"
                      required
                    />
                  </div>
                  <div>
                    <label className="futuristic-label" htmlFor="email">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. john@brand.com"
                      className="futuristic-input"
                      required
                    />
                  </div>
                </div>

                {/* Row 2: Project Type and Footage Size */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '25px',
                  marginBottom: '25px',
                }}>
                  <div>
                    <label className="futuristic-label" htmlFor="projectType">Sequence / Project Type</label>
                    <select
                      id="projectType"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      className="futuristic-input"
                      style={{ cursor: 'pointer' }}
                    >
                      <option value="reel">🎬 Instagram Reel / YouTube Shorts</option>
                      <option value="youtube">📹 YouTube Video (Longform)</option>
                      <option value="commercial">🔥 Commercial / Product Promo</option>
                      <option value="documentary">🏔️ Cinematic Documentary</option>
                      <option value="vlog">🧭 Adventure Travel Vlog</option>
                      <option value="other">🎨 Custom Post-Production</option>
                    </select>
                  </div>
                  <div>
                    <label className="futuristic-label" htmlFor="footageSize">Raw Footage Volume</label>
                    <select
                      id="footageSize"
                      name="footageSize"
                      value={formData.footageSize}
                      onChange={handleChange}
                      className="futuristic-input"
                      style={{ cursor: 'pointer' }}
                    >
                      <option value="small">💿 Under 10 GB (Short clips)</option>
                      <option value="medium">📀 10 - 50 GB (Regular vlogs/reels)</option>
                      <option value="large">📁 50 - 200 GB (Multi-cam/events)</option>
                      <option value="extreme">💾 Over 200 GB (Feature film/LOG)</option>
                    </select>
                  </div>
                </div>

                {/* Row 3: Budget Range */}
                <div style={{ marginBottom: '25px' }}>
                  <label className="futuristic-label" htmlFor="budget">Estimated Edit Budget</label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="futuristic-input"
                    style={{ cursor: 'pointer' }}
                  >
                    <option value="low">💳 Under $300 (Single edit/Short reel)</option>
                    <option value="medium">💵 $300 - $800 (Regular Youtube/Premium reels)</option>
                    <option value="high">💶 $800 - $2,000 (Commercial/Corporate campaigns)</option>
                    <option value="cinema">💰 $2,000+ (High-end scaling/Full Grading & Sound Design)</option>
                  </select>
                </div>

                {/* Row 4: Message */}
                <div style={{ marginBottom: '35px' }}>
                  <label className="futuristic-label" htmlFor="message">Sequence Details & reference links *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Briefly describe the story, pacing speed, dynamic transitions, color tone requirements, and reference link cuts if any..."
                    className="futuristic-input"
                    rows="5"
                    style={{ resize: 'vertical' }}
                    required
                  />
                </div>

                {/* Submit Button */}
                <div style={{ textAlign: 'right' }}>
                  <motion.button
                    whileHover={{ scale: 1.02, boxShadow: '0 0 25px rgba(0,240,255,0.5)' }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    style={{ 
                      width: '100%',
                      background: 'var(--color-primary)',
                      color: '#000',
                      border: 'none',
                      padding: '16px',
                      borderRadius: '8px',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '16px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      boxShadow: '0 0 15px rgba(0, 240, 255, 0.3)',
                      transition: 'background 0.3s'
                    }}
                  >
                    COMPILE & EXPORT LEAD
                  </motion.button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
