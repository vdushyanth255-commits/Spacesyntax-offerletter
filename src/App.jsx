import React, { useState, useEffect } from 'react';

// ==========================================
// 1. DASHBOARD COMPONENT
// ==========================================
function Dashboard() {
  return (
    <div>
      <h2>📊 HR Performance Dashboard</h2>
      <p style={{ color: '#64748b', marginBottom: '20px' }}>Real-time overview of offer letter lifecycles and recruitment activity feed.</p>
      
      <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
        <div style={{ background: '#eff6ff', padding: '20px', borderRadius: '8px', flex: 1, borderLeft: '5px solid #3b82f6' }}>
          <h3 style={{ margin: '0 0 5px 0', fontSize: '16px', color: '#1e40af' }}>Drafts</h3>
          <p style={{ fontSize: '28px', fontWeight: 'bold', margin: 0, color: '#1e3a8a' }}>3</p>
        </div>
        <div style={{ background: '#fef9c3', padding: '20px', borderRadius: '8px', flex: 1, borderLeft: '5px solid #eab308' }}>
          <h3 style={{ margin: '0 0 5px 0', fontSize: '16px', color: '#713f12' }}>Sent</h3>
          <p style={{ fontSize: '28px', fontWeight: 'bold', margin: 0, color: '#451a03' }}>12</p>
        </div>
        <div style={{ background: '#dcfce7', padding: '20px', borderRadius: '8px', flex: 1, borderLeft: '5px solid #22c55e' }}>
          <h3 style={{ margin: '0 0 5px 0', fontSize: '16px', color: '#14532d' }}>Accepted</h3>
          <p style={{ fontSize: '28px', fontWeight: 'bold', margin: 0, color: '#052e16' }}>8</p>
        </div>
        <div style={{ background: '#fee2e2', padding: '20px', borderRadius: '8px', flex: 1, borderLeft: '5px solid #ef4444' }}>
          <h3 style={{ margin: '0 0 5px 0', fontSize: '16px', color: '#7f1d1d' }}>Rejected</h3>
          <p style={{ fontSize: '28px', fontWeight: 'bold', margin: 0, color: '#450a0a' }}>1</p>
        </div>
      </div>

      <h3>Recent System Activity Log</h3>
      <ul style={{ lineHeight: '2', background: '#f8fafc', padding: '20px 20px 20px 40px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
        <li>📄 Offer letter draft initialized for <strong>John Doe</strong> (Software Engineer)</li>
        <li>✅ <strong>Jane Smith</strong> shifted status from Sent to <em style={{ color: 'green' }}>Accepted</em></li>
      </ul>
    </div>
  );
}

// ==========================================
// 2. TEMPLATE BUILDER COMPONENT
// ==========================================
function TemplateBuilder() {
  const [templateName, setTemplateName] = useState('');
  const [templateBody, setTemplateBody] = useState('');
  const standardPlaceholders = ['name', 'salary', 'doj', 'designation', 'department'];

  const insertPlaceholder = (tag) => {
    setTemplateBody((prev) => prev + ` {{${tag}}}`);
  };

  const handleSave = () => {
    if (!templateName.trim() || !templateBody.trim()) {
      alert("Please fill out both the template name and body content.");
      return;
    }
    alert(`Template "${templateName}" saved successfully layout!`);
  };

  return (
    <div>
      <h2>📝 Template Workspace Builder</h2>
      <p style={{ color: '#64748b', marginBottom: '20px' }}>Construct reusable dynamic layouts with automated placeholder enforcement.</p>

      <div style={{ marginBottom: '25px' }}>
        <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px' }}>Template Title</label>
        <input type="text" placeholder="e.g., Engineering Team Layout" value={templateName} onChange={(e) => setTemplateName(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} />
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px' }}>Click to Inject Syntax Variables:</label>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {standardPlaceholders.map((token) => (
            <button key={token} type="button" onClick={() => insertPlaceholder(token)} style={{ background: '#e2e8f0', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontWeight: '500', color: '#334155' }}>
              +{token}
            </button>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: '25px' }}>
        <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px' }}>Letter Body Layout (Plaintext or Raw HTML)</label>
        <textarea rows="10" placeholder="Dear {{name}}, we are thrilled to offer you the role of {{designation}}..." value={templateBody} onChange={(e) => setTemplateBody(e.target.value)} style={{ width: '100%', padding: '15px', borderRadius: '6px', border: '1px solid #cbd5e1', fontFamily: 'monospace', fontSize: '14px', boxSizing: 'border-box', lineHeight: '1.5' }} />
      </div>

      <button onClick={handleSave} style={{ background: '#22c55e', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>💾 Save Master Template</button>
    </div>
  );
}

// ==========================================
// 3. TEMPLATE LIST COMPONENT (INTEGRATED)
// ==========================================
function TemplateList() {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/templates')
      .then(res => res.json())
      .then(data => {
        setTemplates(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching templates:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading system templates from live database server...</p>;

  return (
    <div>
      <h2>📁 Managed Template Registry</h2>
      <p style={{ color: '#64748b', marginBottom: '20px' }}>Loaded straight from backend API server structure.</p>
      
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr style={{ background: '#f1f5f9', borderBottom: '2px solid #cbd5e1' }}>
            <th style={{ padding: '12px' }}>ID</th>
            <th style={{ padding: '12px' }}>Template Name</th>
            <th style={{ padding: '12px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {templates.map((t) => (
            <tr key={t.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '12px' }}>{t.id}</td>
              <td style={{ padding: '12px', fontWeight: '600' }}>{t.name}</td>
              <td style={{ padding: '12px' }}>
                <span style={{ color: '#3b82f6', fontWeight: '600' }}>Active Registry Link</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ==========================================
// 4. CANDIDATE FORM COMPONENT (INTEGRATED POST API)
// ==========================================
function CandidateForm() {
  const [formData, setFormData] = useState({ fullName: '', email: '', phone: '', designation: '', department: '', joiningDate: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.joiningDate) {
      alert("Missing Required Fields: Name, Email, and Anticipated Joining Date are required.");
      return;
    }

    // Hit your live Express server node route!
    fetch('http://localhost:5000/api/candidates', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    .then(async (res) => {
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Server transaction error occurred.");
      }
      alert(`Success: ${data.message}`);
      setFormData({ fullName: '', email: '', phone: '', designation: '', department: '', joiningDate: '' }); // reset form
    })
    .catch((err) => {
      alert(err.message);
    });
  };

  return (
    <div>
      <h2>👤 Live Candidate Profiling & Registration</h2>
      <p style={{ color: '#64748b', marginBottom: '20px' }}>Submitting data directly into your running backend engine layout instance.</p>

      <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', maxWidth: '800px' }}>
        <div>
          <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px' }}>Full Legal Name</label>
          <input type="text" name="fullName" placeholder="John Doe" value={formData.fullName} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
        </div>
        <div>
          <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px' }}>Email Address (Unique Constraint)</label>
          <input type="email" name="email" placeholder="john@company.com" value={formData.email} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
        </div>
        <div>
          <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px' }}>Contact Phone</label>
          <input type="text" name="phone" placeholder="+91 9876543210" value={formData.phone} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
        </div>
        <div>
          <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px' }}>Corporate Designation</label>
          <input type="text" name="designation" placeholder="Systems Engineer" value={formData.designation} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
        </div>
        <div>
          <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px' }}>Department Unit</label>
          <input type="text" name="department" placeholder="Cloud Infrastructures" value={formData.department} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
        </div>
        <div>
          <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px' }}>Target Joining Date (Future Timeline)</label>
          <input type="date" name="joiningDate" value={formData.joiningDate} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
        </div>
        <div style={{ gridColumn: 'span 2' }}>
          <button type="submit" style={{ background: '#3b82f6', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>➕ Send to Live Database</button>
        </div>
      </form>
    </div>
  );
}

// ==========================================
// 5. OFFER GENERATION COMPONENT (INTEGRATED GET ENDPOINT)
// ==========================================
function OfferGeneration() {
  const [candidateId, setCandidateId] = useState('');
  const [templateId, setTemplateId] = useState('');
  const [salary, setSalary] = useState('');
  const [mergedOutput, setMergedOutput] = useState('');

  const [candidates, setCandidates] = useState([]);
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    // Load live templates and candidates concurrently
    fetch('http://localhost:5000/api/candidates').then(res => res.json()).then(data => setCandidates(data));
    fetch('http://localhost:5000/api/templates').then(res => res.json()).then(data => setTemplates(data));
  }, []);

  const handleMerge = () => {
    if (!candidateId || !templateId || !salary) {
      alert("Please assign a candidate target profile, template layout, and raw wage variables first.");
      return;
    }
    const c = candidates.find(item => item.id === candidateId);
    const t = templates.find(item => item.id === templateId);

    let result = t.body
      .replace('{{name}}', c.fullName)
      .replace('{{designation}}', c.designation)
      .replace('{{department}}', c.department)
      .replace('{{salary}}', salary);

    setMergedOutput(result);
  };

  return (
    <div>
      <h2>⚡ Live Integration Data-Binding Portal</h2>
      <p style={{ color: '#64748b', marginBottom: '20px' }}>Pulls real profiles directly out of your active Node engine instance.</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div>
            <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px' }}>Target Database Candidate</label>
            <select value={candidateId} onChange={(e) => setCandidateId(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }}>
              <option value="">-- Assign From Server --</option>
              {candidates.map(c => <option key={c.id} value={c.id}>{c.fullName} ({c.designation})</option>)}
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px' }}>Base Contract Blueprint</label>
            <select value={templateId} onChange={(e) => setTemplateId(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }}>
              <option value="">-- Choose From Server --</option>
              {templates.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px' }}>Annual Remuneration ($)</label>
            <input type="number" placeholder="85000" value={salary} onChange={(e) => setSalary(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
          </div>
          <button onClick={handleMerge} style={{ background: '#3b82f6', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>🔄 Bind Layout Blueprint</button>
        </div>

        <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '8px', border: '1px dashed #cbd5e1' }}>
          <h4 style={{ margin: '0 0 10px 0' }}>📄 Aggregated Document Core Preview</h4>
          {mergedOutput ? (
            <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'serif', background: '#fff', padding: '15px', borderRadius: '6px', border: '1px solid #e2e8f0', lineHeight: '1.6' }}>{mergedOutput}</pre>
          ) : (
            <p style={{ color: '#94a3b8', fontStyle: 'italic', textAlign: 'center', marginTop: '60px' }}>Select server data on the left to review documentation structures.</p>
          )}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// REVIEWS / ADJUSTMENTS / LIFE SNAPSHOT PLACARDS
// ==========================================
function OfferEditPreview() { return <div><h2>👁️ Post-Generation Inline Adjustments</h2><p>Simulated PDF parsing structures placeholder layout grid.</p></div>; }
function OfferHistory() { return <div><h2>📜 Historical Snapshot Registry</h2><p>Diff layout hashing logs configuration array block.</p></div>; }

function StatusManagement() {
  const [currentStatus, setCurrentStatus] = useState('Draft');
  return (
    <div>
      <h2>⚙️ Contract Lifecycle State Engine</h2>
      <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#2563eb' }}>Current Status: {currentStatus}</p>
      <button onClick={() => setCurrentStatus('Sent')} style={{ marginTop: '15px', background: '#eab308', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>Move status to Sent ➡️</button>
    </div>
  );
}

// ==========================================
// CENTRAL APP LAYOUT WRAPPER 
// ==========================================
export default function App() {
  const [currentScreen, setCurrentScreen] = useState('dashboard');

  const screens = [
    { id: 'dashboard', name: '📊 Dashboard Dashboard' },
    { id: 'template-builder', name: '📝 Template Builder' },
    { id: 'template-list', name: '📁 Managed Registry' },
    { id: 'candidate-form', name: '👤 Candidate Profile' },
    { id: 'offer-gen', name: '⚡ Generate Offer' },
    { id: 'offer-edit', name: '👁️ Adjust & Preview' },
    { id: 'offer-history', name: '📜 Snapshot History' },
    { id: 'status-mgr', name: '⚙️ Lifecycle Control' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', margin: 0, background: '#f1f5f9' }}>
      <div style={{ width: '260px', background: '#0f172a', color: '#fff', padding: '25px 20px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
        <h2 style={{ fontSize: '20px', margin: '0 0 20px 0', paddingBottom: '15px', borderBottom: '1px solid #334155', color: '#38bdf8' }}>Offer Engine v1.0</h2>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {screens.map((screen) => (
            <button
              key={screen.id}
              onClick={() => setCurrentScreen(screen.id)}
              style={{
                textAlign: 'left', padding: '12px 16px', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '14px',
                background: currentScreen === screen.id ? '#2563eb' : 'transparent',
                color: currentScreen === screen.id ? '#fff' : '#94a3b8',
              }}
            >
              {screen.name}
            </button>
          ))}
        </nav>
      </div>

      <div style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
        <main style={{ background: '#fff', padding: '35px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
          {currentScreen === 'dashboard' && <Dashboard />}
          {currentScreen === 'template-builder' && <TemplateBuilder />}
          {currentScreen === 'template-list' && <TemplateList />}
          {currentScreen === 'candidate-form' && <CandidateForm />}
          {currentScreen === 'offer-gen' && <OfferGeneration />}
          {currentScreen === 'offer-edit' && <OfferEditPreview />}
          {currentScreen === 'offer-history' && <OfferHistory />}
          {currentScreen === 'status-mgr' && <StatusManagement />}
        </main>
      </div>
    </div>
  );
}