


import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./LoginPage.css"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Login initiated...");
    console.log("Email:", email, "Password:", password);

    try {
      const response = await axios.post('http://localhost:8080/auth/signin', {
        email,
        password,
      });

      console.log("Response received:", response.data);
      const { token } = response.data;

      // Save the token in localStorage
      localStorage.setItem('token', response.data.jwt);
      console.log("Token stored in localStorage:", localStorage.getItem('token'));

      // Store the email in localStorage
      localStorage.setItem('userEmail', email);
     // console.log("User email stored in localStorage:", localStorage.getItem('userEmail'));



      alert('Login successful!');
      navigate('/user/dashboard'); // Redirect to create profile page
    } catch (error) {
      console.error("Login failed:", error);
      alert(error.response?.data || "Login failed. Please try again.");
    }
  };

  return (
    <div className="login-wrapper" style={{ backgroundColor: "#f5e6d7", minHeight: "100vh", padding: "20px" }}>
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" style={{ backgroundColor: "purple", color: "white", padding: "10px 15px", border: "none", borderRadius: "5px" }}>
            Login
          </button>
          <Link to="/register">
            <button className="m-2" style={{ backgroundColor: "purple", color: "white", padding: "10px 15px", border: "none", borderRadius: "5px" }}>
              Register Now
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
}  
export default Login;

