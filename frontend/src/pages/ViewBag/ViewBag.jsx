import React, { useContext } from 'react';
import './ViewBag.css';
import { CartContext } from '../../components/CartContext/CartContext'
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

const ViewBag = () => {
  const { cartItems, setCartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const handleRemove = (indexToRemove) => {
    const updatedCart = cartItems.filter((_, index) => index !== indexToRemove);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleContinueShopping = () => navigate('/');
  const handleCheckout = () => {
    navigate('/ordersummary');
  };


  const total = cartItems.reduce((acc, item) => acc + Number(item.price), 0);
  const refundableDeposit = cartItems.reduce((acc, item) => acc + (Number(item.price) - 500), 0);


  return (
    <>
      <Navbar />
      <div className="viewbag-container">
        <h1>Your Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <p className="empty-cart">Your bag is empty. Go shop something beautiful!</p>
        ) : (
          <>
            <div className='cart-container1'>
              {cartItems.map((item, index) => (
                <div className="viewbag-item" key={index}>
                  <div className="vb-left">
                    <img src={`${import.meta.env.VITE_BACKEND_URL}/images/${item.imageUrl}`} alt={item.name} />


                    <div className="vb-details">
                      <h3>{item.name}</h3>
                      <p><strong>Size:</strong> {item.size}</p>
                      <p><strong>Start Date:</strong> {new Date(item.startDate).toLocaleDateString()}</p>
                      <p><strong>Return Date:</strong> {new Date(item.returnDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="vb-right">
                    <p><strong>Rs. {item.price}.00</strong></p>
                    <button className="vb-remove" onClick={() => handleRemove(index)}>✖</button>
                  </div>
                </div>
              ))}

              <div className="viewbag-item deposit1">
                <div className="vb-left1">
                  <p><strong>Refundable Deposit</strong></p>
                  <p className="vb-subtext">This amount will be refunded by when the rental products are returned</p>
                </div>
                <div className="vb-right1">
                  <p>Rs. {refundableDeposit}.00</p>
                </div>
              </div>

              <div className="viewbag-total">
                <div className="vb-subtotal">
                  <p>Subtotal</p>
                  <h3>Rs. {total}.00</h3>
                  <p className="vb-note">Excluding Tax & Shipping</p>
                </div>

                <div className="vb-actions">
                  <button onClick={handleContinueShopping}>CONTINUE SHOPPING</button>
                  <button onClick={handleCheckout}>CHECKOUT</button>
                </div>

              </div>
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ViewBag;