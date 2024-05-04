/**
 * NavBar.jsx
 * ----------
 * Component representing the application's navigation bar.
 * Provides:
 *   * Links to core sections of the application (Home, Recipes, Profile).
 *   * A logout button that clears user credentials and redirects. 
 *
 * Dependencies:
 * *  react-router-dom (Link, useNavigate): For navigation.
 * 
 * Note: This component is conditionally rendered based on login status.
 */

import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import "./styles/NavBar.css";

const NavBar = ({ username, setIsLoggedIn }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear token from localStorage
        localStorage.removeItem('token');

        // Clear username from localStorage
        localStorage.removeItem('username');

        // Update login state to re-render App
        setIsLoggedIn(false);

        // Redirect to the Welcome page
        navigate('/', {replace: true});
    }
    
    return (
        <nav>
            <div className="navbar-left">
                <Link to="/">Home</Link>
                <Link to="/recipes">Recipes</Link>
                <Link to={`/user/${username}`}>Profile</Link>
            </div>
            <div className="navbar-right">
                <button onClick={handleLogout} className="btn btn-danger">Logout</button>
            </div>
        </nav>
    );
}

export default NavBar;