// EnlargedImage.js
import React from "react";
import styled from "styled-components";

export const EnlargedImage = ({ image, onClose }) => {
  return (
    <Overlay onClick={onClose}>
      <ImageContainer>
        {/* <but onClick={onClose}>Close</CloseButton> */}
        <img src={image} alt="Enlarged Event" />
      </ImageContainer>
    </Overlay>
  );
};

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ImageContainer = styled.div`
  position: relative;
`;

// const CloseButton = styled.button`
//   position: absolute;
//   top: 100px;
//   right: 100px;
//   background-color: transparent;
//   border: none;
//   color: #fff;
//   cursor: pointer;
//   font-size: 1rem;
// `;

//  default EnlargedImage;
