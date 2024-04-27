import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Assuming you want navigation functionality 
/* import RecipeSearch from './RecipeSearch'; // A component for searching recipes 
import RecipeCreation from './RecipeCreation'; // A component for creating recipes */

// Only logged in users can see this page with token
const Home = ({token}) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState(null);
    /* console.log(`Inside Home: ${token}`) */

    useEffect(() => {
        
        // if token is not available, return to welcome page
        if(!token && !localStorage.getItem('token')) {
            navigate('/', {replace: true}); // prevent user from going to previous page
        }
        const storedUsername = localStorage.getItem('username');
        setUsername(storedUsername);
    }, [token, navigate]); // Add token and navigate as dependencies

    const handleLogout = () => {
        // Clear token from localStorage
        localStorage.removeItem('token');

        // Clear username from localStorage
        localStorage.removeItem('username');

        // Redirect to the Welcome page
        navigate('/', {replace: true});
    };

    return (
        <div className="home-page">
            <h1>Welcome home {username}</h1>
            <button onClick={handleLogout} className="btn btn-danger">Logout</button>
        </div>
    );
};

export default Home;