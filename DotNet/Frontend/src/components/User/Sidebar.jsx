import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../../Styles/sidebar.css'; 
import axios from 'axios';

function Sidebar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5163/api/user/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log('User Data:', response.data);
        // Assuming the response data is the entire User object
        setUser(response.data); // Set user details
      } catch (error) {
        console.error('Failed to fetch user details:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="sidebar">
      <div className="profile-info">
        {user ? (
          <>
            <h2>Hi {user.name}!</h2>  {/* Display user's name */}
              {/* Display user's email */}
          </>
        ) : (
          <p>Loading...</p>  
        )}
        <Link to="/user/edit-profile">Edit Profile</Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/user/matches">Matches</Link>
          </li>
          {/* <li>
            <Link to="/user/activity">Activity</Link>
          </li> */}
          <li>
            <Link to="/user/chat">Messenger</Link>
          </li>
          <li>
            <Link to="/user/upgrade">Subscription Plan</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
