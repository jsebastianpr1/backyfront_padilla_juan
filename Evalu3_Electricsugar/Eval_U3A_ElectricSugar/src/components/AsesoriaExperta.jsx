import { useState } from 'react';

const REGIONAL_OFFICES = [
  {
    region: "Arica y Parinacota",
    direcciones: "Oficina Regional Arica",
    telefono: "+56 58 225 1056",
    correo: "centro.arica@centrossercotec.cl",
    horario: "Lunes a Viernes 09:00 - 18:00 hrs.",
    link: "https://www.sercotec.cl/oficinas-arica-y-parinacota/"
  },
  {
    region: "Tarapacá",
    direcciones: "Oficina Regional Iquique",
    telefono: "+56 57 224 2332",
    correo: "centro.iquique@centrossercotec.cl",
    horario: "Lunes a Viernes 09:00 - 18:00 hrs.",
    link: "https://www.sercotec.cl/oficinas-tarapaca/"
  },
  {
    region: "Antofagasta",
    direcciones: "Oficina Regional Antofagasta",
    telefono: "+56 55 225 9081",
    correo: "centro.antofagasta@centrossercotec.cl",
    horario: "Lunes a Viernes 09:00 - 18:00 hrs.",
    link: "https://www.sercotec.cl/oficinas-antofagasta/"
  },
  {
    region: "Atacama",
    direcciones: "Oficina Regional Copiapó",
    telefono: "+56 52 248 1023",
    correo: "centro.copiapo@centrossercotec.cl",
    horario: "Lunes a Viernes 09:00 - 18:00 hrs.",
    link: "https://www.sercotec.cl/oficinas-atacama/"
  },
  {
    region: "Coquimbo",
    direcciones: "Oficina Regional La Serena",
    telefono: "+56 51 221 3450",
    correo: "centro.laserena@centrossercotec.cl",
    horario: "Lunes a Viernes 09:00 - 18:00 hrs.",
    link: "https://www.sercotec.cl/oficinas-coquimbo/"
  },
  {
    region: "Valparaíso",
    direcciones: "Oficina Regional Valparaíso",
    telefono: "+56 32 225 9088",
    correo: "centro.valparaiso@centrossercotec.cl",
    horario: "Lunes a Viernes 09:00 - 18:00 hrs.",
    link: "https://www.sercotec.cl/oficinas-valparaiso/"
  },
  {
    region: "Metropolitana",
    direcciones: "Manuel Rodríguez Sur 749, Santiago Centro (Metro Toesca)",
    telefono: "+(56) 9 3927 5633",
    correo: "centro.santiago@centrossercotec.cl",
    horario: "Lunes a Viernes de 9:00 - 18:00 hrs.",
    link: "https://www.sercotec.cl/oficinas/"
  },
  {
    region: "O'Higgins",
    direcciones: "Oficina Regional Rancagua",
    telefono: "+56 72 223 9081",
    correo: "centro.rancagua@centrossercotec.cl",
    horario: "Lunes a Viernes 09:00 - 18:00 hrs.",
    link: "https://www.sercotec.cl/oficinas-ohiggins/"
  },
  {
    region: "Maule",
    direcciones: "Oficina Regional Talca",
    telefono: "+56 71 221 9085",
    correo: "centro.talca@centrossercotec.cl",
    horario: "Lunes a Viernes 09:00 - 18:00 hrs.",
    link: "https://www.sercotec.cl/oficinas-maule/"
  },
  {
    region: "Ñuble",
    direcciones: "Oficina Regional Chillán",
    telefono: "+56 42 222 9080",
    correo: "centro.chillan@centrossercotec.cl",
    horario: "Lunes a Viernes 09:00 - 18:00 hrs.",
    link: "https://www.sercotec.cl/oficinas-nuble/"
  },
  {
    region: "Biobío",
    direcciones: "Oficina Regional Concepción",
    telefono: "+56 41 222 9088",
    correo: "centro.concepcion@centrossercotec.cl",
    horario: "Lunes a Viernes 09:00 - 18:00 hrs.",
    link: "https://www.sercotec.cl/oficinas-biobio/"
  },
  {
    region: "La Araucanía",
    direcciones: "Oficina Regional Temuco",
    telefono: "+56 45 221 9082",
    correo: "centro.temuco@centrossercotec.cl",
    horario: "Lunes a Viernes 09:00 - 18:00 hrs.",
    link: "https://www.sercotec.cl/oficinas-la-araucania/"
  },
  {
    region: "Los Ríos",
    direcciones: "Oficina Regional Valdivia",
    telefono: "+56 63 221 9084",
    correo: "centro.valdivia@centrossercotec.cl",
    horario: "Lunes a Viernes 09:00 - 18:00 hrs.",
    link: "https://www.sercotec.cl/oficinas-los-rios/"
  },
  {
    region: "Los Lagos",
    direcciones: "Oficina Regional Puerto Montt",
    telefono: "+56 65 225 9080",
    correo: "centro.puertomontt@centrossercotec.cl",
    horario: "Lunes a Viernes 09:00 - 18:00 hrs.",
    link: "https://www.sercotec.cl/oficinas-los-lagos/"
  },
  {
    region: "Aysén",
    direcciones: "Oficina Regional Coyhaique",
    telefono: "+56 67 221 9082",
    correo: "centro.coyhaique@centrossercotec.cl",
    horario: "Lunes a Viernes 09:00 - 18:00 hrs.",
    link: "https://www.sercotec.cl/oficinas-aysen/"
  },
  {
    region: "Magallanes",
    direcciones: "Oficina Regional Punta Arenas",
    telefono: "+56 61 222 9080",
    correo: "centro.puntaarenas@centrossercotec.cl",
    horario: "Lunes a Viernes 09:00 - 18:00 hrs.",
    link: "https://www.sercotec.cl/oficinas-magallanes/"
  }
];

export default function AsesoriaExperta() {
  const [selectedRegion, setSelectedRegion] = useState("Metropolitana");
  const [searchTerm, setSearchTerm] = useState("");

  const POPULAR_REGIONS = ["Metropolitana", "Valparaíso", "Biobío", "Coquimbo"];

  const filteredOffices = REGIONAL_OFFICES.filter(off => 
    off.region.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const office = REGIONAL_OFFICES.find(o => o.region === selectedRegion) || 
                 filteredOffices[0] || 
                 REGIONAL_OFFICES[6];

  return (
    <div className="asesoria-experta-card">
      <div className="asesoria-left-panel">
        <h3 className="panel-headline">Sercotec se encuentra desplegado en todo el país</h3>
        <p className="panel-sub">Filtra tu región o usa los accesos rápidos para encontrar información de contacto y recibir asesoría experta gratuita.</p>
        
        {/* Real-time search filter */}
        <div className="region-search-wrapper">
          <input 
            type="text"
            placeholder="🔎 Escribe para buscar tu región..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="region-search-input"
            aria-label="Filtrar región de Sercotec"
          />
        </div>

        {/* Popular/Quick select pills */}
        <div className="popular-regions-container">
          <span className="popular-label">⚡ Acceso Rápido:</span>
          <div className="popular-regions-pills">
            {POPULAR_REGIONS.map(regName => (
              <button 
                key={regName}
                type="button"
                className={`popular-pill ${office.region === regName ? 'active' : ''}`}
                onClick={() => {
                  setSelectedRegion(regName);
                  setSearchTerm("");
                }}
              >
                {regName === "Metropolitana" ? "📍 Metropolitana" : regName}
              </button>
            ))}
          </div>
        </div>

        <div className="region-select-wrapper">
          <label htmlFor="region-selector" className="sr-only">Seleccionar Región</label>
          <select 
            id="region-selector"
            value={office.region} 
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="region-select-input"
          >
            {filteredOffices.length > 0 ? (
              filteredOffices.map((off) => (
                <option key={off.region} value={off.region}>
                  {off.region}
                </option>
              ))
            ) : (
              <option value="">No hay coincidencias</option>
            )}
          </select>
        </div>

        <div className="asesoria-benefits-list">
          <div className="benefit-item">
            <span className="benefit-checkmark">✓</span>
            <p>Resolver dudas sobre nuestro Servicio, sus financiamientos y capacitaciones</p>
          </div>
          <div className="benefit-item">
            <span className="benefit-checkmark">✓</span>
            <p>Recibir asesoría experta, sin costo y permanente en el tiempo</p>
          </div>
        </div>
      </div>

      <div className="asesoria-right-panel">
        <div className="regional-detail-card" key={office.region}>
          <span className="regional-badge">Oficina Regional Autorizada</span>
          <h4 className="regional-name">Región {office.region}</h4>
          
          <div className="regional-info-group">
            <p><strong>📍 Dirección:</strong> {office.direcciones}</p>
            <p>
              <strong>📞 Teléfono:</strong>{' '}
              <a href={`tel:${office.telefono.replace(/\s+/g, '')}`} className="regional-link">
                {office.telefono}
              </a>
            </p>
            <p>
              <strong>✉️ Correo:</strong>{' '}
              <a href={`mailto:${office.correo}`} className="regional-link">
                {office.correo}
              </a>
            </p>
            <p><strong>🕒 Horario:</strong> {office.horario}</p>
          </div>

          <a 
            href={office.link} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="regional-cta-btn"
          >
            Ver Centros de esta Región
          </a>
        </div>
      </div>
    </div>
  );
}
