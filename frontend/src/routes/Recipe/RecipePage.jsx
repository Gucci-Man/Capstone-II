/**
 * RecipePage.jsx
 * --------------
 * Fetches and displays a list of recipes associated with the logged-in user.
 * Includes:
 * 
 * *  Authentication check: Redirects to the welcome page if the user is not logged in.
 * *  Recipe retrieval from the backend API.
 * *  Rendering of individual recipes using the RecipeComponent.
 * *  Handles the scenario where a user has no recipes.
 * 
 * Dependencies:
 * *  react-router-dom (useNavigate): For redirecting if not authenticated.
 *  axios: For making API requests to the backend. 
 *  RecipeComponent.jsx:  To display individual recipe cards.
 */ 

import React, {useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import RecipeComponent from './RecipeComponent';
import '../../styles/recipeList.css'

const baseURL = import.meta.env.VITE_BASE_URL;

const RecipePage = ({ token, username }) => {
    const navigate = useNavigate();
    const [recipes, setRecipes] = useState([]); // Use to store recipes fetched from backend

    useEffect(() => {
        
        // if token is not available, return to welcome page
        if(!token && !localStorage.getItem('token')) {
            navigate('/', {replace: true}); // prevent user from going to previous page
        }

        const fetchData = async () => {
            try {
                const response = await axios.get(`${baseURL}/recipes/${username}`, {
                    headers: { Authorization: `Bearer ${token}` }
                  });
                setRecipes(response.data.recipes);
            } catch (err) {
                console.error("Error fetching recipes:", err);
            }
        };
        fetchData();
        
    }, [token, navigate, recipes]); // Add token and navigate as dependencies

    return (
        <div>
            {!recipes && <h1>Oops there aren't any recipes here, go create some!</h1>}
            <div className="recipeList">
            {recipes && recipes.map((recipe) => ( // Render multiple RecipeComponents
                <RecipeComponent key={recipe.id} recipe={recipe} token={token}/>
            ))}
            </div>
        </div>
    );
};

export default RecipePage;