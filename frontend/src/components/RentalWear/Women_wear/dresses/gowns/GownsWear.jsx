import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import './GownsWear.css'; // Optional CSS file

const formatCategory = (str) =>
  str ? str.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()) : '';

const GownsWear = () => {
  const [gownData, setGownData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/images/wearData/womenWear.json`);
        const filtered = res.data.filter(item => item.subcategory === "gown");
        setGownData(filtered);
      } catch (error) {
        console.error("Error fetching gown data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCardClick = (item) => {
    navigate('/productDisplay', { state: { product: item } });
  };

  const firstItem = gownData[0];

  return (
    <div className="gown-page">
      {/*  Breadcrumb */}
      {firstItem && (
        <div className="breadcrumb">
          <Link to="/" className="breadcrumb-link">Home</Link>
          {/* <span className="breadcrumb-separator">/</span> */}
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
        <div className="gown-grid">
          {gownData.map((item, index) => (
            <div
              key={index}
              className="gown-card"
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

export default GownsWear;
