import React from 'react';
import './Features.css';

import { FiTruck, FiRefreshCw } from 'react-icons/fi';
import { MdVerifiedUser } from 'react-icons/md';
import { MdOutlineLocalShipping, MdHealthAndSafety } from 'react-icons/md';
import { BsCashStack } from 'react-icons/bs';
import { FaHome } from 'react-icons/fa';

const features = [
    { icon: <MdOutlineLocalShipping className="feature-icon" />, title: 'Pan India Delivery' },
    { icon: <BsCashStack className="feature-icon" />, title: 'COD (Partial Advance)' },
    //   { icon: <FaHome className="feature-icon" />, title: 'Try at Home', subtext: 'Check the fit at delivery. Return if it doesn’t suit.' },
    { icon: <FiRefreshCw className="feature-icon" />, title: 'Easy Returns' },
    { icon: <FiTruck className="feature-icon" />, title: 'We ship both ways' },
    { icon: <MdVerifiedUser className="feature-icon" />, title: 'Quality Check & Hygiene' },
];

const Features = () => {
    return (
        <div className="features-container">
            {features.map((feature, index) => (
                <div key={index} className="feature-box">
                    <div className="feature-icon">{feature.icon}</div>
                    <div className="feature-title">{feature.title}</div>
                    {feature.subtext && <div className="feature-subtext">{feature.subtext}</div>}
                </div>
            ))}
        </div>
    );
};

export default Features;
