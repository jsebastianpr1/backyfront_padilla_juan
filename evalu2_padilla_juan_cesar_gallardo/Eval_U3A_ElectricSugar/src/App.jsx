import { useState, useEffect } from 'react';
import Services from './components/Services';
import Carousel from './components/Carousel';
import FAQ from './components/FAQ';
import ContactForm from './components/ContactForm';
import AsesoriaExperta from './components/AsesoriaExperta';
import News from './components/News';
import VideoGallery from './components/VideoGallery';
import CandidateHub from './components/CandidateHub';
import './App.css';

function App() {
  const [data, setData] = useState({
    nosotros: null,
    servicios: [],
    faq: [],
    testimonios: [],
    noticias: [],
    videos: []
  });
  const [selectedService, setSelectedService] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch CMS api data (with direct data.json fallback if CMS isn't running)
  useEffect(() => {
    fetch('/api/content')
      .then((res) => {
        if (!res.ok) throw new Error('CMS API not available, falling back');
        return res.json();
      })
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        console.warn(err.message);
        // Fallback to static public/data.json
        fetch('/data.json')
          .then((res) => {
            if (!res.ok) throw new Error('Error al cargar la información');
            return res.json();
          })
          .then((json) => {
            setData(json);
            setLoading(false);
          })
          .catch((staticErr) => {
            console.error('Static data load failed:', staticErr);
            setLoading(false);
          });
      });
  }, []);

  const handleSelectService = (serviceName) => {
    setSelectedService(serviceName);
  };

  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Cargando Centro de Negocios Santiago...</p>
      </div>
    );
  }

  return (
    <div className="app-container">
      {/* Premium Header/Navigation */}
      <header className="main-header">
        <div className="header-container">
          <a href="https://www.sercotec.cl/" target="_blank" rel="noopener noreferrer" className="logo-link-container">
            <div className="logo-area">
              <span className="logo-brand">SERCOTEC</span>
              <span className="logo-sub">Centro de Negocios Santiago</span>
            </div>
          </a>
          <nav className="navbar">
            <a href="#inicio" onClick={(e) => handleSmoothScroll(e, 'inicio')}>Inicio</a>
            <a href="#nosotros" onClick={(e) => handleSmoothScroll(e, 'nosotros')}>Nosotros</a>
            
            {/* Financiamiento Mega Dropdown */}
            <div className="nav-dropdown">
              <button className="nav-dropdown-btn" aria-haspopup="true" aria-expanded="false">
                Financiamiento <span className="arrow-icon">▾</span>
              </button>
              <div className="nav-dropdown-content" role="menu">
                <div className="dropdown-column" role="none">
                  <span className="column-title">💡 Quiero Emprender</span>
                  <p className="column-desc">Aún no formalizo y tengo una idea de negocio.</p>
                  <ul role="menu">
                    <li role="none">
                      <a href="https://www.sercotec.cl/programas/capital-abeja-emprende/" target="_blank" rel="noopener noreferrer" role="menuitem">
                        Capital Abeja Emprende
                      </a>
                    </li>
                    <li role="none">
                      <a href="https://www.sercotec.cl/capital-semilla-emprende/" target="_blank" rel="noopener noreferrer" role="menuitem">
                        Capital Semilla Emprende
                      </a>
                    </li>
                  </ul>
                </div>
                
                <div className="dropdown-column" role="none">
                  <span className="column-title">🏪 Tengo una Mipyme</span>
                  <p className="column-desc">Ya tengo un negocio formalizado.</p>
                  <ul role="menu">
                    <li role="none">
                      <a href="https://www.sercotec.cl/crece/" target="_blank" rel="noopener noreferrer" role="menuitem">
                        Fondo Crece
                      </a>
                    </li>
                    <li role="none">
                      <a href="https://www.sercotec.cl/digitaliza-tu-almacen/" target="_blank" rel="noopener noreferrer" role="menuitem">
                        Digitaliza tu Almacén
                      </a>
                    </li>
                    <li role="none">
                      <a href="https://www.sercotec.cl/ruta-digital/" target="_blank" rel="noopener noreferrer" role="menuitem">
                        Kit Digital
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="dropdown-column" role="none">
                  <span className="column-title">👥 Tengo una Organización</span>
                  <p className="column-desc">Gremio, cooperativa, feria libre o barrio comercial.</p>
                  <ul role="menu">
                    <li role="none">
                      <a href="https://www.sercotec.cl/barrios-comerciales/" target="_blank" rel="noopener noreferrer" role="menuitem">
                        Barrios Comerciales
                      </a>
                    </li>
                    <li role="none">
                      <a href="https://www.sercotec.cl/fortalecimiento-de-ferias-libres/" target="_blank" rel="noopener noreferrer" role="menuitem">
                        Ferias Libres
                      </a>
                    </li>
                    <li role="none">
                      <a href="https://www.sercotec.cl/creacion-y-fortalecimiento-de-cooperativas/" target="_blank" rel="noopener noreferrer" role="menuitem">
                        Apoyo a Cooperativas
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <a href="#asesoria-experta" onClick={(e) => handleSmoothScroll(e, 'asesoria-experta')}>Asesoría Experta</a>
            <a href="#servicios" onClick={(e) => handleSmoothScroll(e, 'servicios')}>Servicios</a>
            <a href="#testimonios" onClick={(e) => handleSmoothScroll(e, 'testimonios')}>Testimonios</a>
            <a href="#noticias" onClick={(e) => handleSmoothScroll(e, 'noticias')}>Noticias</a>
            <a href="#faq" onClick={(e) => handleSmoothScroll(e, 'faq')}>FAQ</a>
            <a href="#empleo" onClick={(e) => handleSmoothScroll(e, 'empleo')}>Portal de Empleo</a>
            <a href="#sedes" onClick={(e) => handleSmoothScroll(e, 'sedes')}>Sedes</a>
            <a href="#contacto" className="nav-cta" onClick={(e) => handleSmoothScroll(e, 'contacto')}>Contáctanos</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section id="inicio" className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <span className="hero-badge">Atención Oficial - Santiago y Providencia</span>
          <h1 className="hero-title">
            Potencia tu negocio con el <span className="highlight">Centro de Negocios Santiago</span>
          </h1>
          <p className="hero-subtitle">
            Asesoría estratégica, técnica, individual y sin costo para impulsar la profesionalización y sustentabilidad de cooperativas, pymes y emprendimientos.
          </p>
          <div className="hero-actions">
            <a 
              href="#servicios" 
              className="btn btn-primary"
              onClick={(e) => handleSmoothScroll(e, 'servicios')}
            >
              Nuestros Servicios
            </a>
            <a 
              href="#contacto" 
              className="btn btn-secondary"
              onClick={(e) => handleSmoothScroll(e, 'contacto')}
            >
              Agendar Asesoría
            </a>
          </div>
        </div>
      </section>

      {/* Nosotros Section */}
      <section id="nosotros" className="section-padding nosotros-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Quiénes Somos</h2>
            <div className="section-line"></div>
          </div>
          
          {data.nosotros && (
            <div className="nosotros-content">
              <p className="nosotros-description">
                {data.nosotros.descripcion}
                <br />
                <a href="https://www.sercotec.cl/quienes-somos/" target="_blank" rel="noopener noreferrer" className="nosotros-institucional-link">
                  Conoce más sobre la historia y misión institucional de SERCOTEC Chile →
                </a>
              </p>
              <div className="pilares-grid">
                {data.nosotros.pilares.map((pilar) => (
                  <div key={pilar.id} className="pilar-card">
                    <div className="pilar-icon-wrapper">
                      {pilar.icon === 'user-check' && (
                        <svg className="pilar-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                      )}
                      {pilar.icon === 'book-open' && (
                        <svg className="pilar-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                        </svg>
                      )}
                      {pilar.icon === 'network' && (
                        <svg className="pilar-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path>
                        </svg>
                      )}
                    </div>
                    <h3 className="pilar-title">{pilar.titulo}</h3>
                    <p className="pilar-desc">{pilar.descripcion}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Asesoría Experta Section */}
      <section id="asesoria-experta" className="section-padding asesoria-experta-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Asesoría Experta por Región</h2>
            <p className="section-subtitle">Sercotec se encuentra desplegado en todo el país. Encuentra tu oficina regional autorizada.</p>
            <div className="section-line"></div>
          </div>
          <AsesoriaExperta />
        </div>
      </section>

      {/* Servicios Section */}
      <section id="servicios" className="section-padding services-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title text-white">Nuestros Servicios</h2>
            <p className="section-subtitle text-gray">Programas diseñados para potenciar cada etapa de tu empresa sin costo alguno.</p>
            <div className="section-line bg-red"></div>
          </div>
          <Services services={data.servicios} onSelectService={handleSelectService} />
        </div>
      </section>

      {/* Testimonios Section */}
      <section id="testimonios" className="section-padding testimonials-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Casos de Éxito</h2>
            <p className="section-subtitle">Trayectoria e impacto económico generado en el territorio de Santiago y Providencia.</p>
            <div className="section-line"></div>
          </div>
          <Carousel testimonials={data.testimonios} />

          {/* Real Sercotec Santiago Video Presentation & Gallery */}
          <div className="video-presentation-container">
            <h3 className="video-title">🎥 Centro de Negocios y Escuela de Fomento en Acción</h3>
            <p className="video-desc">Capacítate con nuestra selección de guías técnicas oficiales y testimonios de fomento productivo.</p>
            <VideoGallery videos={data.videos} />
          </div>
        </div>
      </section>

      {/* Actualidad y Noticias Section */}
      <section id="noticias" className="section-padding news-section-bg">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Actualidad y Noticias</h2>
            <p className="section-subtitle">Entérate de las últimas actividades, vinculaciones e hitos de la red de Centros Sercotec.</p>
            <div className="section-line"></div>
          </div>
          <News articles={data.noticias} />
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="section-padding faq-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Preguntas Frecuentes</h2>
            <div className="section-line"></div>
          </div>
          <FAQ faqItems={data.faq} />
        </div>
      </section>

      {/* ProviEmplea Candidate Hub Section */}
      <section id="empleo" className="section-padding candidate-hub-section-bg">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Vitrina de Talento ProviEmplea</h2>
            <p className="section-subtitle">
              Conexión real entre la base de datos de candidatos de la comuna de Providencia y las empresas aliadas de SERCOTEC.
            </p>
            <div className="section-line bg-red"></div>
          </div>
          <CandidateHub />
        </div>
      </section>

      {/* Sedes Oficiales Section */}
      <section id="sedes" className="section-padding sedes-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Nuestras Sedes y Puntos de Atención</h2>
            <p className="section-subtitle">Visítanos directamente en nuestros centros de atención física autorizados.</p>
            <div className="section-line"></div>
          </div>

          {data.nosotros && data.nosotros.contactoReal && (
            <>
              <div className="sedes-grid">
                <div className="sede-card">
                  <span className="sede-badge">Centro Principal</span>
                  <h3>{data.nosotros.contactoReal.centro_santiago.nombre}</h3>
                  <p><strong>📍 Dirección:</strong> {data.nosotros.contactoReal.centro_santiago.direccion}</p>
                  <p>
                    <strong>📞 Teléfono:</strong>{' '}
                    <a href="tel:+56939275633" className="clickable-contact-link">
                      {data.nosotros.contactoReal.centro_santiago.telefono}
                    </a>
                  </p>
                  <p>
                    <strong>💬 WhatsApp:</strong>{' '}
                    <a href="https://wa.me/56939275633" target="_blank" rel="noopener noreferrer" className="clickable-contact-link highlight-wa">
                      Chat directo en WhatsApp
                    </a>
                  </p>
                  <p><strong>✉️ Correo:</strong> <a href={`mailto:${data.nosotros.contactoReal.centro_santiago.correo}`}>{data.nosotros.contactoReal.centro_santiago.correo}</a></p>
                  <p><strong>🕒 Horario de Atención:</strong> {data.nosotros.contactoReal.centro_santiago.atencion}</p>
                  <div className="sede-staff">
                    <p><strong>Jefe de Centro:</strong> {data.nosotros.contactoReal.centro_santiago.jefe}</p>
                    <p><strong>Asistente Ejecutiva:</strong> {data.nosotros.contactoReal.centro_santiago.asistente}</p>
                  </div>
                </div>

                <div className="sede-card">
                  <span className="sede-badge badge-satellite">Centro Satélite</span>
                  <h3>{data.nosotros.contactoReal.centro_providencia.nombre}</h3>
                  <p><strong>📍 Dirección:</strong> {data.nosotros.contactoReal.centro_providencia.direccion}</p>
                  <p>
                    <strong>📞 Teléfono:</strong>{' '}
                    <a href="tel:+56939275633" className="clickable-contact-link">
                      {data.nosotros.contactoReal.centro_providencia.telefono}
                    </a>
                  </p>
                  <p><strong>✉️ Correo:</strong> <a href={`mailto:${data.nosotros.contactoReal.centro_providencia.correo}`}>{data.nosotros.contactoReal.centro_providencia.correo}</a></p>
                  <p><strong>🕒 Horario de Atención:</strong> {data.nosotros.contactoReal.centro_providencia.atencion}</p>
                  <div className="sede-staff">
                    <p><strong>Asesor Responsable:</strong> {data.nosotros.contactoReal.centro_providencia.responsable}</p>
                  </div>
                </div>
              </div>

              {/* Real Sercotec Santiago Google Map */}
              <div className="map-container-wrapper">
                <h4 className="map-headline">🗺️ Ubicación del Centro Principal Santiago (Metro Toesca)</h4>
                <div className="map-iframe-wrapper">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3328.7883343297135!2d-70.66114562437173!3d-33.45482069773583!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662c50596b630e1%3A0x470f6713a9bc04aa!2sAv.%20Manuel%20Rodr%C3%ADguez%20Sur%20749%2C%20Santiago%2C%20Regi%C3%B3n%20Metropolitana!5e0!3m2!1ses-419!2scl!4v1731681691742!5m2!1ses-419!2scl" 
                    width="100%" 
                    height="350" 
                    style={{ border: 0 }} 
                    allowFullScreen="" 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Mapa Sercotec Santiago"
                  ></iframe>
                </div>
              </div>
            </>
          )}

          <div className="puntos-moviles-card">
            <h4>📍 Puntos de Atención Móviles Adicionales:</h4>
            <ul>
              <li><strong>UTEM:</strong> Dr. Hernán Alessandri 644, Providencia (2 miércoles al mes de 09.00 a 13.00 hrs.)</li>
              <li><strong>Universidad Autónoma de Chile:</strong> Pedro de Valdivia 425, Providencia (2 miércoles al mes de 09.00 a 13.00 hrs.)</li>
              <li><strong>DUOC UC Sede Alameda:</strong> España 8, Santiago (2 jueves al mes de 09.00 a 13.00 hrs.)</li>
            </ul>
          </div>

          {/* Highlight Consultorio Empresarial */}
          <div className="consultorio-empresarial-banner">
            <div className="consultorio-icon-wrapper">
              <svg className="consultorio-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
              </svg>
            </div>
            <div className="consultorio-details">
              <h4>🩺 Consultorio Empresarial Oficial</h4>
              <p>¿Tienes dudas rápidas sobre tu emprendimiento? De manera rápida <strong>(en solo 20 minutos)</strong> y 100% efectiva, respondemos tus inquietudes comerciales y tributarias generales.</p>
              <div className="consultorio-actions-group">
                <a 
                  href="https://sites.google.com/centrossercotec.cl/consultorioempresarial/inicio" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="consultorio-cta-btn"
                >
                  Acceder al Consultorio
                </a>
                <a 
                  href="https://sites.google.com/centrossercotec.cl/consultorioempresarial/agenda" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="consultorio-cta-btn btn-agenda"
                >
                  📅 Agendar una Sesión
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contacto Section */}
      <section id="contacto" className="section-padding contact-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Formulario de Contacto</h2>
            <p className="section-subtitle">Comienza hoy tu camino hacia el crecimiento empresarial sustentable.</p>
            <div className="section-line"></div>
          </div>
          <ContactForm 
            services={data.servicios} 
            selectedService={selectedService} 
            setSelectedService={setSelectedService}
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="main-footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <a href="https://www.sercotec.cl/" target="_blank" rel="noopener noreferrer" style={{ color: 'white', textDecoration: 'none' }}>
              <h4>SERCOTEC</h4>
            </a>
            <p>Centro de Negocios Santiago</p>
            <p style={{ marginTop: '8px', fontSize: '12px' }}>
              <a href="https://www.sercotec.cl/oficinas/" target="_blank" rel="noopener noreferrer" style={{ color: '#ef4444', fontWeight: '600', textDecoration: 'none' }}>
                📍 Red de Oficinas Nacionales
              </a>
            </p>
            <p className="copyright">&copy; {new Date().getFullYear()} Centro de Negocios SERCOTEC Santiago. Todos los derechos reservados.</p>
          </div>
          <div className="footer-links">
            <h5>Enlaces Útiles</h5>
            <ul>
              <li><a href="#inicio" onClick={(e) => handleSmoothScroll(e, 'inicio')}>Inicio</a></li>
              <li><a href="#servicios" onClick={(e) => handleSmoothScroll(e, 'servicios')}>Servicios</a></li>
              <li><a href="#empleo" onClick={(e) => handleSmoothScroll(e, 'empleo')}>Portal de Empleo</a></li>
              <li><a href="#contacto" onClick={(e) => handleSmoothScroll(e, 'contacto')}>Contacto</a></li>
            </ul>
          </div>
          <div className="footer-links">
            <h5>Sigue Conectado</h5>
            <ul className="footer-social-list">
              <li>
                <a href="https://www.facebook.com/centrodnsantiago" target="_blank" rel="noopener noreferrer">
                  🔵 Facebook Oficial
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/centrodnsantiago/" target="_blank" rel="noopener noreferrer">
                  📸 Instagram Oficial
                </a>
              </li>
              <li>
                <a href="https://wa.me/56939275633" target="_blank" rel="noopener noreferrer">
                  💬 WhatsApp Directo
                </a>
              </li>
            </ul>
          </div>
          {data.nosotros && data.nosotros.contactoReal && (
            <div className="footer-contact">
              <h5>Contacto Principal</h5>
              <p>📍 {data.nosotros.contactoReal.centro_santiago.direccion}</p>
              <p>
                📞{' '}
                <a href="tel:+56939275633" style={{ color: '#cbd5e1', textDecoration: 'none' }}>
                  {data.nosotros.contactoReal.centro_santiago.telefono}
                </a>
              </p>
              <p>✉️ {data.nosotros.contactoReal.centro_santiago.correo}</p>
            </div>
          )}
        </div>
      </footer>
    </div>
  );
}

export default App;
