import React from "react";
import "./Banner.css";
import bannerImage from "../../assets/Banner.jpeg";

const Banner = () => {

    return (

        <div className="wrapper">

            <div className="slogan-banner">
                <div className="slogan-left">
                    <h1 className="slogan-line">Rent it. Style it.</h1>
                    <h1 className="slogan-line">Rent it. Earn it.</h1>

                    <div className="contact-section">
                        <h2>Contact Us</h2>
                        <p>Email: <a href="mailto:care@rentmyweddingwear.com">care@rentmyweddingwear.com</a></p>
                        <p>Phone: +91-987-654-3210</p>
                    </div>
                </div>

                <div className="slogan-right">
                    <img src={bannerImage} alt="Fashion Banner" />
                </div>
            </div>
        </div>
    );
};

export default Banner;
