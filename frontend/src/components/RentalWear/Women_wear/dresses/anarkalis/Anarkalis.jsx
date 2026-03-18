import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import './Anarkalis.css';

const formatCategory = (str) =>
  str ? str.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()) : '';

const Anarkalis = () => {
  const [anarkaliData, setAnarkaliData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/images/wearData/womenWear.json`);
        const filtered = res.data.filter(item => item.subcategory === "anarkali");
        setAnarkaliData(filtered);
      } catch (error) {
        console.error("Error fetching Anarkali data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCardClick = (item) => {
    navigate('/productDisplay', { state: { product: item } });
  };

  const firstItem = anarkaliData[0];

  return (
    <div className="anarkali-page">
      {/*  Breadcrumb */}
      {firstItem && (
        <div className="breadcrumb">
          <Link to="/" className="breadcrumb-link">Home</Link>
          <span className="breadcrumb-separator">/</span>
          <Link
            to={`/${firstItem.gender}/${firstItem.category}/${firstItem.subcategory}s`}
            className="breadcrumb-link"
          >
            {formatCategory(firstItem.subcategory)}
          </Link>
        </div>
      )}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="anarkali-grid">
          {anarkaliData.map((item, index) => (
            <div
              key={index}
              className="anarkali-card"
              onClick={() => handleCardClick(item)}
            >
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/images/${item.imageUrl}`}
                alt={item.name}
                className="product-image"
              />
              <div className="text-below">
                <h3 className="product-name">{item.name}</h3>
                <p className="owner-name">{item.ownerName}</p>
                <div className="price-hover">From Rs.{item.price}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Anarkalis;

