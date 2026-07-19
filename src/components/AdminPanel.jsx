import React, { useState, useEffect } from 'react';

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('vidit_admin_auth') === 'true';
  });
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [leads, setLeads] = useState([]);
  
  // Filtering & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [projectFilter, setProjectFilter] = useState('all');

  // Load leads from localStorage
  useEffect(() => {
    if (isAuthenticated) {
      const storedLeads = JSON.parse(localStorage.getItem('vidit_leads') || '[]');
      if (storedLeads.length === 0) {
        const mockLeads = [
          {
            id: 'LEAD-X8F9A2B',
            timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
            status: 'new',
            name: 'Aarav Sharma',
            email: 'aarav@creativecorp.com',
            projectType: 'documentary',
            footageSize: 'large',
            budget: 'cinema',
            message: 'Need a cinematic 12-minute brand documentary edited. Flat LOG color grade required.'
          },
          {
            id: 'LEAD-P3M4R7T',
            timestamp: new Date(Date.now() - 3600000 * 24).toISOString(),
            status: 'contacted',
            name: 'Sophia Miller',
            email: 'sophia.vlogs@gmail.com',
            projectType: 'vlog',
            footageSize: 'medium',
            budget: 'medium',
            message: 'Adventure travel vlog around Bali. Speed ramping and aesthetic transitions.'
          },
          {
            id: 'LEAD-D1H5J8W',
            timestamp: new Date(Date.now() - 3600000 * 72).toISOString(),
            status: 'completed',
            name: 'Dev Rawat',
            email: 'dev@hypebeast.in',
            projectType: 'reel',
            footageSize: 'small',
            budget: 'low',
            message: 'Short 30s streetwear promo edit. Fast-paced glitch transitions aligned to beat.'
          }
        ];
        localStorage.setItem('vidit_leads', JSON.stringify(mockLeads));
        setLeads(mockLeads);
      } else {
        setLeads(storedLeads);
      }
    }
  }, [isAuthenticated]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'viditedits@2026') {
      setIsAuthenticated(true);
      sessionStorage.setItem('vidit_admin_auth', 'true');
      setAuthError('');
    } else {
      setAuthError('INVALID ACCESS KEY. DECRYPTION FAILED.');
      setPassword('');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('vidit_admin_auth');
  };

  const handleStatusChange = (leadId, newStatus) => {
    const updatedLeads = leads.map(lead => {
      if (lead.id === leadId) {
        return { ...lead, status: newStatus };
      }
      return lead;
    });
    setLeads(updatedLeads);
    localStorage.setItem('vidit_leads', JSON.stringify(updatedLeads));
  };

  const handleDeleteLead = (leadId) => {
    if (window.confirm(`Are you sure you want to delete lead sequence ${leadId}?`)) {
      const updatedLeads = leads.filter(lead => lead.id !== leadId);
      setLeads(updatedLeads);
      localStorage.setItem('vidit_leads', JSON.stringify(updatedLeads));
    }
  };

  const handleExportData = () => {
    navigator.clipboard.writeText(JSON.stringify(leads, null, 2))
      .then(() => alert('Database JSON exported to Clipboard!'))
      .catch(() => alert('Failed to export. Please try again.'));
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    const matchesProject = projectFilter === 'all' || lead.projectType === projectFilter;
    return matchesSearch && matchesStatus && matchesProject;
  });

  const totalInquiries = leads.length;
  const newInquiries = leads.filter(l => l.status === 'new').length;
  const contactedInquiries = leads.filter(l => l.status === 'contacted').length;

  const getBudgetValue = (budgetString) => {
    switch (budgetString) {
      case 'low': return 200;
      case 'medium': return 500;
      case 'high': return 1400;
      case 'cinema': return 3000;
      default: return 0;
    }
  };

  const estimatedPipeline = leads.reduce((acc, lead) => acc + getBudgetValue(lead.budget), 0);

  const formatDate = (isoString) => {
    const d = new Date(isoString);
    return `${d.toLocaleDateString()} @ ${d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  };

  return (
    <section style={{
      padding: '80px 20px',
      backgroundColor: 'var(--bg-deep)',
      minHeight: '85vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: isAuthenticated ? 'flex-start' : 'center',
      alignItems: 'center',
    }}>
      
      {/* 1. PASSWORD ACCESS SCREEN */}
      {!isAuthenticated ? (
        <div style={{
          width: '100%',
          maxWidth: '450px',
          backgroundColor: 'var(--bg-panel)',
          border: '3px solid var(--text-primary)',
          borderRadius: '12px',
          padding: '40px 30px',
          boxShadow: '6px 6px 0px var(--text-primary)',
          textAlign: 'center',
        }}>
          {/* Locked SVG Icon */}
          <div style={{
            width: '65px',
            height: '65px',
            borderRadius: '50%',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            border: '3.5px solid var(--text-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 25px auto',
            color: 'var(--text-primary)',
            boxShadow: '2px 2px 0px var(--text-primary)',
          }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>

          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '22px',
            color: 'var(--text-primary)',
            textTransform: 'uppercase',
            marginBottom: '8px',
            letterSpacing: '1px',
          }}>
            ADMIN TERMINAL ACCESS
          </h3>
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '13px',
            color: 'var(--text-secondary)',
            fontWeight: '600',
            marginBottom: '30px',
          }}>
            Enter editing decryption key code to review queue records.
          </p>

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '25px', textAlign: 'left' }}>
              <label className="label-cinematic" htmlFor="admin-pass">Access Password</label>
              <input
                type="password"
                id="admin-pass"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="input-cinematic"
                style={{ textAlign: 'center', letterSpacing: '3px' }}
                autoFocus
                required
              />
            </div>

            {authError && (
              <div style={{
                color: 'var(--color-accent)',
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                fontWeight: 'bold',
                marginBottom: '20px',
                backgroundColor: 'rgba(239,68,68,0.1)',
                padding: '10px',
                borderRadius: '6px',
                border: '2px solid var(--color-accent)',
                boxShadow: '2px 2px 0px var(--text-primary)',
              }}>
                {authError}
              </div>
            )}

            <button
              type="submit"
              className="glow-btn-solid"
              style={{ width: '100%' }}
            >
              DECRYPT SYSTEM DATABASE
            </button>
          </form>

          <div style={{
            marginTop: '30px',
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: 'var(--text-secondary)',
            fontWeight: 'bold',
          }}>
            SYSTEM SECURED | viditedits@2026
          </div>
        </div>
      ) : (
        
        /* 2. ADMIN PORTAL CONTENT */
        <div style={{ maxWidth: '1200px', width: '100%', margin: '0 auto' }}>
          
          {/* Header Panel */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '2.5px solid var(--text-primary)',
            paddingBottom: '25px',
            marginBottom: '40px',
            flexWrap: 'wrap',
            gap: '20px'
          }}>
            <div>
              <h2 className="title-glow" style={{
                fontFamily: 'var(--font-display)',
                fontSize: '36px',
                marginBottom: '5px'
              }}>
                STUDIO RENDER QUEUE
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', fontWeight: '500' }}>
                Secure lead processing pipeline and database organizer dashboard.
              </p>
            </div>
            
            <div style={{ display: 'flex', gap: '15px' }}>
              <button
                onClick={handleExportData}
                className="glow-btn"
                style={{ padding: '8px 18px', fontSize: '12px' }}
              >
                💾 EXPORT JSON
              </button>
              <button
                onClick={handleLogout}
                className="glow-btn"
                style={{ 
                  padding: '8px 18px', 
                  fontSize: '12px',
                  borderColor: 'var(--color-accent)', 
                  color: 'var(--color-accent)'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.boxShadow = '0 0 10px rgba(239, 68, 68, 0.2)';
                  e.currentTarget.style.textShadow = '0 0 2px var(--color-accent)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.textShadow = 'none';
                }}
              >
                🔒 LOCK TERMINAL
              </button>
            </div>
          </div>

          {/* Metrics Row */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '20px',
            marginBottom: '40px'
          }}>
            {[
              { label: 'TOTAL SEQUENCES', val: totalInquiries, color: 'var(--text-primary)' },
              { label: 'NEW LEADS', val: newInquiries, color: 'var(--color-primary)' },
              { label: 'ACTIVE DISCUSSIONS', val: contactedInquiries, color: 'var(--color-secondary)' },
              { label: 'PIPELINE ESTIMATE', val: `$${estimatedPipeline}`, color: 'var(--color-success)' }
            ].map((metric, i) => (
              <div 
                key={i}
                style={{
                  backgroundColor: 'var(--bg-panel)',
                  border: '2.5px solid var(--text-primary)',
                  borderRadius: '10px',
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  boxShadow: '4px 4px 0px var(--text-primary)',
                }}
              >
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 'bold', letterSpacing: '1px' }}>
                  {metric.label}
                </span>
                <span style={{ fontSize: '28px', fontWeight: 'bold', color: metric.color, fontFamily: 'var(--font-mono)' }}>
                  {metric.val}
                </span>
              </div>
            ))}
          </div>

          {/* Search, Filter Tools */}
          <div style={{
            backgroundColor: 'var(--bg-panel)',
            border: '2.5px solid var(--text-primary)',
            borderRadius: '10px',
            padding: '20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '30px',
            flexWrap: 'wrap',
            gap: '15px',
            boxShadow: '4px 4px 0px var(--text-primary)',
          }}>
            {/* Search Input */}
            <div style={{ flex: 1, minWidth: '250px' }}>
              <input
                type="text"
                placeholder="🔍 Search Leads (ID, Name, Email...)"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="input-cinematic"
                style={{ padding: '10px 15px', fontSize: '14px', boxShadow: 'none' }}
              />
            </div>

            {/* Filter Dropdowns */}
            <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
              {/* Status */}
              <div>
                <select
                  value={statusFilter}
                  onChange={e => setStatusFilter(e.target.value)}
                  className="input-cinematic"
                  style={{ padding: '10px 15px', fontSize: '14px', cursor: 'pointer', minWidth: '150px', boxShadow: 'none' }}
                >
                  <option value="all">📁 All Statuses</option>
                  <option value="new">🆕 New</option>
                  <option value="contacted">💬 Contacted</option>
                  <option value="completed">✅ Completed</option>
                </select>
              </div>

              {/* Project Type */}
              <div>
                <select
                  value={projectFilter}
                  onChange={e => setProjectFilter(e.target.value)}
                  className="input-cinematic"
                  style={{ padding: '10px 15px', fontSize: '14px', cursor: 'pointer', minWidth: '170px', boxShadow: 'none' }}
                >
                  <option value="all">🎬 All Project Types</option>
                  <option value="reel">Instagram/Tiktok Reel</option>
                  <option value="youtube">YouTube Longform</option>
                  <option value="commercial">Commercial Promo</option>
                  <option value="documentary">Cinematic Documentary</option>
                  <option value="vlog">Travel Vlog</option>
                  <option value="other">Custom/Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* Leads Grid/Table List */}
          {filteredLeads.length === 0 ? (
            <div style={{
              backgroundColor: 'var(--bg-panel)',
              border: '3px dashed var(--text-primary)',
              borderRadius: '8px',
              padding: '60px 20px',
              textAlign: 'center',
              color: 'var(--text-secondary)',
              fontSize: '15px',
              fontFamily: 'var(--font-mono)',
              boxShadow: '4px 4px 0px var(--text-primary)',
            }}>
              NO RENDER SEQUENCE INQUIRIES FOUND MATCHING CRITERIA.
            </div>
          ) : (
            <div style={{ overflowX: 'auto', width: '100%' }}>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Lead ID</th>
                    <th>Date Received</th>
                    <th>Contact Info</th>
                    <th>Project & Budget</th>
                    <th>Editing Requirements</th>
                    <th>Status Queue</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLeads.map((lead) => (
                    <tr key={lead.id}>
                      {/* ID */}
                      <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 'bold', color: 'var(--text-primary)' }}>
                        {lead.id}
                      </td>

                      {/* Date */}
                      <td style={{ fontSize: '12px', fontWeight: '500' }}>
                        {formatDate(lead.timestamp)}
                      </td>

                      {/* Contact */}
                      <td>
                        <div style={{ fontWeight: '700', color: 'var(--text-primary)', marginBottom: '3px' }}>
                          {lead.name}
                        </div>
                        <div style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: '500' }}>
                          {lead.email}
                        </div>
                      </td>

                      {/* Project Tech Specs */}
                      <td>
                        <div style={{ fontWeight: '700', color: 'var(--color-primary)', textTransform: 'capitalize' }}>
                          {lead.projectType.replace('_', ' ')}
                        </div>
                        <div style={{ fontSize: '11px', display: 'flex', gap: '8px', marginTop: '3px' }}>
                          <span style={{ color: 'var(--text-secondary)', fontWeight: 'bold' }}>
                            Raw: {lead.footageSize.toUpperCase()}
                          </span>
                          <span style={{ color: 'var(--color-success)', fontWeight: 'bold' }}>
                            {lead.budget.toUpperCase()} BUDGET
                          </span>
                        </div>
                      </td>

                      {/* Details */}
                      <td style={{ maxWidth: '280px', fontSize: '13px', lineHeight: '1.4', fontWeight: '500', color: 'var(--text-primary)' }}>
                        {lead.message}
                      </td>

                      {/* Queue Status Selection */}
                      <td>
                        <select
                          value={lead.status}
                          onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                          style={{
                            backgroundColor: lead.status === 'new' ? 'rgba(37, 99, 235, 0.1)' : lead.status === 'contacted' ? 'rgba(236, 72, 153, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                            color: lead.status === 'new' ? 'var(--color-primary)' : lead.status === 'contacted' ? 'var(--color-secondary)' : 'var(--color-success)',
                            border: '2px solid var(--text-primary)',
                            padding: '6px 10px',
                            borderRadius: '6px',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '11px',
                            fontWeight: 'bold',
                            textTransform: 'uppercase',
                            cursor: 'pointer',
                            boxShadow: '1.5px 1.5px 0px var(--text-primary)',
                          }}
                        >
                          <option value="new">🆕 NEW</option>
                          <option value="contacted">💬 CONTACTED</option>
                          <option value="completed">✅ COMPLETED</option>
                        </select>
                      </td>

                      {/* Actions */}
                      <td>
                        <button
                          onClick={() => handleDeleteLead(lead.id)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: 'var(--color-accent)',
                            fontSize: '18px',
                            cursor: 'pointer',
                            padding: '4px 8px',
                            transition: 'transform 0.2s',
                          }}
                          onMouseEnter={e => e.target.style.transform = 'scale(1.2)'}
                          onMouseLeave={e => e.target.style.transform = 'scale(1.0)'}
                        >
                          🗑
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </div>
      )}

    </section>
  );
}
