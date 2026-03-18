import React, { useState } from 'react';
import './Address.css';

const Address = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    country: 'India',
    pinCode: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/address`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // if using JWT/Firebase
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) alert("Address saved successfully!");
      else alert(data.message || "Failed to save address");
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="address-form-container">
      <h2>ADD ADDRESS</h2>
      <p className="section-title">SHIPPING ADDRESS</p>
      <form onSubmit={handleSubmit} className="address-form">
        <div className="form-row">
          <input name="firstName" placeholder="First Name*" onChange={handleChange} required />
          <input name="lastName" placeholder="Last Name*" onChange={handleChange} />
        </div>
        <div className="form-row">
          <input name="email" placeholder="Email ID*" onChange={handleChange} required />
          <input name="mobile" placeholder="Mobile Number*" onChange={handleChange} required />
        </div>
        <div className="form-row">
          <input name="addressLine1" placeholder="Address Line1*" onChange={handleChange} required />
          <input name="addressLine2" placeholder="Address Line2" onChange={handleChange} />
        </div>

        <div className="form-row">
          <input name="city" placeholder="City*" onChange={handleChange} required />
          <select name="state" value={form.state} onChange={handleChange} required>
            <option value="">Select State*</option>
            <option value="Delhi">Delhi</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Karnataka">Karnataka</option>
          </select>

          <select name="country" value={form.country} onChange={handleChange}>
            <option value="India">India</option>
          </select>

        </div>
        <div className="form-row">
          <input name="pinCode" placeholder="Pin Code*" onChange={handleChange} required />
          <select name="country" onChange={handleChange}>
            <option value="India">India</option>
            F          </select>
        </div>
        <button type="submit" className="submit-btn1">Save Address</button>
      </form>
    </div>
  );
};

export default Address;
