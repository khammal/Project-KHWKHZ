import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchListings, deleteListing } from '../api/api';
import '../HomePageStyles.css';


function Home() {
  const [listings, setListings] = useState([]);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    // Function to load listings
    const loadListings = async () => {
      const items = await fetchListings(); // Fetch listings
      setListings(items);
    };
    loadListings(); // Invoke the function to load listings
    
  }, []);

  // Handler for navigating to the update form
  const handleEdit = (id) => {
    navigate(`/create/${id}`);
  };

  // Handler for navigating to the create form
  const handleCreate = () => {
    navigate('/create');
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this listing?')) {
      try {
        await deleteListing(id);
        setListings(listings.filter(listing => listing.id !== id)); // Update UI
        alert('Listing deleted successfully');
      } catch (error) {
        console.error('Failed to delete the listing:', error);
        alert('Failed to delete the listing.');
      }
    }
  };

  return (
    <div className="listings-container">
      <div className='page-title'>Listings</div>
      <button className="create-button" onClick={handleCreate}>Create Listing</button>
        {listings.map(listing => (
          <div className="listing-card" key={listing.id}>
            <img
              src={listing.image_url}
              alt="School"
              className="listing-image"
            />
            <div className="listing-content">
              <h2 className="listing-title">{listing.name}</h2>
              <p className="listing-description">{listing.about}</p>
            </div>
            <div className="button-container">
              <button className="button edit-button" onClick={() => handleEdit(listing.id)}>Edit</button>
              <button className="button delete-button" onClick={() => handleDelete(listing.id)}>Delete</button>
            </div>
          </div>
        ))}
    </div>
  );
}

export default Home;
