import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StarRating from "../StarRating";
import "./myevent.css";

const MyEvents = ({ myev }) => {
  const [showForm, setShowForm] = useState(false);
  const [showImage, setShowImage] = useState(null);
  const [userId, setUserId] = useState(localStorage.getItem("User"));
  const navigate = useNavigate();
  const [name, setEventName] = useState(myev.name);
  const [type, setType] = useState(myev.type);
  const [price, setPrice] = useState(myev.price);
  const [capacity, setCapacity] = useState(myev.capacity);
  const [images, setImages] = useState([]);
  const [file, setFile] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const eventId = myev?._id;

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await fetch(
        `http://localhost:5001/file/images/user/${userId}/event/${eventId}`
      );
      const data = await response.json();
      setImages(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleImageUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("images", file);
    formData.append("userId", userId);
    formData.append("eventId", eventId);

    try {
      const response = await fetch("http://localhost:5001/file/post", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      console.log(data);
      fetchImages(); // Refresh the images list after upload
    } catch (error) {
      console.error(error);
    }
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const toggleOff = () => {
    setShowForm(false);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const data = { name, type, price, capacity };
    try {
      const response = await fetch(
        `http://localhost:5001/events/update/${eventId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      if (!response.ok) {
        console.log("error");
      }
      const updated = await response.json();
      console.log(updated);
      navigate(`/myevent/${userId}`);
      setShowForm(false);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageClick = (image, index) => {
    setShowImage(image);
    setSelectedImageIndex(index);
  };

  const handleImageClose = () => {
    setShowImage(null);
  };

  const handleDeleteImage = async () => {
    try {
      const response = await fetch(
        `http://localhost:5001/file/delete/${images[selectedImageIndex]._id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        console.log("error");
      }
      fetchImages();
      setShowImage(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="card">
      {/* <img src="" alt="Event" /> */}
      <div className="card-content">
        <h2>Event Name: {myev.name}</h2>
        <p>Type: {myev.type}</p>
        <p className="price">Price: {myev.price}</p>
        <p className="capacity">Capacity: {myev.capacity}</p>
        <p className="rating">
          Rating: <StarRating rating={myev.rating} />
        </p>
        <p className="status">Status: {myev.status}</p>
        <p className="create-on">Created On: {myev.createOn}</p>
        <p className="total-booking">Total Bookings: {myev.totalbooking}</p>
        <p className="no-of-comments">Number of Comments: {myev.noofcomment}</p>
        <div>
          <form onSubmit={handleImageUpload}>
            <input type="file" accept="images/*" onChange={handleFileChange} />
            <button type="submit">Add Image</button>
          </form>
        </div>
        <div className="image-box">
          {images.map((image, index) => (
            <div key={index} className="image-container">
              <img
                src={`http://localhost:5001/uploads/${image.images}`}
                alt="Event"
                onClick={() => handleImageClick(image, index)}
                className="event-image"
              />
              {index === selectedImageIndex && (
                <div className="image-buttons">
                  <button className="delete-button" onClick={handleDeleteImage}>
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
        {images.length > 4 && (
          <div className="image-slider">
            {/* Implement your slider logic here */}
          </div>
        )}
        <button id="my-update" onClick={toggleForm}>
          Update
        </button>
        {/* <div className="comments">
          <h3>Comments:</h3>
          <div className="comment">
            {myev.comment &&
              myev.comment.map((comment, index) => (
                <div key={index}>
                  <p className="p3">
                    <strong>Comment Body: {comment.commentBody} </strong>
                  </p>
                  <p className="p3"> Comment On: {comment.commentDate}</p>
                </div>
              ))}
          </div>
        </div> */}
        {showForm && (
          <div className="form-popup">
            <form onSubmit={handleUpdate}>
              <label id="form-label" htmlFor="name">
                Event Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setEventName(e.target.value)}
              />
              <label id="form-label" htmlFor="type">
                Event Type
              </label>
              <input
                type="text"
                onChange={(e) => setType(e.target.value)}
                value={type}
              />
              <label id="form-label" htmlFor="price">
                Price
              </label>
              <input
                type="number"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
              />
              <label id="form-label" htmlFor="capacity">
                Capacity
              </label>
              <input
                type="number"
                onChange={(e) => setCapacity(e.target.value)}
                value={capacity}
              />
              <div className="morebutton">
                <button id="submit" type="submit">
                  Submit
                </button>
                <button
                  id="cancel"
                  className="cancel-update"
                  onClick={toggleOff}
                >
                  Cancel Update
                </button>
              </div>
            </form>
          </div>
        )}
        {showImage && (
          <div className="image-modal">
            <div className="image-modal-content">
              <button
                className="delete-button-modal"
                onClick={handleDeleteImage}
              >
                delete
              </button>
              <button
                className="cancel-button-modal"
                onClick={handleImageClose}
              >
                Cancel
              </button>
              <img
                src={`http://localhost:5001/uploads/${showImage.images}`}
                alt="Event"
                className="large-image"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyEvents;
