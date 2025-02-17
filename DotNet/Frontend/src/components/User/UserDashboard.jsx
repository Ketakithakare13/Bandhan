import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../Styles/userdashboard.css";

const UserDashboard = () => {
    const navigate = useNavigate();
    const [profiles, setProfiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [loggedInUser, setLoggedInUser] = useState(null); // Store logged-in user details
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("⚠️ Token not found in localStorage.");
            setError("Token not found. Please log in.");
            setLoading(false);
            return;
        }
    
        // Fetch logged-in user details
        fetch("http://localhost:5163/api/user/me", {
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` }
        })
        .then(response => {
            console.log("🔍 Fetching logged-in user details:", response);
            if (!response.ok) throw new Error("Failed to fetch user details.");
            return response.json();
        })
        .then(user => {
            console.log("✅ Logged-in user:", user);
            setLoggedInUser(user);
        })
        .catch(err => {
            console.error("❌ Error fetching user details:", err);
            setError("Error fetching user details.");
        });
    
        // Fetch all profiles
        fetch("http://localhost:5163/api/user/dashboard", {
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` }
        })
        .then(response => {
            console.log("🔍 Fetching profiles:", response);
            if (!response.ok) {
                throw new Error(`HTTP Error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("✅ Profiles received:", data);
            setProfiles(data);
            setLoading(false);
        })
        .catch(err => {
            console.error("❌ Error fetching profiles:", err);
            setError("Failed to load profiles.");
            setLoading(false);
        });
    }, []);
    

    
    const handleViewProfile = (id) => {
        navigate(`/user/${id}`);
      };
      
    

    if (loading) return <p>Loading profiles...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="user-dashboard-container">
            {profiles.length === 0 ? (
                <p className="text-gray-600">No profiles found.</p>
            ) : (
                <div className="profile-grid">
                    {profiles.map(user => (
                        <div key={user.id} className="profile-card">
                            <div className="profile-image-container">
                                <img 
                                    src={user.photo || "https://via.placeholder.com/150"} 
                                    alt={user.name} 
                                    className="profile-image"
                                />
                            </div>
                            <div className="profile-content">
                                <h2 className="profile-name">{user.name}</h2>
                                <p className="profile-info">{user.location}</p>
                                <button onClick={() => handleViewProfile(user.id)} className="send-interest-btn">
                                    🔍 View Profile
                                </button>

                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default UserDashboard;
