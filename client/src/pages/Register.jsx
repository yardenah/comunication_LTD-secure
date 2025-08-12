import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api"; // הקריאה ל-API בקובץ נפרד
import Input from "../components/Input";
import Button from "../components/Button";

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      await registerUser({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      alert("Registration successful! Redirecting to login...");

      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      alert(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Register</h1>

      <form onSubmit={handleSubmit}>
        <Input
          label="Username"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
        <Input
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <Input
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />

        <small className="password-requirements">
          Password must be at least 10 characters long and include uppercase letters, lowercase letters, numbers, and special characters.
        </small>

        <Input
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
        />

        {loading ? (
          <button className="spinner-button" disabled>
            <div className="spinner"></div>
          </button>
        ) : (
          <Button text="Register" />
        )}
      </form>

      <div className="login-link">
        Already have an account? <a href="/">Click here</a>
      </div>
    </div>
  );
}
