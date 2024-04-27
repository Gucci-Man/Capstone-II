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
        if(!token) {
            navigate('/', {replace: true}); // prevent user from going to previous page
            
        }

        const storedUsername = localStorage.getItem('username');
        setUsername(storedUsername);
    }, []); // Ensure username is fetched only once on component mount

    return (
        <div className="home-page">
            <h1>Welcome home {username}</h1>
        </div>
    );
};

export default Home;