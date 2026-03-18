import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Footer.css'


const Footer = () => {
  const navigate = useNavigate();

  const handleRedirect = (path) => {
    navigate(path);
  };

  return (
    <footer className="footer">
      {/* About Us Section */}


      <div className="about-section">
        <h2>ABOUT WedsWardrobe</h2>
        <p>
         WedsWardrobe IS YOUR ONE-STOP DESTINATION FOR PREMIUM WEDDING AND OCCASION WEAR ON RENT. WE BELIEVE THAT EVERYONE DESERVES TO SHINE ON THEIR SPECIAL DAY WITHOUT THE BURDEN OF HIGH COSTS OR WARDROBE CLUTTER.
        </p>
        <p>
          OUR CAREFULLY CURATED COLLECTION FEATURES A WIDE RANGE OF ELEGANT, TRENDY, AND HIGH-QUALITY OUTFITS FOR BRIDES, GROOMS, AND GUESTS ALIKE. WHETHER YOU'RE ATTENDING A WEDDING, ENGAGEMENT, OR FESTIVE CELEBRATION — WE MAKE DESIGNER FASHION ACCESSIBLE, EFFORTLESS, AND AFFORDABLE.
        </p>
        <p>
          BEYOND FASHION, WE CARE DEEPLY ABOUT THE ENVIRONMENT. BY CHOOSING TO RENT INSTEAD OF BUY, YOU CONTRIBUTE TO A MORE SUSTAINABLE FUTURE BY REDUCING TEXTILE WASTE AND MINIMIZING THE IMPACT OF FAST FASHION.
        </p>
        <p>
          AT WedsWardrobe, WE ARE MORE THAN JUST A RENTAL PLATFORM — WE ARE YOUR STYLE PARTNER. LET US HELP YOU LOOK YOUR BEST, FEEL CONFIDENT, AND CREATE MEMORIES IN OUTFITS THAT SPEAK ELEGANCE AND RESPONSIBILITY.
        </p>
      </div>



      <div className="footer-columns">

        {/* Our Company */}
        <div className="footer-column">
          <h3>OUR COMPANY</h3>
          <p onClick={() => handleRedirect('/profile')}>OUR PROFILE</p>
          <p onClick={() => handleRedirect('/terms')}>TERMS AND CONDITIONS</p>
          <p onClick={() => handleRedirect('/contact')}>CONTACT US</p>
        </div>

        {/* Customer Care */}
        <div className="footer-column">
          <h3>CUSTOMER CARE</h3>
          <p onClick={() => handleRedirect('/faqs')}>FAQs</p>
          <p onClick={() => handleRedirect('/privacy-policy')}>PRIVACY POLICY</p>
        </div>

        {/* Contact Us */}
        <div className="footer-column">
          <h3>CONTACT US</h3>
          <a href="mailto:care@rentmyweddingwear.com">care@WedsWardrobe.com</a>
          <p>+91-987-654-3210</p>
        </div>

        {/* Careers */}
        <div className="footer-column">
          <h3>COLLABORATE WITH US</h3>
          <p>DROP YOUR ENQUIRIES AT</p>
          <a href="mailto:careers@rentmyweddingwear.com">careers@WedsWardrobe.com</a>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© 2025WedsWardrobe. All Rights Reserved. WE LOVE TO DRESS YOU UP!</p>
      </div>

    </footer>
  );
};

export default Footer;


