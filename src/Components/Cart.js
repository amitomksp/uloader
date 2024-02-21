import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./CSS/cart.css";

function Cart() {
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    // Retrieve image URLs from local storage
    const storedImageUrls = localStorage.getItem("fileDataUrls");
    if (storedImageUrls) {
      // console.log(JSON.parse(storedImageUrls));

      setImageUrls(JSON.parse(storedImageUrls));

      // setImageUrls(storedImageUrls);
    } else {
      console.log("No image Found");
    }
  }, []); // Empty dependency array to run this effect only once

  const handleDelete = (index) => {
    const updatedImageUrls = [...imageUrls];
    updatedImageUrls.splice(index, 1);
    setImageUrls(updatedImageUrls);
    localStorage.setItem("fileDataUrls", JSON.stringify(updatedImageUrls));
  };

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("index", index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, newIndex) => {
    e.preventDefault();
    const draggedIndex = e.dataTransfer.getData("index");
    const updatedImageUrls = [...imageUrls];
    const draggedImage = updatedImageUrls[draggedIndex];
    updatedImageUrls.splice(draggedIndex, 1);
    updatedImageUrls.splice(newIndex, 0, draggedImage);
    setImageUrls(updatedImageUrls);
    localStorage.setItem('fileDataUrls', JSON.stringify(updatedImageUrls));
  };

  return (
    <div className="cart">
      <h2>Cart</h2>
      <hr />
      <div className="image-list">
        {imageUrls.map((imageUrl, index) => (
          <div
            key={index}
            className="image-item"
            onDragOver={(e) => handleDragOver(e)}
            onDrop={(e) => handleDrop(e, index)}
          >
            <img
              src={imageUrl}
              alt={`Image ${index + 1}`}
              draggable="true"
              onDragStart={(e) => handleDragStart(e, index)}
              // style={{ filter: `brightness(80%) sepia(100%) hue-rotate(180deg) saturate(50%) brightness(100%) contrast(120%) invert(10%)` }}
            />
            <button
              className="delete-button"
              onClick={() => handleDelete(index)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cart;
