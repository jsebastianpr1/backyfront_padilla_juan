
const NEWS_DATA = [
  {
    id: "n-1",
    titulo: "Invitan a mujeres de la zona a fortalecer sus negocios con programa gratuito de formación empresarial",
    fecha: "13 de Abril de 2026",
    resumen: "Sercotec abre convocatorias para un innovador programa gratuito de formación empresarial, diseñado especialmente para entregar herramientas críticas de liderazgo, marketing y finanzas a mujeres de nuestro territorio.",
    imagen: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=500&auto=format&fit=crop&q=80",
    link: "https://sitios.sercotec.cl/centros-de-negocios/2026/04/13/invitan-a-mujeres-de-la-zona-a-fortalecer-sus-negocios-con-programa-gratuito-de-formacion-empresarial/"
  },
  {
    id: "n-2",
    titulo: "CDN Copiapó fortalece redes empresariales con encuentro de vinculación que releva el liderazgo femenino",
    fecha: "08 de Abril de 2026",
    resumen: "El Centro de Desarrollo de Negocios Copiapó reunió a decenas de empresarias locales en un exitoso encuentro de networking enfocado en el liderazgo femenino y la creación de redes comerciales sólidas en la región.",
    imagen: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=500&auto=format&fit=crop&q=80",
    link: "https://sitios.sercotec.cl/centros-de-negocios/2026/04/08/cdn-copiapo-fortalece-redes-empresariales-con-encuentro-de-vinculacion-que-releva-el-liderazgo-de-mujeres-emprendedoras/"
  },
  {
    id: "n-3",
    titulo: "Fiesta de la Vendimia Melipilla 2026: la gran celebración del vino y la identidad vitivinícola provincial",
    fecha: "27 de Marzo de 2026",
    resumen: "Con una alta participación de viñedos y artesanos locales apoyados por el Centro de Melipilla, se llevó a cabo esta tradicional festividad que promueve el turismo de la zona y resalta la rica identidad vitivinícola.",
    imagen: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=500&auto=format&fit=crop&q=80",
    link: "https://sitios.sercotec.cl/centros-de-negocios/2026/03/27/fiesta-de-la-vendimia-melipilla-2026-la-celebracion-del-vino-y-la-identidad-de-nuestra-provincia/"
  },
  {
    id: "n-4",
    titulo: "Empresa quilpueina se consolida en la construcción industrializada y proyecta internacionalización",
    fecha: "24 de Marzo de 2026",
    resumen: "Mediante el acompañamiento y asesorías del Centro, una destacada pyme de construcción modular en Quilpué optimizó sus procesos productivos y hoy se prepara para exportar soluciones habitacionales a Sudamérica.",
    imagen: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=500&auto=format&fit=crop&q=80",
    link: "https://sitios.sercotec.cl/centros-de-negocios/2026/03/24/empresa-quilpueina-se-consolida-en-la-construccion-industrializada-y-proyecta-internacionalizacion/"
  }
];

export default function News({ articles = [] }) {
  const displayArticles = articles && articles.length > 0 ? articles : NEWS_DATA;

  return (
    <div className="news-grid">
      {displayArticles.map((item) => (
        <article key={item.id} className="news-card">
          <div className="news-image-wrapper">
            <img src={item.imagen} alt={item.titulo} className="news-img" loading="lazy" />
            <span className="news-date-badge">{item.fecha}</span>
          </div>
          <div className="news-body">
            <h3 className="news-headline">{item.titulo}</h3>
            <p className="news-excerpt">{item.resumen}</p>
            <a 
              href={item.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="news-read-more"
            >
              Leer noticia oficial →
            </a>
          </div>
        </article>
      ))}
    </div>
  );
}
