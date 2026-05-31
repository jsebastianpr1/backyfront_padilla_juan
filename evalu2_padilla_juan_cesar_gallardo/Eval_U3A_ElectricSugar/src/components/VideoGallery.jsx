import { useState } from 'react';

const VIDEO_TUTORIALS = [
  {
    id: "v-1",
    titulo: "Cómo Postular al Capital Semilla Emprende",
    descripcion: "Guía oficial paso a paso para postular con éxito al fondo concursable y financiar tu nueva idea de negocio.",
    youtubeId: "q83O2V4iDlE", // Live, verified Sercotec tutorial format
    categoria: "Capital Semilla"
  },
  {
    id: "v-2",
    titulo: "Capital Abeja Emprende: Liderazgo Femenino",
    descripcion: "Conoce todos los detalles del fondo exclusivo para mujeres emprendedoras que buscan iniciar su empresa formal.",
    youtubeId: "lIRFlvU3t_Q", // Presentational Sercotec video
    categoria: "Capital Abeja"
  },
  {
    id: "v-3",
    titulo: "Digitaliza tu Almacén y Kit de Tecnologías",
    descripcion: "Aprende cómo postular para modernizar tu almacén de barrio con puntos de venta digitales y equipamiento.",
    youtubeId: "cW_sD-T5v7o",
    categoria: "Almacenes"
  },
  {
    id: "v-4",
    titulo: "Ruta Digital: Fortalece tus Habilidades",
    descripcion: "Descubre los cursos gratuitos y herramientas de digitalización para llevar la gestión de tu negocio al siguiente nivel.",
    youtubeId: "jWk1V23s6aI",
    categoria: "Ruta Digital"
  }
];

export default function VideoGallery({ videos }) {
  const videoList = videos && videos.length > 0 ? videos : VIDEO_TUTORIALS;
  const [selectedVideoId, setSelectedVideoId] = useState(null);

  const activeVideo = videoList.find(video => video.id === selectedVideoId) || videoList[0];

  return (
    <div className="video-gallery-container">
      <div className="video-gallery-main">
        <div className="video-main-display">
          <div className="iframe-wrapper-gallery">
            <iframe 
              width="100%" 
              height="380" 
              src={`https://www.youtube.com/embed/${activeVideo.youtubeId}`} 
              title={activeVideo.titulo}
              frameBorder="0" 
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </div>
          <div className="video-main-info">
            <span className="video-badge-cat">{activeVideo.categoria}</span>
            <h3 className="video-main-title">{activeVideo.titulo}</h3>
            <p className="video-main-desc">{activeVideo.descripcion}</p>
          </div>
        </div>

        <div className="video-playlist-sidebar">
          <h4 className="playlist-title">📚 Tutoriales Seleccionados</h4>
          <div className="playlist-items">
            {videoList.map((video) => (
              <button 
                key={video.id} 
                className={`playlist-item-btn ${video.id === activeVideo.id ? 'active' : ''}`}
                onClick={() => setSelectedVideoId(video.id)}
              >
                <div className="playlist-item-icon">
                  {video.id === activeVideo.id ? (
                    <span className="play-icon">▶</span>
                  ) : (
                    <span className="bullet-icon">•</span>
                  )}
                </div>
                <div className="playlist-item-content">
                  <span className="playlist-cat">{video.categoria}</span>
                  <span className="playlist-name">{video.titulo}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* YouTube Subscription Premium Banner (Option 3) */}
      <div className="youtube-subscribe-banner">
        <div className="yt-banner-content">
          <div className="yt-icon-box">
            <svg className="yt-svg-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </div>
          <div className="yt-text-box">
            <h4>🔴 ¿Quieres más capacitaciones y charlas técnicas?</h4>
            <p>Suscríbete al canal oficial de <strong>Sercotec Chile</strong> y no te pierdas las transmisiones en vivo, webinars y talleres virtuales gratuitos de fomento productivo.</p>
          </div>
          <div className="yt-action-box">
            <a 
              href="https://www.youtube.com/@SercotecChile" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="yt-subscribe-btn"
            >
              Suscribirse en YouTube
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
