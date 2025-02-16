// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";

// export default function UserDetails() {
//   const { id } = useParams(); // Get user ID from URL
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     axios.get(`http://localhost:5163/api/admin/get-user/${id}`)
//       .then((response) => {
//         setUser(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching user data:", error);
//       });
//   }, [id]);

//   if (!user) {
//     return <p className="text-center">Loading user details...</p>;
//   }

//   return (
//     <div className="container mt-4">
//       <div className="card profile-card w-25 h-50">
//         <div className="image-container">
//           <img src={user.photo || "https://via.placeholder.com/286x180"} className="card-img-top profile-image" alt={user.name} />
//         </div>
//         <div className="card-body">
//           <h3 className="card-title">{user.name}</h3>
//           <p><strong>Location:</strong> {user.location}</p>
//           <p><strong>Mobile:</strong> {user.mobile}</p>
//           <p><strong>Occupation:</strong> {user.occupation}</p>
//           <p><strong>Religion:</strong> {user.religion}</p>
//           <p><strong>Date of Birth:</strong> {user.dateOfBirth}</p>
//           <p><strong>Income:</strong> {user.income}</p>
//           <p><strong>Marital Status:</strong> {user.maritialStatus}</p>
//           <p><strong>Caste:</strong> {user.caste}</p>
//           <button className="btn btn-primary">💌 Send Interest</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";

// export default function UserDetails() {
//   const { id } = useParams(); // Get user ID from URL
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   console.log("User ID from URL:", id); // Debugging line

//   useEffect(() => {
//     const fetchUserDetails = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) {
//           throw new Error("Unauthorized! Please log in.");
//         }

//         const response = await axios.get(`http://localhost:5163/api/admin/user/${id}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         setUser(response.data);
//       } catch (err) {
//         setError("Failed to load user details. Please try again.");
//         console.error("Error fetching user details:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserDetails();
//   }, [id]);

//   if (loading) return <p className="text-center">Loading user details...</p>;
//   if (error) return <p className="text-center text-danger">{error}</p>;

//   return (
//     <div className="container mt-4">
//       <div className="card profile-card w-50">
//         <div className="image-container">
//           <img 
//             src={user.photo || "https://via.placeholder.com/286x180"} 
//             className="card-img-top profile-image" 
//             alt={user.name} 
//           />
//         </div>
//         <div className="card-body">
//           <h3 className="card-title">{user.name}</h3>
//           <p><strong>Location:</strong> {user.location}</p>
//           <p><strong>Mobile:</strong> {user.mobile}</p>
//           <p><strong>Occupation:</strong> {user.occupation}</p>
//           <p><strong>Religion:</strong> {user.religion}</p>
//           <p><strong>Date of Birth:</strong> {user.dateOfBirth}</p>
//           <p><strong>Income:</strong> {user.income}</p>
//           <p><strong>Marital Status:</strong> {user.maritialStatus}</p>
//           <p><strong>Caste:</strong> {user.caste}</p>
//           <button className="btn btn-primary">💌 Send Interest</button>
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5163/api/admin/user/${id}`)
      .then((response) => setUser(response.data))
      .catch((error) => console.error("Error fetching user details:", error));
  }, [id]);

  if (!user) return <h2>Loading...</h2>;

  return (
    <div className="container mt-4">
      <h2>User Profile</h2>
      <div className="card p-3">
        <p><strong>ID:</strong> {user.id}</p>
        <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Gender:</strong> {user.gender}</p>
      </div>
    </div>
  );
};

export default UserDetails;