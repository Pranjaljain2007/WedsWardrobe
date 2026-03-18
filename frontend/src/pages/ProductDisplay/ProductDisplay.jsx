import React, { useState, useEffect, useContext } from 'react';
import { useLocation, Link } from 'react-router-dom';
import './ProductDisplay.css';
import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/Navbar/Navbar';
import { CartContext } from '../../components/CartContext/CartContext';

const formatCategory = (str) =>
    str ? str.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()) : '';

const ProductDisplay = () => {
    const location = useLocation();
    const [product, setProduct] = useState(null);
    const [startDate, setStartDate] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [isAdded, setIsAdded] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alert, setAlert] = useState({ show: false, message: '', type: 'success' });
    const { cartItems, setCartItems } = useContext(CartContext);

    const today = new Date().toISOString().split('T')[0];


    useEffect(() => {
        if (location.state?.product) {
            setProduct(location.state.product);
            localStorage.setItem('selectedProduct', JSON.stringify(location.state.product));
        } else {
            const storedProduct = localStorage.getItem('selectedProduct');
            if (storedProduct) {
                setProduct(JSON.parse(storedProduct));
            }
        }
    }, [location.state]);


    const calculateReturnDate = (start) => {
        const startD = new Date(start);
        startD.setDate(startD.getDate() + 4);
        return startD.toISOString().split('T')[0];
    };

    const handleStartDateChange = (e) => {
        const selected = e.target.value;
        setStartDate(selected);
        setReturnDate(calculateReturnDate(selected));
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        const [year, month, day] = dateStr.split('-');
        return `${day}-${month}-${year}`;
    };

    const handleAddToCart = () => {
        if (!startDate) {
            setAlert({ show: true, message: 'Please select a start date.', type: 'error' });
            setTimeout(() => setAlert({ ...alert, show: false }), 2000);
            return;
        }

        if (new Date(startDate) < new Date(today)) {
            setAlert({ show: true, message: 'Start date cannot be in the past.', type: 'warning' });
            setTimeout(() => setAlert({ ...alert, show: false }), 2000);
            return;
        }


        const cartItem = {
            ...product,
            startDate,
            returnDate,
            rentalDuration: '4 Days',
        };

        const updatedCart = [...cartItems, cartItem];
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        setIsAdded(true);
        setAlert({ show: true, message: ' Added to cart!', type: 'success' });
        setTimeout(() => setAlert({ ...alert, show: false }), 2000);

        setTimeout(() => setShowAlert(false), 2000);

        // alert('Item added to cart!');
    };

    if (!product) {
        return <div className="not-found">Product not found!</div>;
    }

    return (
        <>

            <Navbar className="nav" />
            <div className="product-display">
                {/* Left: Product Image */}
                <div className="product-image">
                    <img
                        src={`${import.meta.env.VITE_BACKEND_URL}/images/${product.imageUrl}`}
                        alt={product.name}
                    />
                </div>

                {/* Right: Product Details */}
                <div className="main-content">
                    {/* Breadcrumbs */}
                    <div className="breadcrumb">
                        <Link to="/" className="breadcrumb-link">Home</Link>
                        {/* /{' '} */}
                        <Link
                            to={`/${product.gender}/${product.category}/${product.subcategory}s`}
                            className="breadcrumb-link"
                        >
                            {formatCategory(product.subcategory)}
                        </Link>
                    </div>

                    {/* Product Info */}
                    <div className="product-details">
                        <p className="brand-name">{product.ownerName}</p>
                        <h1>{product.name}</h1>
                        <p className="price">Rent: ₹{product.price}</p>
                        <p className="deposit">Refundable Deposit: ₹{product.price - 500}</p>

                        {/* Rental Info */}
                        <div className="selectors">
                            <label>Rental Duration: 4 Days</label>
                            <div className="readonly-size">
                                <label>Size:</label>
                                <span>{product.size}</span>
                            </div>
                        </div>

                        {/* Date Section */}
                        <div className="date-section">
                            <div className="start-date">
                                <label>Start Date:</label>
                                <input
                                    type="date"
                                    value={startDate}
                                    min={today}
                                    onChange={handleStartDateChange}
                                />
                            </div>
                            <div className="return-date-wrapper">
                                <label className="return-label">Return Date:</label>
                                <p className="return-date">{formatDate(returnDate)}</p>
                            </div>
                        </div>

                        {/* Add to Cart */}
                        <button className="add-to-cart" onClick={handleAddToCart} disabled={isAdded}>
                            {isAdded ? 'Added' : 'Add To CheckOut'}
                        </button>

                        {/* Additional Info */}
                        <div className="additional-info">
                            <p><strong>Description:</strong> {product.description}</p>
                            <p><strong>Stylist Notes:</strong> {product.stylistNotes}</p>
                            <p><strong>Material & Care:</strong> {product.materialCare}</p>
                        </div>
                    </div>
                </div>
            </div>

            {alert.show && (
                <div className={`slide-alert ${alert.type}`}>
                    {alert.message}
                </div>
            )}


            <Footer />
        </>
    );
};

export default ProductDisplay;
