import React from 'react';
import { Link } from 'react-router-dom';
 // Link to the CSS file for this component

const Toys = ({ toys }) => {
  return (
    <div className="toys-container">
      <h2>Our Toys Collection</h2>
      <div className="toys-grid">
        {toys.map((toy) => (
          <div key={toy.id} className="toy-card">
            <Link to={`/toy/${toy.id}`}>
              <img src={toy.image} alt={toy.name} className="toy-image" />
              <h3 className="toy-name">{toy.name}</h3>
              <p className="toy-price">${toy.price}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Toys;


