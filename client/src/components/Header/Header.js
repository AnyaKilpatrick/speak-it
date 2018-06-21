import React from "react";

const Header = () => (
    <nav className="z-depth-5">
    <div className="nav-wrapper">
      <a href="#" className="brand-logo right">SpeakIT</a>
      <ul id="nav-mobile" className="left">
        <li><a href="#">Home</a></li>
        <li><a href="#">Profile</a></li>
      </ul>
    </div>
  </nav>
);

export default Header;