// Backend API URL
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

// Fetch listings from the backend API
export const fetchListings = async () => {
  try {
      const response = await fetch(`${BACKEND_URL}/api/listings`, {
          // GET request to fetch listings
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
          }
      });
      if (!response.ok) {
          throw new Error('Failed to fetch listings');
      }
      return response.json();
  } catch (error) {
      console.error('Error fetching listings:', error);
      return null;
  }
};

export const addToListings = async (formData) => {
    try {
        // Convert the formData object to a JSON string
        const jsonFormData = JSON.stringify(formData);

        // Use fetch API to submit the form data
        const response = await fetch('${BACKEND_URL}/api/listings', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: jsonFormData,
        });

        if (!response.ok) {
        throw new Error('Failed to add listing');
        }

        const responseData = await response.json();
        console.log('Listing created:', responseData);

  } catch (error) {
        console.error('Error fetching listings:', error);
        return null;
  }
}

export const updateListing = async (id, formData) => {
    try {
      // Convert the formData object to a JSON string
      const jsonFormData = JSON.stringify(formData);
  
      // Use fetch API to update the listing
      const response = await fetch(`${BACKEND_URL}/api/listings/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: jsonFormData,
      });
  
      if (!response.ok) {
        throw new Error('Failed to update listing');
      }
  
      const responseData = await response.json();
      console.log('Listing updated:', responseData);
      return responseData; // Return the updated listing data
    } catch (error) {
      console.error('Error updating listing:', error);
      throw error; // Rethrow to handle it in the calling component
    }
  };

// Function to fetch a single listing by its ID
export const fetchListingById = async (id) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/listings/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error(`Failed to fetch listing with ID ${id}`);
      }
  
      return response.json(); // Returns the listing data
    } catch (error) {
      console.error(`Error fetching listing by ID ${id}:`, error);
      throw error; // Rethrow to handle it in the calling component
    }
  };

export const deleteListing = async (id) => {
    try {
        const response = await fetch(`${BACKEND_URL}/api/listings/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to delete listing with ID ${id}`);
        }

        return response.json(); // Returns the response from the server
    } catch (error) {
        console.error(`Error deleting listing by ID ${id}:`, error);
        throw error; // Rethrow to handle it in the calling component
    }
};
