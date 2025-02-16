import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

export default function UserProfile() {
  const { id } = useParams(); // Get user ID from URL
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5163/api/user/${id}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [id]);

  if (!user) {
    return <p className="text-center">Loading user details...</p>;
  }

  return (
    <div className="container mt-4">
      <div className="card profile-card w-25 h-50">
        <div className="image-container">
          <img src={user.photo || "https://via.placeholder.com/286x180"} className="card-img-top profile-image" alt={user.name} />
        </div>
        <div className="card-body">
          <h3 className="card-title">{user.name}</h3>
          <p><strong>Location:</strong> {user.location}</p>
          <p><strong>Mobile:</strong> {user.mobile}</p>
          <p><strong>Occupation:</strong> {user.occupation}</p>
          <p><strong>Religion:</strong> {user.religion}</p>
          <p><strong>Date of Birth:</strong> {user.dateOfBirth}</p>
          <p><strong>Income:</strong> {user.income}</p>
          <p><strong>Marital Status:</strong> {user.maritialStatus}</p>
          <p><strong>Caste:</strong> {user.caste}</p>
          <button className="btn btn-primary">💌 Send Interest</button>
        </div>
      </div>
    </div>
  );
}
