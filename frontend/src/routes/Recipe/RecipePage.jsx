import React, {useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import RecipeComponent from './RecipeComponent';

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
                console.log(response.data)
                setRecipes(response.data.recipes);
                console.log(typeof recipes);
            } catch (err) {
                console.error("Error fetching recipes:", err);
            }
        };

        fetchData();

    }, [token, navigate]); // Add token and navigate as dependencies

    return (
        <div>
            <h1>Recipes Page</h1>
            {recipes.map((recipe) => ( // Render multiple RecipeComponents
                <RecipeComponent key={recipe.id} recipe={recipe} /> // Pass recipe to component
            ))}
        </div>
    );
};

export default RecipePage;