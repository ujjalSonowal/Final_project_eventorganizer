// ImageSlider.js
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import styled from "styled-components";
import { EnlargedImage } from "./EnlargedImage";

export const ImageSlider = ({ eventId }) => {
  const [images, setImages] = useState([]);
  // const [showImage, setShowImage] = useState(null);
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

  // const handleImageClick = (image) => {
  //   setShowImage(image);
  // };

  // const handleImageClose = () => {
  //   setShowImage(null);
  // };

  // Slick settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div>
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className="slider-image">
            <img
              src={`http://localhost:5001/uploads/${image.images}`}
              alt={`Event ${index}`}
              onClick={() => handleImageClick(image)}
              style={{
                width: "80%",
                height: "400px",
                paddingTop: "40px",
                marginLeft: "80px",
              }} // Adjusted width and height
            />
          </div>
        ))}
      </Slider>

      {/* {showImage && (
        <ImageModal>
          <ImageContent>
            <CloseButton onClick={handleImageClose}>Cancel</CloseButton>
            <img
              src={`http://localhost:5001/uploads/${showImage.images}`}
              alt="Event"
              className="large-image"
              style={{ maxWidth: "100%", maxHeight: "100%" }} // Adjusted width and height
            />
          </ImageContent>
        </ImageModal>
      )} */}
      {showEnlargedImage && (
        <EnlargedImage
          image={`http://localhost:5001/uploads/${showEnlargedImage.images}`}
          onClose={handleEnlargedImageClose}
        />
      )}
    </div>
  );
};

const ImageModal = styled.div`
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  width: 98%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  /* cursor: pointer; */
`;

const ImageContent = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  left: 30px;
  width: 100%;
`;

const CloseButton = styled.button`
  position: absolute;
  right: 70px;
  top: 40px;
  background-color: transparent;
  border: none;
  color: #fff;
  cursor: pointer;
  font-size: 1.5rem;
`;
