import React from 'react';
import Home from './Home'; // Assuming that Home component is in the same directory
import './CSS/Home.css';

function DragAndDropWrapper() {
  const handleDrop = (event) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    const input = document.querySelector('.first'); // Reference to the file input element
    input.files = files; // Set the files property of the file input element
    input.dispatchEvent(new Event('change')); // Dispatch a change event to trigger handleFileChange
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div className='drag-and-drop' onDrop={handleDrop} onDragOver={handleDragOver}>
      <Home />
    </div>
  );
}

export default DragAndDropWrapper;
