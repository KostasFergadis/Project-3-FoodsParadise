import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../consts-data";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Register = () => {
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const showError = (message) => {
    setError(message);
    setTimeout(() => setError(""), 3000);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (formData.password.length < 7 || formData.userName.length < 3) {
      showError(
        "Username needs 3+ characters and the password needs 7+ characters"
      );
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      showError("Passwords do not match");
      return;
    }
    try {
      await axios.post(`${API_URL}/register`, formData);
      navigate("/login");
    } catch (err) {
      showError(err.response?.data?.message || "Unable to register right now");
    }
  };

  const allFilled = Object.values(formData).every(Boolean);

  return (
    <div className="main-form">
      <div className="back-form back-form-register" aria-hidden="true"></div>
      <div className="form-body">
        <h1 className="form-title">Register</h1>
        <p className="form-sub">Create an account to build your own list.</p>
        <form onSubmit={onSubmit}>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Username"
              aria-label="Username"
              name="userName"
              autoComplete="username"
              onChange={onChange}
              value={formData.userName}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="email"
              placeholder="Email"
              aria-label="Email"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={onChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="password"
              placeholder="Password"
              aria-label="Password"
              name="password"
              autoComplete="new-password"
              onChange={onChange}
              value={formData.password}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="password"
              placeholder="Confirm password"
              aria-label="Confirm password"
              name="confirmPassword"
              autoComplete="new-password"
              onChange={onChange}
              value={formData.confirmPassword}
              required
            />
          </Form.Group>
          <Button
            className="form-btn"
            variant="primary"
            type="submit"
            size="lg"
            disabled={!allFilled}
          >
            Register
          </Button>
          {error && (
            <p className="error" role="alert">
              {error}
            </p>
          )}
        </form>
        <p className="form-switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
