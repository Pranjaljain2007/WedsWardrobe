import React, { useState } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import Navbar from '../../components/Navbar/Navbar'
import Footer from "../../components/Footer/Footer";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (auth.currentUser) {
        await signOut(auth); // sign out current user first
      }

      //await signInWithEmailAndPassword(auth, email, password);

      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const token = await user.getIdToken(); // ✅ fetch token
      localStorage.setItem("token", token);
      navigate("/");
      // const token = await auth.currentUser.getIdToken();

      // localStorage.setItem("token", token);
      // navigate("/UserDashboard/myaccount");


    } catch (err) {
      console.error("Login error", err);
      if (err.code === "auth/user-not-found") {
        setError("No account found with this email.");
      } else if (err.code === "auth/wrong-password") {
        setError("Incorrect password.");
      } else if (err.code === "auth/invalid-email") {
        setError("Invalid email format.");
      } else if (err.code === "auth/too-many-requests") {
        setError("Too many attempts. Please try again later.");
      } else {
        setError(`Login failed. (${err.message})`);
      }
    }
  };


  return (
    <>
      <Navbar />

      <div className="login-container">
        <h2 className="loginheading">Say “I Do” to Login</h2>

        <form className="login-form" onSubmit={handleLogin}>

          <div className="login-details">

            <div className="input-group">
              <label>Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>

          </div>

          <button type="submit">Sign In</button>
        </form>

        {error && <p className="error">{error}</p>}

        <div className="login-links">
          <p><a href="/signup">Sign Up</a></p>
          <p><a href="/">Return to Store</a></p>
          <p><a href="/reset-password">Recover Password</a></p>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Login;
