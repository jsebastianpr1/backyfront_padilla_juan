import { useState } from 'react';

export default function FAQ({ faqItems = [] }) {
  const [openId, setOpenId] = useState(null);

  const toggleFAQ = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  if (!faqItems || faqItems.length === 0) {
    return <div className="loading-faq">Cargando preguntas frecuentes...</div>;
  }

  return (
    <div className="faq-wrapper">
      <h3 className="faq-subtitle">Resolvemos tus dudas de forma rápida</h3>
      <div className="faq-accordion">
        {faqItems.map((item) => {
          const isOpen = openId === item.id;
          return (
            <div 
              key={item.id} 
              className={`faq-item ${isOpen ? 'open' : ''}`}
            >
              <button
                type="button"
                className="faq-question"
                onClick={() => toggleFAQ(item.id)}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${item.id}`}
                id={`faq-btn-${item.id}`}
              >
                <span>{item.pregunta}</span>
                <span className="faq-icon" aria-hidden="true">
                  {isOpen ? '−' : '+'}
                </span>
              </button>
              <div
                id={`faq-answer-${item.id}`}
                className="faq-answer-container"
                role="region"
                aria-labelledby={`faq-btn-${item.id}`}
                style={{ 
                  maxHeight: isOpen ? '250px' : '0px',
                  opacity: isOpen ? 1 : 0
                }}
              >
                <div className="faq-answer-content">
                  <p>{item.respuesta}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
