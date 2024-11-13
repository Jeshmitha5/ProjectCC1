import React from 'react';

const Cart = ({ cart, removeFromCart }) => {
  const handleRemove = (toyId) => {
    removeFromCart(toyId);
  };

  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <ul>
            {cart.map((toy) => (
              <li key={toy.id} className="cart-item">
                <img src={toy.image} alt={toy.name} />
                <div className="cart-item-info">
                  <h3>{toy.name}</h3>
                  <p>{toy.price} USD</p>
                </div>
                <button onClick={() => handleRemove(toy.id)}>Remove</button>
              </li>
            ))}
          </ul>
          <h3>Total: {totalPrice} USD</h3>
          <button className="checkout-button">Proceed to Checkout</button>
        </>
      )}
    </div>
  );
};

export default Cart;


