import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UpdateListingForm(props) {
  const [schoolName, setSchoolName] = useState('');
  const [about, setAbout] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    axios.get(`/api/listings/${props.match.params.id}`)
      .then(res => {
        setSchoolName(res.data.schoolName);
        setAbout(res.data.about);
        setImage(res.data.image);
      })
      .catch(error => {
        console.error('Error fetching listing:', error);
      });
  }, [props.match.params.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/listings/${props.match.params.id}`, { schoolName, about, image });
      // Redirect to home page after successful update
      window.location = '/';
    } catch (error) {
      console.error('Error updating listing:', error);
    }
  };

  return (
    <div>
      <h1>Update Listing</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>School Name:</label>
          <input type="text" value={schoolName} onChange={e => setSchoolName(e.target.value)} required />
        </div>
        <div>
          <label>About:</label>
          <textarea value={about} onChange={e => setAbout(e.target.value)} required />
        </div>
        <div>
          <label>Image:</label>
          <input type="file" onChange={e => setImage(e.target.files[0])} required />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default UpdateListingForm;
