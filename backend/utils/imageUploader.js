import React, { useState } from 'react';

function ImageUploader({ onImageUpload }) {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleImageUpload = () => {
    // Check if an image is selected
    if (image) {
      // Perform upload logic, for example using FormData and axios
      const formData = new FormData();
      formData.append('image', image);

      // Example axios post request
      // Replace '/api/upload' with your backend API endpoint for image upload
      axios.post('/api/upload', formData)
        .then(response => {
          // Handle successful image upload
          onImageUpload(response.data.imageUrl);
        })
        .catch(error => {
          // Handle image upload error
          console.error('Error uploading image:', error);
        });
    } else {
      // Handle case where no image is selected
      console.log('Please select an image');
    }
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleImageUpload}>Upload Image</button>
    </div>
  );
}

export default ImageUploader;
