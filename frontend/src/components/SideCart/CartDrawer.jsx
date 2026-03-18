import React, { useContext } from 'react';
import './CartDrawer.css';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../CartContext/CartContext';

const CartDrawer = ({ onClose }) => {
  const navigate = useNavigate();
  const { cartItems, setCartItems } = useContext(CartContext);

  const handleContinueShopping = () => {
    onClose();
    navigate('/');
  };

  const handleProductClick = (item) => {
    localStorage.setItem('selectedProduct', JSON.stringify(item));
    onClose();
    navigate('/productDisplay'); // Manual route
  };

  const handleRemoveItem = (indexToRemove) => {
    const updatedCart = cartItems.filter((_, index) => index !== indexToRemove);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };


  return (
    <div className="cart-overlay">
      <div className="cart-drawer">

        {/* <div className="cart-drawer"> */}
        <div className="cart-header">
          <h2>
            {cartItems.length > 0
              ? `${cartItems.length} ITEM${cartItems.length > 1 ? 'S' : ''} IN YOUR BAG`
              : 'Your Shopping Cart'}
          </h2>
          <button onClick={onClose} className="close-btn1">✖</button>
        </div>

        {cartItems.length === 0 ? (
          <>
            <p className='no-items'>No items?! Even your bag’s starting to feel lonely.</p>
            <p className="sub-desc">Let’s give it some company!</p>
            <button className="continue-btn" onClick={handleContinueShopping}>
              Continue Shopping
            </button>
          </>
        ) : (
          <>

            <div className="cart-scroll-area">
              <div className="cart-items-container">

                {cartItems.map((item, index) => (
                  <div
                    className="cart-item"
                    key={index}

                    onClick={() => handleProductClick(item)}
                  >
                    <img
                      src={`${import.meta.env.VITE_BACKEND_URL}/images/${item.imageUrl}`}
                      alt={item.name}
                      className="cart-img"
                    />
                    <div className="cart-info">
                      <p className="cart-title">{item.name}</p>
                      <p className="cart-owner">{item.ownerName}</p>
                      <p className="cart-meta">SIZE: {item.size}</p>
                      <p className="cart-price">Rs. {item.price}</p>
                    </div>

                    <button
                      className="remove-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveItem(index);
                      }}
                    >
                      ✖
                    </button>
                  </div>
                ))}
              </div>

              <button className="view-btn" onClick={() => {
                onClose(); // Close drawer
                navigate('/viewbag'); // Navigate to ViewBag
              }}>VIEW BAG</button>

            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
