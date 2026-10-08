import { useState } from "react";
import axios from "axios";
import { API_URL } from "../consts-data";
import { Link, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Login = () => {
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${API_URL}/login`, formData);
      localStorage.setItem("token", data.token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
      navigate("/explore");
    } catch (err) {
      setError(err.response?.data?.message || "Unable to log in right now");
      setTimeout(() => setError(""), 3000);
    }
  };

  return (
    <div className="main-form">
      <div className="back-form" aria-hidden="true"></div>
      <div className="form-body">
        <h1 className="form-title">Login</h1>
        <p className="form-sub">Welcome back, hungry traveller.</p>
        <form onSubmit={onSubmit}>
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
              autoComplete="current-password"
              value={formData.password}
              onChange={onChange}
              required
            />
          </Form.Group>
          <Button
            className="form-btn"
            variant="primary"
            type="submit"
            size="lg"
            disabled={!formData.email || !formData.password}
          >
            Login
          </Button>
          {error && (
            <p className="error" role="alert">
              {error}
            </p>
          )}
        </form>
        <p className="form-switch">
          New here? <Link to="/register">Create an account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
