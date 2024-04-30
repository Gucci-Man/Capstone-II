import React, {useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import RecipeComponent from './RecipeComponent';

const RecipePage = ({ token }) => {
    const navigate = useNavigate();
    const [recipes, setRecipes] = useState([]); // Use to store recipes

    useEffect(() => {
        
        // if token is not available, return to welcome page
        if(!token && !localStorage.getItem('token')) {
            navigate('/', {replace: true}); // prevent user from going to previous page
        }
        const storedUsername = localStorage.getItem('username');
    }, [token, navigate]); // Add token and navigate as dependencies

    return (
        <div>
            <h1>Recipes Page</h1>
            <RecipeComponent />
        </div>
    );
};

export default RecipePage;