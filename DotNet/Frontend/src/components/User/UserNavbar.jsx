

import React from 'react';
import axios from 'axios';
import '../../../Styles/usernavbar.css';

const UserNavbar = () => {
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      // Make the logout request to the backend API
      const response = await axios.post(
        'http://localhost:5163/api/UserAuth/Logout', // Ensure your backend URL is correct
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request headers
          },
        }
      );

      if (response.status === 200) {
        // Logout successful
        alert('Logged out successfully!');
        localStorage.removeItem('token'); // Remove the token from localStorage
        // Redirect the user to the login page or home page
        window.location.href = '/login'; // Adjust the redirect URL as needed
      }
    } catch (error) {
      console.error('Error during logout:', error);
      alert('Failed to log out. Please try again.');
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src="/images/Bandhan.png" alt="Brand Logo" className="logo" />
      </div>
      <div className="navbar-right">
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default UserNavbar;
