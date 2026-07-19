import React, { useState } from 'react';
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

  return (
    <section style={{
      padding: '80px 20px',
      backgroundColor: 'var(--bg-deep)',
      borderBottom: '2.5px solid var(--text-primary)',
      position: 'relative',
    }}>
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: 'radial-gradient(circle at 10% 90%, rgba(37, 99, 235, 0.05) 0%, transparent 50%)',
        pointerEvents: 'none',
      }}></div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', zIndex: 10, position: 'relative' }}>
        
        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '45px' }}>
          <h2 className="title-glow" style={{
            fontFamily: 'var(--font-display)',
            fontSize: '42px',
            marginBottom: '15px'
          }}>
            START A NEW PROJECT
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '550px', margin: '0 auto', fontWeight: '500' }}>
            Submit your sequence requirements, and let’s construct a visual masterpiece. Leads flow directly into the render queue admin dashboard.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '40px',
          alignItems: 'start'
        }}>
          {/* Left Column: Quick channels */}
          <div style={{
            backgroundColor: 'var(--bg-panel)',
            border: '3px solid var(--text-primary)',
            borderRadius: '12px',
            padding: '35px',
            boxShadow: '6px 6px 0px var(--text-primary)',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}>
            <div>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                color: 'var(--color-secondary)',
                fontWeight: '700',
                textTransform: 'uppercase',
                marginBottom: '10px',
                letterSpacing: '1px',
              }}>
                [ DIRECT CHANNELS ]
              </div>
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '28px',
                color: 'var(--text-primary)',
                marginBottom: '15px'
              }}>
                INSTANT CONNECT
              </h3>
              <p style={{
                color: 'var(--text-secondary)',
                fontSize: '14px',
                lineHeight: '1.6',
                fontWeight: '500'
              }}>
                Skip the render settings form and talk to Vidit directly via chat or voice. Ideal for urgent edits, quick consultation, or direct bookings.
              </p>
            </div>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '15px'
            }}>
              {/* WhatsApp Option Card */}
              <a
                href="https://wa.me/919999999999?text=Hi%20Vidit%2C%20I%20saw%20your%20video%20editing%20portfolio%20and%20would%20love%20to%20discuss%20a%20project!"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => playTick()}
                onMouseDown={() => playClick()}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px',
                  backgroundColor: 'var(--bg-deep)',
                  border: '2px solid var(--text-primary)',
                  borderRadius: '8px',
                  padding: '18px',
                  textDecoration: 'none',
                  color: 'var(--text-primary)',
                  boxShadow: '3px 3px 0px var(--text-primary)',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer'
                }}
                className="contact-btn-hover"
              >
                <div style={{
                  width: '45px',
                  height: '45px',
                  borderRadius: '8px',
                  backgroundColor: '#25d366',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px',
                  border: '2.5px solid var(--text-primary)',
                  flexShrink: 0
                }}>
                  💬
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: '15px', fontWeight: 'bold', fontFamily: 'var(--font-mono)' }}>WHATSAPP DIRECT</h4>
                  <span style={{ fontSize: '11px', color: 'var(--text-secondary)', display: 'block' }}>Instant chat, average response: 15 mins</span>
                </div>
              </a>

              {/* Instagram Option Card */}
              <a
                href="https://www.instagram.com/vidit_kesarwani/"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => playTick()}
                onMouseDown={() => playClick()}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px',
                  backgroundColor: 'var(--bg-deep)',
                  border: '2px solid var(--text-primary)',
                  borderRadius: '8px',
                  padding: '18px',
                  textDecoration: 'none',
                  color: 'var(--text-primary)',
                  boxShadow: '3px 3px 0px var(--text-primary)',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer'
                }}
                className="contact-btn-hover"
              >
                <div style={{
                  width: '45px',
                  height: '45px',
                  borderRadius: '8px',
                  background: 'conic-gradient(from 180deg at 50% 50%, #B930B5 0deg, #E02F53 100deg, #F57D25 200deg, #B930B5 360deg)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px',
                  border: '2.5px solid var(--text-primary)',
                  flexShrink: 0
                }}>
                  📸
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: '15px', fontWeight: 'bold', fontFamily: 'var(--font-mono)' }}>INSTAGRAM PROFILE</h4>
                  <span style={{ fontSize: '11px', color: 'var(--text-secondary)', display: 'block' }}>View reels & send direct message</span>
                </div>
              </a>

              {/* Voice Call Option Card */}
              <a
                href="tel:+919999999999"
                onMouseEnter={() => playTick()}
                onMouseDown={() => playClick()}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px',
                  backgroundColor: 'var(--bg-deep)',
                  border: '2px solid var(--text-primary)',
                  borderRadius: '8px',
                  padding: '18px',
                  textDecoration: 'none',
                  color: 'var(--text-primary)',
                  boxShadow: '3px 3px 0px var(--text-primary)',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer'
                }}
                className="contact-btn-hover"
              >
                <div style={{
                  width: '45px',
                  height: '45px',
                  borderRadius: '8px',
                  backgroundColor: 'var(--color-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px',
                  border: '2.5px solid var(--text-primary)',
                  flexShrink: 0
                }}>
                  📞
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: '15px', fontWeight: 'bold', fontFamily: 'var(--font-mono)' }}>TELEPHONE CALL</h4>
                  <span style={{ fontSize: '11px', color: 'var(--text-secondary)', display: 'block' }}>Speak directly, standard charges apply</span>
                </div>
              </a>
            </div>
          </div>

          {/* Right Column: Form / Success Dialog */}
          <div>
            {submitted ? (
              <div style={{
                backgroundColor: 'var(--bg-panel)',
                border: '3px solid var(--color-success)',
                borderRadius: '12px',
                padding: '40px 30px',
                textAlign: 'center',
                boxShadow: '6px 6px 0px var(--color-success)',
                animation: 'floatSlow 6s ease-in-out infinite',
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(16, 185, 129, 0.15)',
                  border: '3px solid var(--color-success)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px auto',
                  boxShadow: '2px 2px 0px var(--color-success)',
                }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-success)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h4 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '24px',
                  color: 'var(--text-primary)',
                  marginBottom: '10px',
                  textTransform: 'uppercase',
                }}>
                  Lead Export Successful
                </h4>
                <p style={{
                  color: 'var(--text-secondary)',
                  fontSize: '15px',
                  lineHeight: '1.6',
                  maxWidth: '500px',
                  margin: '0 auto 25px auto',
                  fontWeight: '500',
                }}>
                  Your request has been successfully recorded in Vidit’s project queue. The editor will analyze your reference cuts and reach out shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="glow-btn"
                >
                  Add Another Edit Sequence
                </button>
              </div>
            ) : (
              /* Contact Form Layout */
              <form 
                onSubmit={handleSubmit}
                style={{
                  backgroundColor: 'var(--bg-panel)',
                  border: '3px solid var(--text-primary)',
                  borderRadius: '12px',
                  padding: '35px',
                  boxShadow: '6px 6px 0px var(--text-primary)',
                }}
              >
                {error && (
                  <div style={{
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    border: '2px solid var(--color-accent)',
                    borderRadius: '6px',
                    padding: '12px',
                    fontSize: '14px',
                    color: 'var(--color-accent)',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 'bold',
                    marginBottom: '25px',
                    boxShadow: '2px 2px 0px var(--text-primary)',
                  }}>
                    ⚠ ERROR: {error}
                  </div>
                )}

                {/* Row 1: Name and Email */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '25px',
                  marginBottom: '25px',
                }}>
                  <div>
                    <label className="label-cinematic" htmlFor="name">Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. John Doe"
                      className="input-cinematic"
                      required
                    />
                  </div>
                  <div>
                    <label className="label-cinematic" htmlFor="email">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. john@brand.com"
                      className="input-cinematic"
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
                    <label className="label-cinematic" htmlFor="projectType">Sequence / Project Type</label>
                    <select
                      id="projectType"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      className="input-cinematic"
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
                    <label className="label-cinematic" htmlFor="footageSize">Raw Footage Volume</label>
                    <select
                      id="footageSize"
                      name="footageSize"
                      value={formData.footageSize}
                      onChange={handleChange}
                      className="input-cinematic"
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
                  <label className="label-cinematic" htmlFor="budget">Estimated Edit Budget</label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="input-cinematic"
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
                  <label className="label-cinematic" htmlFor="message">Sequence Details & reference links *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Briefly describe the story, pacing speed, dynamic transitions, color tone requirements, and reference link cuts if any..."
                    className="input-cinematic"
                    rows="5"
                    style={{ resize: 'vertical' }}
                    required
                  />
                </div>

                {/* Submit Button */}
                <div style={{ textAlign: 'right' }}>
                  <button
                    type="submit"
                    className="glow-btn-solid"
                    style={{ width: '100%' }}
                  >
                    COMPILE & EXPORT LEAD
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
