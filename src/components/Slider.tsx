import React, { useState, useEffect } from "react";
import "./css/Slider.css";

const slides = [
  {
    title: "Amazon Echo",
    subtitle: "3rd Generation, Charcoal",
    image: "/resources/img/mulher_no_bg.png",
  },
  {
    title: "Smart Watch",
    subtitle: "Series 6, Apple",
    image: "/resources/img/mulher_no_bg.png",
  },
  {
    title: "Bluetooth Speaker",
    subtitle: "Portable & Loud",
    image: "/resources/img/mulher_no_bg.png",
  },
];

const Slider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000); // muda a cada 5 segundos
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="slider">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`slide ${index === current ? "active" : ""}`}
        >
          <div className="text">
            <h2>{slide.title}</h2>
            <p>{slide.subtitle}</p>
            <button>Buy Now</button>
          </div>
          <img src={slide.image} alt={slide.title} />
        </div>
      ))}
      <div className="dots">
        {slides.map((_, index) => (
          <span
            key={index}
            className={index === current ? "dot active" : "dot"}
            onClick={() => setCurrent(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
