import React from 'react';
import './RentalProcess.css';
import rentalBannerImg from '../../assets/RentalBanner.jpg';

const RentalProcess = () => {
    return (
        <div className="rental-process-wrapper">
            <div className="rental-process-section">
                {/* Left side: Steps */}
                <div className="rental-process-left">
                    <div className="step-box">
                        <div className="step-number">1</div>
                        <div className="step-text">Bookings via website only.</div>
                    </div>
                    <div className="step-box">
                        <div className="step-number">2</div>
                        <div className="step-text">Doorstep delivery and pickup.</div>
                    </div>
                    <div className="step-box">
                        <div className="step-number">3</div>
                        <div className="step-text">4 day rentals at 1/10th of the M.R.P.</div>
                    </div>
                    <div className="step-box">
                        <div className="step-number">4</div>
                        <div className="step-text">Look picture perfect & returm.</div>
                    </div>
                </div>

                {/* Right side: Image + Rental Process text */}
                <div className="rental-process-right">
                    <img src={rentalBannerImg} alt="Rental Couple" />
                    <div className="rental-process-text">
                        <h2>RENTAL</h2>
                        <p>Process</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RentalProcess;
