import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <header className="Header">
      <div className="logo">
        <Link to="/">
          <img src="/reflecta_logo.png" alt="Logo" className="logo-image" />
        </Link>
      </div>
      <nav className="nav">
        <ul className="nav-list">
          <li className="nav-item"><Link to="/all-entries">All Entries</Link></li>
          <li className="nav-item"><Link to="/add-entry">Add Entry</Link></li>
          <li className="nav-item"><Link to="/mood-tracker">Mood Tracker</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;