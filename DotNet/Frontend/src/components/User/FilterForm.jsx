
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../../Styles/matches.css";

export default function FilterForm() {
  const [filters, setFilters] = useState({
    religion: "",
    location: "",
    occupation: "",
  });
  
  const navigate = useNavigate(); // Used for navigation after applying filters

  // Handle input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async () => {
    const token = localStorage.getItem("token"); // Get JWT token

    if (!token) {
      console.error("User is not authenticated.");
      return;
    }

    // Convert religion to uppercase before sending the request
    const updatedFilters = {
      ...filters,
      religion: filters.religion.toUpperCase(),
    };

    try {
      const response = await axios.post(
        "http://localhost:5163/api/user/profiles/filter",
        updatedFilters, // Send modified filters
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Filtered Profiles Data:", response.data);

      // Navigate to MatchesDisplay and pass the filtered data
      navigate("/user/matches/results", { state: { filteredData: response.data } });
    } catch (error) {
      console.error("Error fetching filtered profiles", error);
    }
  };

  return (
    <div className="filter-form">
      <select name="religion" className="form-select" onChange={handleChange}>
        <option value="">Select Religion</option>
        <option value="CHRISTIAN">Christianity</option>
        <option value="SIKH">Sikh</option>
        <option value="JAIN">Jain</option>
        <option value="MUSLIM">Muslim</option>
        <option value="HINDU">Hindu</option>
      </select>

      <select name="location" className="form-select" onChange={handleChange}>
        <option value="">Select Location</option>
        <option value="Pune">Pune</option>
        <option value="Mumbai">Mumbai</option>
        <option value="Nagpur">Nagpur</option>
        <option value="Nashik">Nashik</option>
        <option value="Delhi">Delhi</option>
        <option value="Bangalore">Bangalore</option>
        <option value="Chennai">Chennai</option>
        <option value="Hyderabad">Hyderabad</option>
      </select>

      <select name="occupation" className="form-select" onChange={handleChange}>
        <option value="">Select Occupation</option>
        <option value="Engineer">Engineer</option>
        <option value="Doctor">Doctor</option>
        <option value="Teacher">Teacher</option>
        <option value="Business">Business</option>
        <option value="Government">Government Job</option>
      </select>

      <button onClick={handleSubmit} className="btn btn-primary">
        Apply Filters
      </button>
    </div>
  );
}
