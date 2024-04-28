import React from 'react';
import { Link } from "react-router-dom";
import "./styles/NavBar.css";

const NavBar = ({ username }) => {
    
    return (
        <nav>
            <Link to="/">
                Home
            </Link>
            <Link to={`/user/${username}`}>
                User Profile
            </Link>
        </nav>
    );
}

export default NavBar;