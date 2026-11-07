import React, { useState } from "react";
import { Link } from "react-router-dom";
import { logOut } from "../utilities/user_auth";
import "../CSS/Navbar.css";

function Navbar({ user, setUser }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="nav container">
      <h1>Chat Bot Challenge</h1>
      <button className="nav__toggle" onClick={toggleMenu}>
        ☰
      </button>
      <div
        className={`nav__menu ${isMenuOpen ? "nav__menu--open" : ""}`}
        id="nav-menu"
      >
        <ul className="nav__list">
          <li className="nav__item">
            <Link
              to="/"
              className="nav__link"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
          </li>
          <li className="nav__item">
            <Link
              to="Place_Holder/"
              className="nav__link"
              onClick={() => setIsMenuOpen(false)}
            >
              Place Holder
            </Link>
          </li>
          <li className="nav__item">
            <Link
              to="Place_holder/"
              className="nav__link"
              onClick={() => setIsMenuOpen(false)}
            >
              Place Holder
            </Link>
          </li>
        </ul>
        {!user ? (
          <div className="user_nav">
            <ul>
              <li className="nav__item">
                <Link
                  to="signup"
                  className="nav__link"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Signup
                </Link>
              </li>
              <li className="nav__item">
                <Link
                  to="login"
                  className="nav__link"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Log In
                </Link>
              </li>
            </ul>
          </div>
        ) : (
          <button
            onClick={async () => {
              setUser(await logOut());
              setIsMenuOpen(false);
            }}
          >
            Log Out
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
