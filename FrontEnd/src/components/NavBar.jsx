import { Link, NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export const BrandMark = () => (
  <svg className="brand-mark" viewBox="0 0 32 32" aria-hidden="true">
    <circle cx="16" cy="16" r="16" />
    <path d="M9 15h14a7 7 0 0 1-14 0z" />
    <path d="M12 11.5c0-1.4 1.2-1.6 1.2-3M16 11.5c0-1.4 1.2-1.6 1.2-3M20 11.5c0-1.4 1.2-1.6 1.2-3" />
  </svg>
);

const navigationLinks = [
  { title: "Home", slug: "/" },
  { title: "Explore", slug: "/explore" },
];

const NavBar = () => {
  const { loggedIn, logout } = useAuth();

  return (
    <nav className="site-nav" aria-label="Main">
      <Link to="/" className="brand">
        <BrandMark />
        <span>Foods Paradise</span>
      </Link>
      <ul className="primary-nav">
        {navigationLinks.map((link) => (
          <li key={link.slug}>
            <NavLink to={link.slug} end>
              {link.title}
            </NavLink>
          </li>
        ))}
      </ul>
      <ul className="secondary-nav">
        {loggedIn ? (
          <>
            <li>
              <NavLink to="/my-list">My List</NavLink>
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
              <NavLink to="/login">Login</NavLink>
            </li>
            <li>
              <Link to="/register" className="nav-cta">
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
