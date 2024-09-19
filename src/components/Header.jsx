import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Header.css';

const Home = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container">
        {/* Brand/Title */}
        <NavLink className="navbar-brand" to="/">Farmers App</NavLink>

        {/* Navbar Toggler for mobile view */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink exact className="nav-link" activeClassName="active" to="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" activeClassName="active" to="/rental">Rental</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" activeClassName="active" to="/weather">Weather</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" activeClassName="active" to="/crops">AgroManagement</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" activeClassName="active" to="/prices">Prices</NavLink>
            </li>
          </ul>
      <div className="nav-link dropdown-toggle"  id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Languages
              </div>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>English</li>
                <li>Hindi</li>
              </ul>
  
        </div>
      </div>
    </nav>
  );
};

export default Home;
