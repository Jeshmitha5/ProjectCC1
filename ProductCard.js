import React, { useState } from 'react';

const ProductCard = ({ toy }) => {
  const [hover, setHover] = useState(false);

  return (
    <div
      className="product-card"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <img src={toy.image} alt={toy.name} />
      {hover && (
        <div className="product-details">
          <h3>{toy.name}</h3>
          <p>${toy.price}</p>
          <button>Add to Cart</button>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
