import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ToyDetails = ({ toys, addToCart }) => {
  const { toyId } = useParams();
  const toy = toys.find((toy) => toy.id === parseInt(toyId));
  const navigate = useNavigate();

  const handleAddToCart = () => {
    addToCart(toy);
    navigate('/cart');
  };

  return (
    <div className="toy-details-container">
      <img src={toy.image} alt={toy.name} className="toy-detail-image" />
      <div className="toy-detail-info">
        <h2>{toy.name}</h2>
        <p>{toy.description}</p>
        <p>Price: {toy.price} USD</p>
        <button onClick={handleAddToCart}>Add to Cart</button>
        <button onClick={() => navigate('/checkout')}>Checkout</button>
      </div>
    </div>
  );
};

export default ToyDetails;
