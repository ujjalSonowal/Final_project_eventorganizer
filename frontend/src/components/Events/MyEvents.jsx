import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StarRating from "../StarRating";
import "./myevent.css";
// import "./style.css";

const MyEvents = ({ myev }) => {
  const [showForm, setShowForm] = useState(false);
  const [showImage, setShowImage] = useState(null);
  const [userId, setUserId] = useState(localStorage.getItem("User"));
  const navigate = useNavigate();
  const [name, setEventName] = useState(myev.name);
  const [type, setType] = useState(myev.type);
  const [status, setStatus] = useState("true");
  const [price, setPrice] = useState(myev.price);
  const [capacity, setCapacity] = useState(myev.capacity);
  const [eventdesc, setEventdesc] = useState(myev.eventdesc);
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
      fetchImages();
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

  const [newPrice, setNewPrice] = useState("");
  const [newCapacity, setNewCapacity] = useState("");

  const handlePriceChange = (index, value) => {
    const updatedPrices = [...price];
    updatedPrices[index] = value;
    setPrice(updatedPrices);
  };

  const removePrice = (index) => {
    setPrice(price.filter((_, i) => i !== index));
  };

  const handleCapacityChange = (index, value) => {
    const updatedCapacities = [...capacity];
    updatedCapacities[index] = value;
    setCapacity(updatedCapacities);
  };
  const removeCapacity = (index) => {
    setCapacity(capacity.filter((_, i) => i !== index));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const data = { name, type, price, capacity, status, eventdesc };
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
    <div id="myevent-container" className={showForm ? "form-popup-open" : ""}>
      <div className="card">
        <div className="card-content">
          <h2>Event Name: {myev.name}</h2>
          <p>Type: {myev.type}</p>
          <p className="price">Price: {myev.price.join(", ")}</p>
          <p className="capacity">Capacity: {myev.capacity.join(", ")}</p>
          <p className="rating">
            Rating: <StarRating rating={myev.averageRating} />
          </p>
          <p>Status: {myev.status === true ? "Active" : "Inactive"}</p>
          <p className="create-on">Created On: {myev.createOn}</p>
          <p>
            <strong>Description:</strong> {myev.eventdesc}
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
          {images.length > 4 && <div className="image-slider"></div>}
          <button id="my-update" onClick={toggleForm}>
            Update
          </button>

          {showImage && (
            <div className="image-modal">
              <div className="image-modal-content">
                <button
                  className="delete-button-modal"
                  onClick={handleDeleteImage}
                >
                  Delete
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
      <div>
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

              <label htmlFor="capacity">Capacity</label>
              <div id="cap">
                {capacity.map((c, index) => (
                  <div id="price" key={index} className="capacity-item">
                    <input
                      type="text"
                      value={c}
                      onChange={(e) =>
                        handleCapacityChange(index, e.target.value)
                      }
                    />
                    <button
                      id="btn"
                      type="button"
                      className="remove-service"
                      onClick={() => removeCapacity(index)}
                    >
                      X
                    </button>
                  </div>
                ))}
                <input
                  className="capacityInput"
                  type="text"
                  placeholder="Add Capacity"
                  value={newCapacity}
                  onChange={(e) => setNewCapacity(e.target.value)}
                />
                <button
                  id="bt"
                  type="button"
                  className="add-service"
                  onClick={() => {
                    setCapacity([...capacity, newCapacity]);
                    setNewCapacity("");
                  }}
                >
                  Add Capacity
                </button>
              </div>
              <label htmlFor="price">Prices</label>
              <div id="cap">
                {price.map((p, index) => (
                  <div id="price" key={index} className="price-item">
                    <input
                      type="text"
                      value={p}
                      onChange={(e) => handlePriceChange(index, e.target.value)}
                    />
                    <button
                      id="btn"
                      type="button"
                      className="remove-service"
                      onClick={() => removePrice(index)}
                    >
                      X
                    </button>
                  </div>
                ))}
                <input
                  type="text"
                  placeholder="Add a Price"
                  value={newPrice}
                  onChange={(e) => setNewPrice(e.target.value)}
                />
                <button
                  id="bt"
                  type="button"
                  className="add-service"
                  onClick={() => {
                    setPrice([...price, newPrice]);
                    setNewPrice("");
                  }}
                >
                  Add Price
                </button>
              </div>
              <label htmlFor="price">Description</label>
              <input
                style={{
                  width: "100%",
                  height: "150px",
                  padding: "12px 20px",
                  boxSizing: "border-box",
                  border: "2px solid #ccc",
                  borderRadius: "4px",
                  backgroundColor: " #f8f8f8",
                  fontSize: "16px",
                  resize: "none",
                }}
                type="textarea"
                placeholder="Add a Description"
                value={eventdesc}
                onChange={(e) => setEventdesc(e.target.value)}
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
      </div>
    </div>
  );
};

export default MyEvents;
