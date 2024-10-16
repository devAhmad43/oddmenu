import { useState, useEffect } from 'react';
import slide1 from "../../assets/slide1.jpg";
import slide2 from "../../assets/slide2.jpg";
import slide3 from "../../assets/slide3.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [slide1, slide2, slide3];

  const changeSlide = (direction) => {
    setCurrentSlide((prevSlide) =>
      direction === 'next'
        ? (prevSlide + 1) % slides.length
        : prevSlide === 0
        ? slides.length - 1
        : prevSlide - 1
    );
  };

  // Auto-scroll every 3 seconds
  useEffect(() => {
    const autoScroll = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 3000); // Scroll every 3 seconds
    return () => clearInterval(autoScroll); // Cleanup on unmount
  }, [slides.length]);

  return (
    <div className="relative w-full mt-14 overflow-hidden">
      <div className="relative h-auto md:h-96 overflow-hidden flex">
        {/* Carousel inner wrapper for smooth scrolling */}
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((src, index) => (
            <div key={index} className="flex-shrink-0 w-full md:h-full h-auto">
              <img
                src={src}
                className="block w-full md:h-full h-auto md:object-cover object-contain" // Use object-cover for full area coverage
                alt={`Slide ${index + 1}`}
              />
            </div>
          ))}
        </div>
      </div>
      <button
        className="absolute top-0 left-0 z-30 flex items-center justify-center md:h-full h-auto px-4 hidden md:flex"
        onClick={() => changeSlide("prev")}
      >
        <FontAwesomeIcon className="bg-yellow-500 py-6 text-black font-extrabold text-lg  px-4 rounded-r-lg bg-opacity-50" icon={faChevronLeft} />
      </button>
      <button
        className="absolute top-0 right-0 z-30 flex items-center justify-center md:h-full h-auto px-4 hidden md:flex"
        onClick={() => changeSlide("next")}
      >
<FontAwesomeIcon className="bg-yellow-500 py-6 text-black font-extrabold text-lg px-4 rounded-l-lg bg-opacity-50" icon={faChevronRight} />
</button>

    </div>
  );
};

export default Hero;
