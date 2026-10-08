import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { BrandMark } from "./NavBar";

const Footer = () => {
  const { loggedIn, logout } = useAuth();

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-about">
          <Link to="/" className="brand">
            <BrandMark />
            <span>Foods Paradise</span>
          </Link>
          <p>
            Discover the top 10 foods in the world, review your favourites and
            build a list of your own.
          </p>
        </div>

        <nav aria-label="Explore" className="footer-col">
          <h2>Explore</h2>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/explore">All foods</Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="Account" className="footer-col">
          <h2>Account</h2>
          <ul>
            {loggedIn ? (
              <>
                <li>
                  <Link to="/my-list">My List</Link>
                </li>
                <li>
                  <button type="button" className="link-btn" onClick={logout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
      <p className="footer-legal">
        © {new Date().getFullYear()} Foods Paradise. Made with appetite.
      </p>
    </footer>
  );
};

export default Footer;
