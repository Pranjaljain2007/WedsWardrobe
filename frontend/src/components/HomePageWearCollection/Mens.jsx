import React from 'react';
import { Link } from 'react-router-dom';
import './Mens.css';

import bandhgalaImg from '../../assets/HomePageWearCollectionImg/men/bandhgala.jpg';
import kurtaSherwaniImg from '../../assets/HomePageWearCollectionImg/men/kurta_sherwani.jpg';
import suitImg from '../../assets/HomePageWearCollectionImg/men/suit.jpg';
import indoWesternImg from '../../assets/HomePageWearCollectionImg/men/indo_western.jpg';


const categories = [
  { name: "Bandhgalas", image: bandhgalaImg, path: "/men/clothing/bandhgalas" },
  { name: "Kurta Pajamas", image: kurtaSherwaniImg, path: "/men/clothing/KurtaPajamas" },
  { name: "Suits", image: suitImg, path: "/men/clothing/suits" },
  { name: "Indo-Western", image: indoWesternImg, path: "/men/clothing/indo-western" },
];


const MenswearCollection = () => {
  return (
    <section className="menswear-section">

      <div className="heading-area">
        <h2>Menswear Collection</h2>
        <p className="quote">“Because he deserves to look royal too.”</p>
      </div>

      <div className="menswear-cards">
        {categories.map((cat, index) => (
          <Link to={cat.path} key={index} className="menswear-card">
            <div className="image-container">
              <img src={cat.image} alt={cat.name} />
              <div className="overlay-text">{cat.name}</div>
            </div>
          </Link>
        ))}

      </div>
    </section>
  );
};

export default MenswearCollection;
