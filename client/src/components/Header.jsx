import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <header className="Header">
      <div className="logo">
        <a href="https://www.google.com/">
          <img src="../../public/reflecta_logo.png" alt="Logo" className="logo-image" />
        </a>
      </div>
      <nav className="nav">
        <ul className="nav-list">
          <li className="nav-item"><a href="https://www.google.com/">All Entries</a></li>
          <li className="nav-item"><a href="https://www.google.com/">Add Entry</a></li>
          <li className="nav-item"><a href="https://www.google.com/">Mood Tracker</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;