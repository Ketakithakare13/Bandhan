// import React, { useEffect, useState } from "react";
// import { useNavigate,Link } from "react-router-dom";
// import axios from "axios";
// import "./styles.css";

// function Users() {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
     
//     const fetchUsers = async () => {
//       try {
//         const token = localStorage.getItem("token"); // Ensure user is authenticated
//         if (!token) {
//           throw new Error("Unauthorized! Please log in.");
//         }

//         const response = await axios.get("http://localhost:5163/api/admin/get-all-users", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         setUsers(response.data);
//       } catch (err) {
//         setError("Failed to load users. Please try again.");
//         console.error("Error fetching users:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, []);

//   const handleViewProfile = (id) => {
//     console.log("Navigating to user profile with ID:", id); // Debugging
//     navigate(`/admin/user/${id}`);
//   };
  
  

//   return (
//     <div className="users-container">
//       <h2 className="users-heading">Users</h2>
//       {loading ? (
//         <p>Loading...</p>
//       ) : error ? (
//         <p className="error">{error}</p>
//       ) : (
//         <table className="table users-table">
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map(user => (
//               <tr key={user.id}>
//                 <td>{user.name}</td>
//                 <td>{user.email}</td>
//                 <td>
//                 {/* <Link to={`/admin/user/${user.id}`} className="btn btn-info">
//                    View Profile
//                 </Link> */}
//                 <button onClick={() => handleViewProfile(user.id)} className="btn btn-info">
//                    View Profile
//                 </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }

// export default Users;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/admin/users")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const viewProfile = (id) => {
    navigate(`/user/${id}`); // Navigate to profile page
  };

  return (
    <div className="container mt-4">
      <h2>Registered Users</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.firstName} {user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.gender}</td>
              <td>
                <button onClick={() => viewProfile(user.id)} className="btn btn-primary">
                  View Profile
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;