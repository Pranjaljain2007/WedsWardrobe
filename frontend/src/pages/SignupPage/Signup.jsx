import React, { useState } from 'react';
import './Signup.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/firebaseConfig';
import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/Navbar/Navbar';

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const [error, setError] = useState('');
  const [passwordErrors, setPasswordErrors] = useState([]);

  const navigate = useNavigate();


  const checkPasswordRules = (password) => {
    const errors = [];

    if (password.length < 8) {
      errors.push('Password must be at least 8 characters long.');
    }
    if (!/[A-Z]/.test(password)) {
      errors.push('Password must include at least one uppercase letter.');
    }
    if (!/[a-z]/.test(password)) {
      errors.push('Password must include at least one lowercase letter.');
    }
    if (!/\d/.test(password)) {
      errors.push('Password must include at least one number.');
    }
    if (!/[\W_]/.test(password)) {
      errors.push('Password must include at least one special character.');
    }

    return errors;
  };


  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });

    if (name === 'password') {
      const errors = checkPasswordRules(value);
      setPasswordErrors(errors);
    }
  };




  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const { email, password, firstName, lastName } = formData;

    const errors = checkPasswordRules(password);
    setPasswordErrors(errors);
    if (errors.length > 0) {
      // Prevent submission and show errors — no generic error message needed here
      return;
    }


    try {
      // 1. Firebase Signup
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // console.log("Firebase signup successful");

      // 2. Send user data to backend (NO PASSWORD)
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/signup`, {
        uid: user.uid,
        email,
        firstName,
        lastName: lastName || ''
      });

      // console.log(" Backend response:", response.data);


      alert('Signup successful!');
      navigate('/');
    } catch (err) {

      // console.error("Error:", err);

      if (err.code === 'auth/email-already-in-use') {
        setError('Email already in use');
      } else if (err.code === 'auth/invalid-email') {
        setError('Invalid email address');
      } else if (err.code === 'auth/weak-password') {
        setError('Password should be at least 8 characters');
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('Signup failed. Please try again.');
      }
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <>
      <Navbar />


      <div className="signup-container">
        <h2>Register Your Account</h2>

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit}>

          <div className="form-row">

            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input name="firstName" id="firstName" onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input name="lastName" id="lastName" onChange={handleChange} />
            </div>

          </div>

          <div className="form-row">

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input name="email" type="email" id="email" onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input name="password" type="password" id="password" onChange={handleChange} required />
              {passwordErrors.length > 0 && (
                <div>
                  {passwordErrors.map((err, idx) => (
                    <p key={idx}>{err}</p>
                  ))}
                </div>
              )}


            </div>
          </div>

          <button type="submit">Submit</button>

          <p className="cancel" onClick={handleCancel}>Cancel</p>
        </form>
      </div>

      <Footer />
    </>
  );
};

export default Signup;
