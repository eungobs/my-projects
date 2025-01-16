import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '', // Use email instead of name
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    // Validate email format
    if (!formData.email.includes('@')) {
      setError('Invalid email format');
      return;
    }

    // Validate password length
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    try {
      // Check if user exists on the server
      const response = await fetch(`http://localhost:3001/users?email=${formData.email}`);
      
      // Check if the response is OK (status code 200-299)
      if (!response.ok) {
        throw new Error(`Server error: ${response.status} ${response.statusText}`);
      }

      // Check if the response is JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Server did not return JSON');
      }

      const users = await response.json();
      console.log('Users from server:', users); // Debugging

      if (users.length === 0) {
        // If no user found on the server, check localStorage
        const localUsers = JSON.parse(localStorage.getItem('users')) || [];
        console.log('Users from localStorage:', localUsers); // Debugging
        const localUser = localUsers.find((user) => user.email === formData.email);

        if (!localUser) {
          setError('User not found. Please register.');
        } else {
          // Check if password matches
          if (localUser.password === formData.password) {
            // Save user data to localStorage for session management
            localStorage.setItem('loggedInUser', JSON.stringify(localUser));
            navigate('/todo-list'); // Redirect to ToDo list page
          } else {
            setError('Incorrect password');
          }
        }
      } else {
        const user = users[0];

        // Check if password matches
        if (user.password === formData.password) {
          // Save user data to localStorage for session management
          localStorage.setItem('loggedInUser', JSON.stringify(user));
          navigate('/todo-list'); // Redirect to ToDo list page
        } else {
          setError('Incorrect password');
        }
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Failed to login. Please try again.');
    }
  };

  return (
    <div className="login-screen">
      <div className="diary-text">Diary in your pocket</div>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <button onClick={() => navigate('/register')}>Register</button>
      </p>
    </div>
  );
}

export default Login;
