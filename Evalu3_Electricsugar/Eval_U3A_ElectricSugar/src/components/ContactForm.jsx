import { useState, useEffect, useRef } from 'react';

export default function ContactForm({ services = [], selectedService = '', setSelectedService }) {
  const [formData, setFormData] = useState(() => {
    const initial = {
      nombre: '',
      email: '',
      telefono: '',
      servicio: '',
      mensaje: '',
      website: '' // Honeypot anti-bot
    };
    try {
      const savedDraft = localStorage.getItem('sercotec_form_draft');
      if (savedDraft) {
        const parsed = JSON.parse(savedDraft);
        return {
          ...initial,
          nombre: parsed.nombre || '',
          email: parsed.email || '',
          telefono: parsed.telefono || '',
          servicio: parsed.servicio || '',
          mensaje: parsed.mensaje || ''
        };
      }
    } catch (e) {
      console.error('Error al restaurar borrador', e);
    }
    return initial;
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
  const formRef = useRef(null);

  // Sync selectedService when it changes from the parent service card trigger
  useEffect(() => {
    if (selectedService) {
      const timer = setTimeout(() => {
        setFormData((prev) => ({ ...prev, servicio: selectedService }));
      }, 0);

      // Scroll to the contact section smoothly and focus on the form
      const element = document.getElementById('contacto');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }

      return () => clearTimeout(timer);
    }
  }, [selectedService]);

  // Save draft to localStorage on change
  useEffect(() => {
    const draftToSave = { ...formData };
    delete draftToSave.website;
    if (draftToSave.nombre || draftToSave.email || draftToSave.telefono || draftToSave.mensaje) {
      localStorage.setItem('sercotec_form_draft', JSON.stringify(draftToSave));
    }
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear validation error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es obligatorio.';
    } else if (formData.nombre.length < 3) {
      newErrors.nombre = 'El nombre debe tener al menos 3 caracteres.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'El correo electrónico es obligatorio.';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Ingresa un correo electrónico válido.';
    }

    const phoneRegex = /^(\+?56)?\s?[2-9]\s?\d{4}\s?\d{4}$/; // Chile formats
    if (!formData.telefono.trim()) {
      newErrors.telefono = 'El teléfono es obligatorio.';
    } else if (!phoneRegex.test(formData.telefono.replace(/\s+/g, ''))) {
      newErrors.telefono = 'Ingresa un teléfono válido de Chile (ej: +56 9 1234 5678).';
    }

    if (!formData.servicio) {
      newErrors.servicio = 'Por favor selecciona un servicio.';
    }

    if (!formData.mensaje.trim()) {
      newErrors.mensaje = 'El mensaje no puede estar vacío.';
    } else if (formData.mensaje.length < 10) {
      newErrors.mensaje = 'El mensaje debe tener al menos 10 caracteres.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Honeypot anti-bot validation
    if (formData.website) {
      console.warn('Bot detectado mediante Honeypot');
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitStatus('success'); // Fake success to trick simple bots
        setFormData({ nombre: '', email: '', telefono: '', servicio: '', mensaje: '', website: '' });
        if (setSelectedService) setSelectedService('');
      }, 1000);
      return;
    }

    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    // Simulate API Call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      localStorage.removeItem('sercotec_form_draft');
      setFormData({ nombre: '', email: '', telefono: '', servicio: '', mensaje: '', website: '' });
      if (setSelectedService) setSelectedService('');
    }, 1500);
  };

  return (
    <div className="contact-form-card" ref={formRef}>
      <h3 className="form-title">Envíanos un mensaje</h3>
      <p className="form-subtitle">Un asesor comercial se pondrá en contacto contigo en menos de 24 horas hábiles.</p>

      {submitStatus === 'success' && (
        <div className="alert success-alert" role="alert">
          <svg className="alert-icon" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
          </svg>
          <div>
            <strong>¡Mensaje enviado con éxito!</strong>
            <p>Gracias por contactar al Centro de Negocios Santiago de SERCOTEC.</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        {/* Honeypot field (anti-spam) */}
        <div style={{ display: 'none' }} aria-hidden="true">
          <input
            type="text"
            name="website"
            value={formData.website}
            onChange={handleChange}
            tabIndex="-1"
            autoComplete="off"
            placeholder="No rellenes este campo si eres humano"
          />
        </div>

        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="nombre">Nombre Completo *</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className={errors.nombre ? 'input-error' : ''}
              placeholder="Ej. Juan Pérez"
              required
            />
            {errors.nombre && <span className="error-message">{errors.nombre}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Correo Electrónico *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'input-error' : ''}
              placeholder="Ej. juan.perez@empresa.cl"
              required
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>
        </div>

        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="telefono">Teléfono de Contacto *</label>
            <input
              type="tel"
              id="telefono"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              className={errors.telefono ? 'input-error' : ''}
              placeholder="Ej. +56 9 1234 5678"
              required
            />
            {errors.telefono && <span className="error-message">{errors.telefono}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="servicio">Servicio Solicitado *</label>
            <select
              id="servicio"
              name="servicio"
              value={formData.servicio}
              onChange={handleChange}
              className={errors.servicio ? 'input-error' : ''}
              required
            >
              <option value="">Selecciona un servicio...</option>
              {services.map((srv) => (
                <option key={srv.id} value={srv.nombre}>
                  {srv.nombre}
                </option>
              ))}
            </select>
            {errors.servicio && <span className="error-message">{errors.servicio}</span>}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="mensaje">Mensaje o Breve Idea de Negocio *</label>
          <textarea
            id="mensaje"
            name="mensaje"
            rows="4"
            value={formData.mensaje}
            onChange={handleChange}
            className={errors.mensaje ? 'input-error' : ''}
            placeholder="Cuéntanos un poco sobre tu emprendimiento o qué asesoría requieres..."
            required
          />
          {errors.mensaje && <span className="error-message">{errors.mensaje}</span>}
        </div>

        <button 
          type="submit" 
          className="submit-btn" 
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="spinner-loader">Enviando...</span>
          ) : (
            'Enviar Solicitud'
          )}
        </button>
      </form>
    </div>
  );
}
