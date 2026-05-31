
export default function Services({ services = [], onSelectService }) {
  if (!services || services.length === 0) {
    return <div className="loading-services">Cargando servicios...</div>;
  }

  // Map icons to SVGs or inline CSS styles
  const renderIcon = (iconName) => {
    switch (iconName) {
      case 'briefcase':
        return (
          <svg className="srv-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
          </svg>
        );
      case 'graduation-cap':
        return (
          <svg className="srv-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z"></path>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0v6"></path>
          </svg>
        );
      case 'trending-up':
        return (
          <svg className="srv-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-9 9-4-4-6 6"></path>
          </svg>
        );
      case 'users':
        return (
          <svg className="srv-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
          </svg>
        );
      default:
        return (
          <svg className="srv-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
          </svg>
        );
    }
  };

  return (
    <div className="services-grid">
      {services.map((srv) => (
        <div key={srv.id} className="service-card">
          <div className="service-icon-bg">
            {renderIcon(srv.icono)}
          </div>
          <h3 className="service-name">{srv.nombre}</h3>
          <p className="service-desc">{srv.descripcion}</p>
          <div className="service-hover-content">
            <p className="service-detail">{srv.detalle}</p>
            <button
              onClick={() => onSelectService(srv.nombre)}
              className="service-cta-btn"
              aria-label={`Solicitar información para ${srv.nombre}`}
            >
              Contáctanos
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
