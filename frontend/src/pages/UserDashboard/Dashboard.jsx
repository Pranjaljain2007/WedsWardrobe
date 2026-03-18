import React, { useEffect, useState } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import axios from 'axios';
import { NavLink, Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import './Dashboard.css';
import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/Navbar/Navbar';



const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const location = useLocation();

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(getAuth());
      // localStorage.removeItem('cart'); 
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const auth = getAuth();
      const unsubscribe = auth.onAuthStateChanged(async (user) => {
        if (user) {
          try {
            const token = await user.getIdToken();
            const res = await axios.get('${import.meta.env.VITE_BACKEND_URL}/api/userinfo', {
              headers: { Authorization: `Bearer ${token}` },
            });
            setUserData(res.data);
          } catch (err) {
            console.error('Error fetching user data:', err);
          }
        }
      });

      return () => unsubscribe();
    };

    fetchUserData();
  }, []);

  const isDashboard = location.pathname === '/myaccount';

  return (

    <>

      <Navbar />

      <div className="dashboard-container">
        <aside className="dashboard-sidebar">
          <h3>MY ACCOUNT</h3>
          <div className="nav-links">
            <NavLink to="/myaccount" className={({ isActive }) => isActive ? 'active-link' : ''}>My Dashboard</NavLink>
            <NavLink to="/myaccount/profile" className={({ isActive }) => isActive ? 'active-link' : ''}>My Profile</NavLink>
            <NavLink to="/myaccount/address" className={({ isActive }) => isActive ? 'active-link' : ''}>My Address</NavLink>
            <NavLink to="/myaccount/orders" className={({ isActive }) => isActive ? 'active-link' : ''}>My Orders</NavLink>
            <button onClick={handleLogout} className="logout-button">Sign Out</button>


          </div>
        </aside>

        <section className="dashboard-content">

          {isDashboard && userData ? (
            <>
              <h2>MY DASHBOARD</h2>

              <div className="dashboard-sections">
                <div className="dashboard-box">

                  <Link to="/myaccount/profile" className="edit-link"> CONTACT INFORMATION</Link>
                  <Link to="/myaccount/address" className="edit-link">SHIPPING ADDRESS </Link>
                  <Link ></Link>
                </div>

                <div className="dashboard-info">
                  <div className="avatar-circle">{userData.firstName?.charAt(0)}</div>
                  <div className="user-info">
                    <p className='user-name'> {userData.firstName} {userData.lastName}</p>
                    <p className='user-email'>{userData.email}</p>
                  </div>
                </div>

              </div>

            </>
          ) : (
            <Outlet />
          )}
        </section>
      </div>

      <Footer />
    </>
  );
};

export default Dashboard;
