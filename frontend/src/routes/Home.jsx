/**
 * Home.jsx
 * --------
 * Acts as the main landing page for authenticated users. Provides the following:
 *
 * *  Authentication Guard:  Redirects to the welcome page if the user is not logged in.
 * *  Welcomes the user by displaying their username.
 * *  Includes the RecipeCreation component, allowing users to create new recipes.
 *
 * Dependencies:
 * *  react-router-dom (useNavigate): For redirecting if not authenticated.
 *  RecipeCreation.jsx: Component for handling recipe creation.
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RecipeCreation from './Recipe/RecipeCreation';


// Only logged in users can see this page with token
const Home = ({token, setToken, setIsLoggedIn}) => {
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

    return (
        <div className="home-page">
            <h1>Welcome {username}</h1>
            <RecipeCreation token={token}/>
        </div>
    );
};

export default Home;