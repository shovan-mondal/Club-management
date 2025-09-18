import React, { useState } from "react";
import "./GalleryHome.css";
import slide1 from "../../assets/gallery1.jpg";
import slide2 from "../../assets/gallery2.jpg";
import slide3 from "../../assets/gallery3.jpg";
import slide4 from "../../assets/gallery4.jpg";

const GalleryHome = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const images = [
    { id: 1, image: slide1, title: "Event 1" },
    { id: 2, image: slide2, title: "Event 2" },
    { id: 3, image: slide3, title: "Event 3" },
    { id: 4, image: slide4, title: "Event 4" },
  ];

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="gallery-container">
      <h2 className="gallery-title">Our Gallery</h2>
      <div className="gallery-grid">
        {images.map((item) => (
          <div key={item.id} className="gallery-item">
            <img
              src={item.image}
              alt={item.title}
              onClick={() => handleImageClick(item)}
            />
            <div className="image-overlay">
              <h3>{item.title}</h3>
            </div>
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className="modal" onClick={handleCloseModal}>
          <div className="modal-content">
            <span className="close-button" onClick={handleCloseModal}>&times;</span>
            <img src={selectedImage.image} alt={selectedImage.title} />
            <h3>{selectedImage.title}</h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryHome;
