import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Assuming you want navigation functionality 
/* import RecipeSearch from './RecipeSearch'; // A component for searching recipes 
import RecipeCreation from './RecipeCreation'; // A component for creating recipes */

const Home = () => {
    const [username, setUsername] = useState(null);

    useEffect(() => {
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