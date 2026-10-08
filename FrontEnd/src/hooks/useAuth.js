import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const useAuth = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setLoggedIn(Boolean(token));
    axios.defaults.headers.common["Authorization"] = token
      ? `Bearer ${token}`
      : "";
  }, [location]);

  const logout = () => {
    axios.defaults.headers.common["Authorization"] = "";
    localStorage.removeItem("token");
    setLoggedIn(false);
    navigate("/");
  };

  return { loggedIn, logout };
};

export default useAuth;
