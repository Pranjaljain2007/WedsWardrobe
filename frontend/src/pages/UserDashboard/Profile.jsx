import React, { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import axios from 'axios';
import './Profile.css';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    heightFeet: '',
    heightInches: '',
    weight: '',
    bustSize: '',
    bodyType: '',
    primaryDressSize: '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        const token = await user.getIdToken();
        const res = await axios.get('${import.meta.env.VITE_BACKEND_URL}/api/userinfo', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUserData(res.data);
        setForm({
          heightFeet: res.data.heightFeet || '',
          heightInches: res.data.heightInches || '',
          weight: res.data.weight || '',
          bustSize: res.data.bustSize || '',
          bodyType: res.data.bodyType || '',
          primaryDressSize: res.data.primaryDressSize || '',
        });
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      const token = await user.getIdToken();
      try {
        await axios.put(
          '${import.meta.env.VITE_BACKEND_URL}/api/updateUserProfile',
          form,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        alert("Changes saved successfully!");
      } catch (error) {
        alert("Failed to save changes");
        console.error(error);
      } finally {
        setSaving(false);
      }
    }
  };

  if (!userData) return <p>Loading profile...</p>;

  return (
    <div className="profile-container">
      <h2>MY PROFILE</h2>
      <form className="profile-form" onSubmit={handleSubmit}>
        <h3>ACCOUNT DETAILS</h3>

        <div className="user-info1">
          <div className="form-row">
            <div className="form-group">
              <label>First Name</label>
              <input type="text" value={userData.firstName} />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input type="text" value={userData.lastName} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Email</label>
              <input type="email" value={userData.email} readOnly />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input type="text" value={userData.phone || ''} readOnly maxLength={10} />
            </div>
          </div>
        </div>

        <h3>MEASUREMENTS</h3>
        <div className="form-row">
          <div className="form-group">
            <label>Feet</label>
            <select name="heightFeet" value={form.heightFeet} onChange={handleChange}>
              <option value="">--</option>
              {[...Array(8).keys()].map(i => (
                <option key={i} value={i + 3}>{i + 3}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Inches</label>
            <select name="heightInches" value={form.heightInches} onChange={handleChange}>
              <option value="">--</option>
              {[...Array(12).keys()].map(i => (
                <option key={i} value={i}>{i}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Weight</label>
            <input type="number" name="weight" value={form.weight} onChange={handleChange} />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Bust Size</label>
            <select name="bustSize" value={form.bustSize} onChange={handleChange}>
              <option value="">Select</option>
              <option value="32">32</option>
              <option value="34">34</option>
              <option value="36">36</option>
              <option value="38">38</option>
              <option value="40">40</option>
            </select>
          </div>
          <div className="form-group">
            <label>Body Type</label>
            <select name="bodyType" value={form.bodyType} onChange={handleChange}>
              <option value="">Select</option>
              <option value="Slim">Slim</option>
              <option value="Athletic">Athletic</option>
              <option value="Curvy">Curvy</option>
              <option value="Plus">Plus</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group full-width">
            <label>Primary Dress Size</label>
            <select name="primaryDressSize" value={form.primaryDressSize} onChange={handleChange}>
              <option value="">Select</option>
              <option value="XS">XS</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
            </select>
          </div>
        </div>

        <button type="submit" className="save-btn" disabled={saving}>
          {saving ? "Saving..." : "SAVE CHANGES"}
        </button>
      </form>
    </div>
  );
};

export default Profile;
