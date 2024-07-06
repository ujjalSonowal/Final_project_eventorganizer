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
  const [status, setStatus] = useState("false"); // Convert to boolean
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

  // Add price
  const [newPrice, setNewPrice] = useState("");

  const addPrice = () => {
    if (newPrice) {
      setPrice([...price, newPrice]);
      setNewPrice("");
    }
  };

  const removePrice = (index) => {
    setPrice(price.filter((_, i) => i !== index));
  };

  // Add capacity
  const [newCapacity, setNewCapacity] = useState("");

  const addCapacity = () => {
    if (newCapacity) {
      setCapacity([...capacity, newCapacity]);
      setNewCapacity("");
    }
  };

  const removeCapacity = (index) => {
    setCapacity(capacity.filter((_, i) => i !== index));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const data = { name, type, price, capacity, status };
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
      window.location.reload(); // Temporary solution, consider a more refined approach for updating UI
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
    <div className="myevent-container">
      <div className="card">
        <div className="card-content">
          <h2>Event Name: {myev.name}</h2>
          <p>Type: {myev.type}</p>
          <p className="price">Price: {myev.price.join(", ")}</p>
          <p className="capacity">Capacity: {myev.capacity.join(", ")}</p>
          <p className="rating">
            Rating: <StarRating rating={myev.rating} />
          </p>
          <p>Status: {myev.status === true ? "Active" : "Inactive"}</p>
          <p className="create-on">Created On: {myev.createOn}</p>
          <p className="total-booking">Total Bookings: {myev.totalbooking}</p>
          <p className="no-of-comments">
            Number of Comments: {myev.noofcomment}
          </p>
          <div>
            <form onSubmit={handleImageUpload}>
              <input
                className="imginput"
                type="file"
                accept="images/*"
                onChange={handleFileChange}
              />
              <button type="submit" className="imagebtn">
                Upload
              </button>
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
                    <button
                      className="delete-button"
                      onClick={handleDeleteImage}
                    >
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
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                />
                <label>Status</label>
                <select
                  className="selectbtn"
                  onChange={(e) => setStatus(e.target.value === "true")}
                  value={status}
                >
                  <option value={"true"}>Active</option>
                  <option value={"false"}>Inactive</option>
                </select>
                <br />
                <label htmlFor="price">Prices</label>
                <div>
                  <input
                    type="text"
                    placeholder="Add a Price"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                  />
                  <button
                    type="button"
                    className="add-service"
                    onClick={addPrice}
                  >
                    Add Prices
                  </button>
                </div>
                <ul>
                  {price.map((price, index) => (
                    <li key={index}>
                      {price}
                      <button
                        type="button"
                        className="remove-service"
                        onClick={() => removePrice(index)}
                      >
                        X
                      </button>
                    </li>
                  ))}
                </ul>
                <label htmlFor="capacity">Capacity</label>
                <div>
                  <input
                    className="capacityInput"
                    type="number"
                    placeholder="add capacity"
                    value={newCapacity}
                    onChange={(e) => setNewCapacity(e.target.value)}
                  />
                  <button
                    type="button"
                    className="add-service"
                    onClick={addCapacity}
                  >
                    Add Capacity
                  </button>
                </div>
                <ul>
                  {capacity.map((capacity, index) => (
                    <li key={index}>
                      {capacity}
                      <button
                        type="button"
                        className="remove-service"
                        onClick={() => removeCapacity(index)}
                      >
                        X
                      </button>
                    </li>
                  ))}
                </ul>
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
    </div>
  );
};

export default MyEvents;
