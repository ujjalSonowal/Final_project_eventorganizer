import React, { useState, useEffect } from "react";
import "./slider.css";
// import "./style.css";
import { Link } from "react-router-dom";

export const EventSlider = ({ slides }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextSlide = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [currentImageIndex]);

  const handleBookNow = () => {
    // Handle booking logic here
    console.log("Book Now clicked");
  };

  return (
    <div className="slider">
      <button className="prev" onClick={prevSlide}>
        &#10094;
      </button>
      {slides.map((slide, index) => (
        <div
          className={index === currentImageIndex ? "slide active" : "slide"}
          key={index}
        >
          {/* {index === currentImageIndex && (
            <img src={image} alt={`Slide ${index}`} className="image" />
            
          )}
           */}
          <div className="image-container">
            <img src={slide.image} alt={`Slide ${index}`} className="image" />
            <div className="content-overlay">
              <h3 className="event-name">EventName: Wedding party</h3>
              <p className="event-description">
                An event description is a written piece that provides an
                overview of an event. It should be clear and concise, and it
                should answer the five essential questions: who, what, when,
                where, and why. The event description should also be persuasive,
                and it should aim to attract the intended audience and
                potentially attract new attendees.
              </p>
              <p className="event-price">Price:$100</p>
              <p className="event-rating star-rating">
                {generateStarRating(slide.rating)}
              </p>
              <Link to="/booking">
                <button className="book-now" onClick={handleBookNow}>
                  Book Now
                </button>
              </Link>
            </div>
          </div>
        </div>
      ))}
      <button className="next" onClick={nextSlide}>
        &#10095;
      </button>
    </div>
  );
};

function generateStarRating(rating) {
  const fullStars = Math.floor(rating);
  const remainder = rating - fullStars;
  let stars = "★".repeat(fullStars);

  if (remainder > 0) {
    stars += "½"; // Add half star if remainder is greater than 0
  }

  const emptyStars = 5 - Math.ceil(rating); // Calculate remaining empty stars
  stars += "☆".repeat(emptyStars);

  return stars;
}

// export default EventSlider;
