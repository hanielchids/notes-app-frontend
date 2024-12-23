import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isRegistering ? "/api/auth/register" : "/api/auth/login";

    try {
      const response = await axios.post(endpoint, formData);
      const { token } = response.data;

      // Save token to localStorage
      localStorage.setItem("token", token);

      // Redirect to dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error("Error:", error.response?.data?.message || error.message);
      alert("Authentication failed!");
    }
  };

  return (
    <div className="home-container">
      <h1>Welcome to the Note-Taking App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">
          {isRegistering ? "Register" : "Log In"}
        </button>
      </form>
      <button onClick={() => setIsRegistering(!isRegistering)}>
        {isRegistering
          ? "Already have an account? Log In"
          : "Don't have an account? Register"}
      </button>
    </div>
  );
};

export default Home;
