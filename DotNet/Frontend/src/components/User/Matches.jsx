import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../../Styles/matches.css";


export default function Matches() {
  const location = useLocation();
  const navigate = useNavigate();
  const { filteredData } = location.state || {}; // Get filtered data from state

  if (!filteredData || filteredData.length === 0) {
    return <p className="text-center">No matches found.</p>;
  }

  const handleViewProfile = (id) => {
    navigate(`/user/${id}`);
  };

  const sendInterest = (id) => {
    alert(`Interest sent to user ID: ${id}`);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Filtered Matches</h2>
      <div className="row">
        {filteredData.map((profile) => (
          <div key={profile.id} className="col-md-4 mb-4">
            <div className="card text-center">
              <div className="image-container">
                <img
                  src={profile.photo || "https://via.placeholder.com/286x180"}
                  className="card-img-top profile-image"
                  alt={profile.name}
                />
              </div>
                {/* Partition Line */}
                <hr className="divider" />
              <div className="card-body">
                <h5 className="card-title">{profile.name}</h5>
                <p className="card-text"><strong>Location:</strong> {profile.location}</p>
                <button 
                  className="btn btn-primary" 
                  onClick={() => sendInterest(profile.id)}
                >
                  💌 Send Interest
                </button>
                <button 
                  className="btn btn-primary" 
                  onClick={() => handleViewProfile(profile.id)}
                >
                  🔍 View Profile
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
