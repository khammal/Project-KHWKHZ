import React from 'react';

function Listing({ id, schoolName, about, image }) {
  return (
    <div className="listing">
      <h2>{schoolName}</h2>
      <p>{about}</p>
      <img src={image} alt={schoolName} />
      <p>ID: {id}</p>
    </div>
  );
}

export default Listing;
