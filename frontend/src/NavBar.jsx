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
    
    // TODO: Add link for user recipes
    return (
        <nav>
            <div className="navbar-left">
                <Link to="/">Home</Link>
            </div>
            <div className="navbar-right">
                <Link to={`/user/${username}`}>User Profile</Link>
                <button onClick={handleLogout} className="btn btn-danger">Logout</button>
            </div>
        </nav>
    );
}

export default NavBar;