import { useState, useEffect } from "react";

const slides = [
  "../public/images/banner1.jpg",
  "../public/images/banner2.jpg",
  "../public/images/banner3.jpg"
];

function Slider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="slider-container">
      <button 
        onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
        className="slider-btn prev"
      >
        Назад
      </button>
      <img src={slides[currentSlide]} alt="Слайд" className="slider-image" />
      <button 
        onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
        className="slider-btn next"
      >
        Вперед
      </button>
    </div>
  );
}

export default Slider;
