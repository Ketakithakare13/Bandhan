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
      const response = await axios.post('http://localhost:5163/api/UserAuth/Login', {
        email,
        password,
      });

      console.log("Response received:", response.data);
      const { token } = response.data;

      // Save the token in localStorage
      localStorage.setItem('token', token);
      console.log("Token stored in localStorage:", localStorage.getItem('token'));

      alert('Login successful!');
      navigate('/user/dashboard'); // Redirect to create profile page
    } catch (error) {
      console.error("Login failed:", error);
      alert(error.response?.data || "Login failed. Please try again.");
    }
  };

  return (
    <div className="login-wrapper">
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
          <button type="submit">Login</button>
          <Link to="/register">
            <button className="m-2">Register Now</button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
