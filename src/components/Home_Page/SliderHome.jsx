import React, { useState, useEffect } from "react";
import "./SliderHome.css";
import slide1 from "../../assets/slider1.jpg";
import slide2 from "../../assets/slider2.jpg";
import slide3 from "../../assets/slider3.jpg";

const SliderHome = () => {
  const slides = [
    { id: 1, image: slide1, title: "Welcome to Our Club" },
    { id: 2, image: slide2, title: "Explore Events" },
    { id: 3, image: slide3, title: "Join Us Today" },
  ];

  const [current, setCurrent] = useState(0);

  // Auto-play functionality
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, [current]);

  const prevSlide = () => {
    setCurrent(current === 0 ? slides.length - 1 : current - 1);
  };

  const nextSlide = () => {
    setCurrent(current === slides.length - 1 ? 0 : current + 1);
  };

  return (
    <div className="slider-wrapper">
      <div className="slider-container">
        {/* Left arrow */}
        <button className="arrow left" onClick={prevSlide}>
          <i className="fas fa-chevron-left"></i>
        </button>

        {/* Slides */}
        <div className="slides-container">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`slide ${index === current ? "active" : ""}`}
              style={{
                transform: `translateX(${100 * (index - current)}%)`,
              }}
            >
              <img src={slide.image} alt={slide.title} />
              <div className="slide-content">
                <h2>{slide.title}</h2>
              </div>
            </div>
          ))}
        </div>

        {/* Right arrow */}
        <button className="arrow right" onClick={nextSlide}>
          <i className="fas fa-chevron-right"></i>
        </button>

        {/* Dots */}
        <div className="dots">
          {slides.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === current ? "active" : ""}`}
              onClick={() => setCurrent(index)}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SliderHome;
