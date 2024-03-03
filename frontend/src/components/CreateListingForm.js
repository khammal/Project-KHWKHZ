import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AWS from "aws-sdk";
import { addToListings, updateListing, fetchListingById } from '../api/api';
import '../CreateListingStyles.css';


function CreateListingForm() {
  const [schoolName, setSchoolName] = useState('');
  const [about, setAbout] = useState('');
  const [image, setImage] = useState(null);
  const [existingImageUrl, setExistingImageUrl] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      // Fetch the existing listing details if 'id' is present
      fetchListingById(id).then(data => {
        setSchoolName(data.name);
        setAbout(data.about);
        setExistingImageUrl(data.image_url);
      });
    }
  }, [id]);


  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const uploadImageToS3 = async (file) => {
    if (!file) return existingImageUrl; // Use the existing image URL if no new image is selected
     // Construct the S3 file URL
    const BUCKET_URL = process.env.S3_BUCKET_URL
    
    const fileName = encodeURIComponent(file.name); // Ensure the file name is URL-safe
    const uploadURL = `${BUCKET_URL}/${fileName}`;

    const S3_BUCKET = process.env.S3_BUCKET_NAME;
    
    // S3 Credentials
    AWS.config.update({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });
    const s3 = new AWS.S3({
      params: { Bucket: S3_BUCKET },
      region: process.env.AWS_REGION,
    });

    // Files Parameters

    const params = {
      Bucket: S3_BUCKET,
      Key: fileName,
      Body: file,
    };

    // Uploading file to s3

    var upload = s3
      .putObject(params)
      .on("httpUploadProgress", (evt) => {
        // File uploading progress
        console.log(
          "Uploading " + parseInt((evt.loaded * 100) / evt.total) + "%"
        );
      })
      .promise();

    await upload.then((err, data) => {
      console.log(err);
      
    });
    return uploadURL;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Upload the image to S3 and get the URL
      const imageUrl = await uploadImageToS3(image);

      // Create an object to hold the form data
      const formData = {
        schoolName,
        about,
        imageUrl,
      };

      if (id) {
        await updateListing(id, formData);
      } else {
        await addToListings(formData);
      }
      
      // Redirect to home page after successful submission
      navigate('/');

    } catch (error) {
      console.error('Error creating listing:', error);
      window.alert("Error creating listing, please try again");
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

return (
    <div className="form-container">
      <h1 className="form-title">{id ? 'Update' : 'Create'} Listing</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>School Name:</label>
          <input type="text" value={schoolName} onChange={(e) => setSchoolName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>About:</label>
          <textarea value={about} onChange={(e) => setAbout(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Image:</label>
          {existingImageUrl && !image && (
            <div className="image-preview-container">
              <img src={existingImageUrl} alt="Current" className="image-preview" />
              <button type="button" className="change-image-button" onClick={() => setExistingImageUrl('')}>Change Image</button>
            </div>
          )}
          {(!existingImageUrl || image) && (
            <input type="file" onChange={handleImageChange} required={!existingImageUrl} />
          )}
        </div>
        <div className="form-buttons">
          <button type="button" className="cancel-button" onClick={handleCancel}>Cancel</button>
          <button type="submit" className="submit-button">{id ? 'Update' : 'Submit'}</button>
        </div>
      </form>
    </div>
  );
}

export default CreateListingForm;

