import { useState, useEffect, useRef } from 'react';

export default function Carousel({ testimonials = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Auto play carousel every 6 seconds
  useEffect(() => {
    if (testimonials.length === 0) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(interval);
  }, [testimonials]);

  if (!testimonials || testimonials.length === 0) {
    return <div className="loading-testimonials">Cargando testimonios...</div>;
  }

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      // Swipe Left -> Next
      handleNext();
    }
    if (touchStartX.current - touchEndX.current < -50) {
      // Swipe Right -> Prev
      handlePrev();
    }
  };

  return (
    <div 
      className="carousel-container" 
      aria-roledescription="carousel" 
      aria-label="Testimonios de Clientes"
    >
      <div className="carousel-inner">
        <button 
          className="carousel-btn prev-btn" 
          onClick={handlePrev}
          aria-label="Testimonio anterior"
        >
          &#10094;
        </button>

        <div 
          className="carousel-track-wrapper"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div 
            className="carousel-track" 
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {testimonials.map((test, index) => (
              <div 
                key={test.id} 
                className={`carousel-slide ${index === activeIndex ? 'active' : ''}`}
                role="group" 
                aria-roledescription="slide" 
                aria-label={`${index + 1} de ${testimonials.length}`}
                aria-hidden={index !== activeIndex}
              >
                <div className="testimonial-card">
                  <div className="testimonial-quote">
                    <span className="quote-mark">“</span>
                    <p>{test.comentario}</p>
                  </div>
                  <div className="testimonial-author">
                    <div className="author-info">
                      <h4 className="author-name">{test.cliente}</h4>
                      <p className="author-company">{test.empresa}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button 
          className="carousel-btn next-btn" 
          onClick={handleNext}
          aria-label="Siguiente testimonio"
        >
          &#10095;
        </button>
      </div>

      <div className="carousel-dots" role="tablist" aria-label="Seleccionar testimonio">
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={`carousel-dot ${index === activeIndex ? 'active' : ''}`}
            role="tab"
            aria-selected={index === activeIndex}
            aria-label={`Ir al testimonio ${index + 1}`}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}
