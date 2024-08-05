import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './register.css';

function Register() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: '',
    surname: '',
    gender: '',
    dob: '',
    country: '',
    occupation: '',
    phoneNumber: '',
    email: '',
    interests: '',
    profileImage: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData((prevData) => ({
          ...prevData,
          profileImage: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!userData.email.includes('@')) {
      setError('Email must contain @');
      return;
    }

    if (!/^\d{10}$/.test(userData.phoneNumber)) {
      setError('Phone number must be 10 digits');
      return;
    }

    if (userData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);
    try {
      // Check if email already exists
      const response = await fetch(`http://localhost:3000/users?email=${encodeURIComponent(userData.email)}`);
      const existingUsers = await response.json();

      if (existingUsers.length > 0) {
        setError('You already have an account.');
      } else {
        // Register new user
        const registerResponse = await fetch('http://localhost:3000/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData),
        });
        const result = await registerResponse.json();

        if (result.error) {
          setError(result.error);
        } else {
          navigate('/login');
        }
      }
    } catch (error) {
      console.error('Error adding user:', error);
      // Enhanced error handling
      if (error.response) {
        // Server responded with a status other than 200 range
        setError(`Error: ${error.response.data.error || 'Server error'}`);
      } else if (error.request) {
        // Request was made but no response received
        setError('No response from server. Please try again later.');
      } else {
        // Something else happened
        setError('An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      {loading && <div className="loader">Loading...</div>}
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={userData.name} onChange={handleChange} placeholder="Name" required />
        <input type="text" name="surname" value={userData.surname} onChange={handleChange} placeholder="Surname" required />
        <input type="text" name="gender" value={userData.gender} onChange={handleChange} placeholder="Gender" required />
        <input type="date" name="dob" value={userData.dob} onChange={handleChange} placeholder="Date of Birth" required />
        <input type="text" name="country" value={userData.country} onChange={handleChange} placeholder="Country" required />
        <input type="text" name="occupation" value={userData.occupation} onChange={handleChange} placeholder="Occupation" required />
        <input type="tel" name="phoneNumber" value={userData.phoneNumber} onChange={handleChange} placeholder="Phone Number" required />
        <input type="email" name="email" value={userData.email} onChange={handleChange} placeholder="Email" required />
        <input type="text" name="interests" value={userData.interests} onChange={handleChange} placeholder="Interests" required />
        <input type="password" name="password" value={userData.password} onChange={handleChange} placeholder="Password" required />
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
