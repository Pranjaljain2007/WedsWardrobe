// src/components/Sidebar.js
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        await signOut(auth); // from firebase
        localStorage.removeItem("token");
        navigate('/');
    };

    return (
        <div className="sidebar">
            <h3>MY ACCOUNT</h3>
            <NavLink to="/myaccount/dashboard">MY DASHBOARD</NavLink>
            <NavLink to="/myaccount/profile">MY PROFILE</NavLink>
            <NavLink to="/myaccount/address">MY ADDRESS</NavLink>
            <NavLink to="/myaccount/orders">MY ORDERS</NavLink>
            <button className="signout" onClick={handleLogout}>SIGN OUT</button>
        </div>
    );
};

export default Sidebar;
