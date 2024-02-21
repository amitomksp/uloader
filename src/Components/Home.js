
import React, { useState } from 'react';
import './CSS/Home.css';

function Home() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleFileChange = (event) => {
    const newFiles = Array.from(event.target.files);
    const filesWithinLimit = newFiles.filter(file => file.size <= 200 * 1024); // Maximum size limit: 200 KB
    const oversizedFiles = newFiles.filter(file => file.size > 200 * 1024); // Get oversized files
    if (oversizedFiles.length > 0) {
      const message = `File size exceeds the maximum limit: ${oversizedFiles.map(file => file.name).join(', ')}`;
      setErrorMessage(message);
      setTimeout(() => setErrorMessage(''), 2000); // Clear error message after 2 seconds
    } else {
      setErrorMessage('');
      setSelectedFiles([...selectedFiles, ...filesWithinLimit]);
    }
  };

  const handleSubmit = async () => {
    if (selectedFiles.length > 0) {
      const existingData = JSON.parse(localStorage.getItem('fileDataUrls')) || [];
      const newData = await Promise.all(selectedFiles.map(file => readFileAsDataURL(file)));
      const combinedData = [...existingData, ...newData];
      localStorage.setItem('fileDataUrls', JSON.stringify(combinedData));
      setSelectedFiles([]);
    }
    if (!errorMessage) {
      alert("New image Added Successfully! Refresh it to See Changes on your Desktop");
    }
  };

  const readFileAsDataURL = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  return (
    <div className='file'>
      <input className='first' type='file' onChange={handleFileChange} multiple accept=".jpg, .jpeg, .png" />
      <input className='second' type='submit' value='Submit' onClick={handleSubmit} />
      {errorMessage && <p className='error-message'>{errorMessage}</p>}
    </div>
  );
}

export default Home;
