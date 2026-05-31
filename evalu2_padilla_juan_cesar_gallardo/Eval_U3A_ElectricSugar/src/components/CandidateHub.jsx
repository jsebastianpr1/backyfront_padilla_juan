import { useState, useEffect } from 'react';

export default function CandidateHub() {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filtering states
  const [searchSkill, setSearchSkill] = useState('');
  const [searchCert, setSearchCert] = useState('');
  
  // Modal states
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  
  // Registration form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    gender: 'Prefiero no decirlo',
    comuna: 'Providencia',
    profession: '',
    skills: '',
    certifications: '',
    refName: '',
    refPhone: '',
    refEmail: '',
    refRelation: ''
  });
  
  const [formSuccess, setFormSuccess] = useState('');
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const API_BASE = 'http://localhost:8080/api/usuarios';

  // Fetch candidates from Laravel backend
  const fetchCandidates = () => {
    setLoading(true);
    setError(null);
    
    // Construct query parameters
    const params = new URLSearchParams();
    // In this open recruitment view, we display all candidates.
    // If you want full data, the Laravel API requires role=admin or uses index role parameter
    params.append('role', 'admin'); 
    
    if (searchSkill.trim()) {
      params.append('skill', searchSkill.trim());
    }
    if (searchCert.trim()) {
      params.append('certification', searchCert.trim());
    }
    
    fetch(`${API_BASE}?${params.toString()}`)
      .then((res) => {
        if (!res.ok) throw new Error('No se pudo conectar al servidor ProviEmplea.');
        return res.json();
      })
      .then((json) => {
        if (json.status === 'success') {
          setCandidates(json.data || []);
        } else {
          throw new Error(json.message || 'Error al obtener candidatos.');
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCandidates();
  }, [searchSkill, searchCert]);

  // Toggle candidate active status
  const handleToggleStatus = (id, currentStatus, e) => {
    e.stopPropagation(); // Avoid opening detail modal
    
    const newStatus = !currentStatus;
    
    fetch(`${API_BASE}/${id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ is_active: newStatus })
    })
      .then((res) => {
        if (!res.ok) throw new Error('Error al cambiar el estado en el servidor.');
        return res.json();
      })
      .then((json) => {
        if (json.status === 'success') {
          // Re-fetch or update state locally
          setCandidates(prev => prev.map(c => c.id === id ? { ...c, is_active: json.is_active } : c));
          if (selectedCandidate && selectedCandidate.id === id) {
            setSelectedCandidate(prev => ({ ...prev, is_active: json.is_active }));
          }
        } else {
          alert('No se pudo actualizar el estado: ' + json.message);
        }
      })
      .catch((err) => {
        console.error(err);
        alert('Error al conectar con la API: ' + err.message);
      });
  };

  // Handle register form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle new candidate submission
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setFormError('');
    setFormSuccess('');

    // Prepare payload
    const skillsArray = formData.skills.split(',').map(s => s.trim()).filter(s => s.length > 0);
    const certsArray = formData.certifications.split(',').map(c => c.trim()).filter(c => c.length > 0);
    
    const references = [];
    if (formData.refName.trim()) {
      references.push({
        name: formData.refName.trim(),
        phone: formData.refPhone.trim() || null,
        email: formData.refEmail.trim() || null,
        relation: formData.refRelation.trim() || null
      });
    }

    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      age: formData.age ? parseInt(formData.age, 10) : null,
      gender: formData.gender,
      comuna: formData.comuna.trim(),
      profession: formData.profession.trim(),
      skills: skillsArray,
      certifications: certsArray,
      references: references,
      is_active: true
    };

    fetch(API_BASE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    })
      .then((res) => {
        if (res.status === 400 || res.status === 422) {
          return res.json().then(errData => {
            throw new Error(errData.message || 'Datos de validación inválidos.');
          });
        }
        if (!res.ok) throw new Error('Error al registrar el candidato.');
        return res.json();
      })
      .then((json) => {
        if (json.status === 'success') {
          setFormSuccess('¡Candidato registrado con éxito!');
          // Reset form
          setFormData({
            name: '',
            email: '',
            age: '',
            gender: 'Prefiero no decirlo',
            comuna: 'Providencia',
            profession: '',
            skills: '',
            certifications: '',
            refName: '',
            refPhone: '',
            refEmail: '',
            refRelation: ''
          });
          // Refresh candidate list
          fetchCandidates();
          setTimeout(() => {
            setShowRegisterForm(false);
            setFormSuccess('');
          }, 1500);
        } else {
          throw new Error(json.message || 'Error al guardar.');
        }
        setSubmitting(false);
      })
      .catch((err) => {
        console.error(err);
        setFormError(err.message);
        setSubmitting(false);
      });
  };

  return (
    <div className="candidate-hub-container">
      {/* Search and Action Header */}
      <div className="candidate-header-actions">
        <div className="candidate-filters">
          <div className="filter-input-group">
            <span className="input-icon">🔍</span>
            <input 
              type="text" 
              placeholder="Filtrar por Habilidad (ej: Laravel, React)..." 
              value={searchSkill}
              onChange={(e) => setSearchSkill(e.target.value)}
              className="candidate-search-input"
            />
          </div>
          <div className="filter-input-group">
            <span className="input-icon">🎓</span>
            <input 
              type="text" 
              placeholder="Filtrar por Certificación (ej: AWS, Google)..." 
              value={searchCert}
              onChange={(e) => setSearchCert(e.target.value)}
              className="candidate-search-input"
            />
          </div>
        </div>
        <button 
          className="btn-register-candidate"
          onClick={() => setShowRegisterForm(true)}
        >
          ➕ Registrar Mi Perfil
        </button>
      </div>

      {/* Grid of Candidates */}
      {loading ? (
        <div className="candidate-loading">
          <div className="candidate-mini-spinner"></div>
          <p>Consultando base de datos SQLite de ProviEmplea...</p>
        </div>
      ) : error ? (
        <div className="candidate-error-card">
          <div className="error-icon">⚠️</div>
          <h4>Conexión con ProviEmplea Backend no disponible</h4>
          <p>{error}</p>
          <p className="error-help">Asegúrate de que el servidor backend de Laravel esté encendido en <code>http://localhost:8080</code> mediante el comando <code>php artisan serve --port=8080</code>.</p>
          <button className="btn-retry" onClick={fetchCandidates}>Reintentar Conexión</button>
        </div>
      ) : candidates.length === 0 ? (
        <div className="candidate-empty-card">
          <p>No se encontraron candidatos que coincidan con los filtros de búsqueda.</p>
          <button className="btn-clear-filters" onClick={() => { setSearchSkill(''); setSearchCert(''); }}>Limpiar Filtros</button>
        </div>
      ) : (
        <div className="candidates-grid">
          {candidates.map((candidate) => (
            <div 
              key={candidate.id} 
              className={`candidate-card ${!candidate.is_active ? 'inactive-card' : ''}`}
              onClick={() => setSelectedCandidate(candidate)}
            >
              <div className="candidate-card-header">
                <span className="candidate-profession-tag">{candidate.profession || 'Profesional'}</span>
                <div 
                  className={`status-indicator ${candidate.is_active ? 'status-online' : 'status-offline'}`}
                  title={candidate.is_active ? 'Visible en Vitrina' : 'Oculto (Inactivo)'}
                  onClick={(e) => handleToggleStatus(candidate.id, candidate.is_active, e)}
                >
                  <span className="status-dot"></span>
                  <span className="status-text">{candidate.is_active ? 'Activo' : 'Inactivo'}</span>
                </div>
              </div>
              
              <h3 className="candidate-name-display">{candidate.name}</h3>
              <p className="candidate-location-display">📍 Comuna: {candidate.comuna || 'Providencia'}</p>
              
              {/* Skills preview */}
              <div className="candidate-skills-preview">
                {candidate.skills && candidate.skills.slice(0, 3).map((skill, idx) => (
                  <span key={idx} className="mini-skill-tag">{skill}</span>
                ))}
                {candidate.skills && candidate.skills.length > 3 && (
                  <span className="mini-skill-tag more-tag">+{candidate.skills.length - 3}</span>
                )}
              </div>
              
              <div className="candidate-card-footer">
                <span className="view-detail-link">Ver Currículum Completo →</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* DETAIL MODAL */}
      {selectedCandidate && (
        <div className="candidate-modal-overlay" onClick={() => setSelectedCandidate(null)}>
          <div className="candidate-modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setSelectedCandidate(null)}>×</button>
            
            <div className="modal-top-bar">
              <span className="modal-badge">{selectedCandidate.profession}</span>
              <div 
                className={`modal-status-toggle ${selectedCandidate.is_active ? 'active-toggle' : ''}`}
                onClick={(e) => handleToggleStatus(selectedCandidate.id, selectedCandidate.is_active, e)}
              >
                <div className="toggle-switch"></div>
                <span>{selectedCandidate.is_active ? 'Visible para empresas' : 'Oculto (Presione para activar)'}</span>
              </div>
            </div>
            
            <h2 className="modal-candidate-name">{selectedCandidate.name}</h2>
            <p className="modal-candidate-email">✉️ {selectedCandidate.email} | 🎂 {selectedCandidate.age || 'N/A'} años | ⚧️ {selectedCandidate.gender || 'No especificado'}</p>
            <p className="modal-candidate-address">📍 Residencia: {selectedCandidate.comuna}, Chile</p>
            
            <div className="modal-divider"></div>
            
            {/* Skills & Certifications */}
            <div className="modal-grid-details">
              <div className="modal-column">
                <h3>🛠️ Habilidades Técnicas</h3>
                <div className="modal-tags-container">
                  {selectedCandidate.skills && selectedCandidate.skills.length > 0 ? (
                    selectedCandidate.skills.map((skill, idx) => (
                      <span key={idx} className="modal-skill-tag">{skill}</span>
                    ))
                  ) : (
                    <span className="no-data-text">Sin habilidades registradas.</span>
                  )}
                </div>
              </div>
              
              <div className="modal-column">
                <h3>📜 Certificaciones</h3>
                <div className="modal-tags-container">
                  {selectedCandidate.certifications && selectedCandidate.certifications.length > 0 ? (
                    selectedCandidate.certifications.map((cert, idx) => (
                      <span key={idx} className="modal-cert-tag">{cert}</span>
                    ))
                  ) : (
                    <span className="no-data-text">Sin certificaciones académicas.</span>
                  )}
                </div>
              </div>
            </div>
            
            <div className="modal-divider"></div>
            
            {/* References */}
            <div className="modal-references-section">
              <h3>👥 Referencias Profesionales</h3>
              {selectedCandidate.references && selectedCandidate.references.length > 0 ? (
                <div className="references-grid">
                  {selectedCandidate.references.map((ref, idx) => (
                    <div key={idx} className="reference-item-card">
                      <h4>{ref.name}</h4>
                      <p><strong>Relación:</strong> {ref.relation || 'No especificada'}</p>
                      {ref.phone && <p><strong>Teléfono:</strong> {ref.phone}</p>}
                      {ref.email && <p><strong>Correo:</strong> {ref.email}</p>}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="no-data-text">No se registraron referencias laborales para este candidato.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* REGISTRATION FORM MODAL */}
      {showRegisterForm && (
        <div className="candidate-modal-overlay" onClick={() => setShowRegisterForm(false)}>
          <div className="candidate-modal-card form-modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setShowRegisterForm(false)}>×</button>
            
            <h2 className="form-modal-title">📝 Registrar Mi Perfil en ProviEmplea</h2>
            <p className="form-modal-subtitle">Únete a la vitrina de empleabilidad oficial. Tu perfil será visible para las empresas asociadas.</p>
            
            {formSuccess && <div className="alert-success">{formSuccess}</div>}
            {formError && <div className="alert-danger">{formError}</div>}
            
            <form onSubmit={handleRegisterSubmit} className="register-candidate-form">
              {/* Personal Data */}
              <h3 className="form-section-title">1. Datos Personales</h3>
              <div className="form-row">
                <div className="form-group-half">
                  <label>Nombre Completo *</label>
                  <input 
                    type="text" 
                    name="name" 
                    required 
                    value={formData.name} 
                    onChange={handleInputChange}
                    placeholder="Ej: Juan Pérez"
                  />
                </div>
                <div className="form-group-half">
                  <label>Correo Electrónico *</label>
                  <input 
                    type="email" 
                    name="email" 
                    required 
                    value={formData.email} 
                    onChange={handleInputChange}
                    placeholder="Ej: juan.perez@email.com"
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group-third">
                  <label>Edad</label>
                  <input 
                    type="number" 
                    name="age" 
                    min="18" 
                    max="100"
                    value={formData.age} 
                    onChange={handleInputChange}
                    placeholder="Ej: 30"
                  />
                </div>
                <div className="form-group-third">
                  <label>Género</label>
                  <select name="gender" value={formData.gender} onChange={handleInputChange}>
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                    <option value="Otro">Otro</option>
                    <option value="Prefiero no decirlo">Prefiero no decirlo</option>
                  </select>
                </div>
                <div className="form-group-third">
                  <label>Comuna de Residencia *</label>
                  <input 
                    type="text" 
                    name="comuna" 
                    required
                    value={formData.comuna} 
                    onChange={handleInputChange}
                    placeholder="Ej: Providencia"
                  />
                </div>
              </div>

              {/* Professional Profile */}
              <h3 className="form-section-title">2. Perfil Profesional</h3>
              <div className="form-row">
                <div className="form-group-full">
                  <label>Profesión / Ocupación Principal *</label>
                  <input 
                    type="text" 
                    name="profession" 
                    required 
                    value={formData.profession} 
                    onChange={handleInputChange}
                    placeholder="Ej: Desarrollador Backend, Diseñadora Gráfica"
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group-half">
                  <label>Habilidades Técnicas (Separadas por comas)</label>
                  <input 
                    type="text" 
                    name="skills" 
                    value={formData.skills} 
                    onChange={handleInputChange}
                    placeholder="Ej: Laravel, React, SQL, Git"
                  />
                </div>
                <div className="form-group-half">
                  <label>Certificaciones (Separadas por comas)</label>
                  <input 
                    type="text" 
                    name="certifications" 
                    value={formData.certifications} 
                    onChange={handleInputChange}
                    placeholder="Ej: Scrum Master, AWS Cloud Practitioner"
                  />
                </div>
              </div>

              {/* Reference */}
              <h3 className="form-section-title">3. Referencia Profesional (Opcional)</h3>
              <div className="form-row">
                <div className="form-group-half">
                  <label>Nombre de la Referencia</label>
                  <input 
                    type="text" 
                    name="refName" 
                    value={formData.refName} 
                    onChange={handleInputChange}
                    placeholder="Ej: María Gómez"
                  />
                </div>
                <div className="form-group-half">
                  <label>Relación Laboral</label>
                  <input 
                    type="text" 
                    name="refRelation" 
                    value={formData.refRelation} 
                    onChange={handleInputChange}
                    placeholder="Ej: Ex-Jefa Directa, Supervisor"
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group-half">
                  <label>Teléfono de Referencia</label>
                  <input 
                    type="text" 
                    name="refPhone" 
                    value={formData.refPhone} 
                    onChange={handleInputChange}
                    placeholder="Ej: +56912345678"
                  />
                </div>
                <div className="form-group-half">
                  <label>Correo Electrónico de Referencia</label>
                  <input 
                    type="email" 
                    name="refEmail" 
                    value={formData.refEmail} 
                    onChange={handleInputChange}
                    placeholder="Ej: maria.gomez@empresa.com"
                  />
                </div>
              </div>
              
              <div className="form-actions-row">
                <button 
                  type="button" 
                  className="btn-form-cancel" 
                  onClick={() => setShowRegisterForm(false)}
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="btn-form-submit"
                  disabled={submitting}
                >
                  {submitting ? 'Registrando...' : 'Guardar Perfil'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
