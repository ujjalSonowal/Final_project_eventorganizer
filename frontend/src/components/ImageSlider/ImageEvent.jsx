import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import styled from "styled-components";
import { EnlargedImage } from "./EnlargedImage";

export const ImageEvent = ({ eventId }) => {
  const [images, setImages] = useState([]);
  const [showEnlargedImage, setShowEnlargedImage] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(
          `http://localhost:5001/file/images/event/${eventId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch images");
        }
        const data = await response.json();
        setImages(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchImages();
  }, [eventId]);

  const handleImageClick = (image) => {
    setShowEnlargedImage(image);
  };

  const handleEnlargedImageClose = () => {
    setShowEnlargedImage(null);
  };

  // Slick settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <ImageContainer>
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className="slider-image">
            <ImageThumbnail
              src={`http://localhost:5001/uploads/${image.images}`}
              alt={`Event ${index}`}
              onClick={() => handleImageClick(image)}
            />
          </div>
        ))}
      </Slider>

      {showEnlargedImage && (
        <EnlargedImage
          image={`http://localhost:5001/uploads/${showEnlargedImage.images}`}
          onClose={handleEnlargedImageClose}
        />
      )}
    </ImageContainer>
  );
};

const ImageContainer = styled.div`
  width: 100%;
  margin: 0 auto;
`;

const ImageThumbnail = styled.img`
  width: 100%;
  height: 200px;
  cursor: pointer;
`;

export default ImageEvent;
