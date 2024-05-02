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

    }, [token, navigate]); // Add token and navigate as dependencies

    // TODO: Hide title when recipes are shown
    return (
        <div>
            {recipes.length === 0 && <h1>Oops there aren't any recipes yet</h1>}
            <div className="recipeList">
            {recipes && recipes.map((recipe) => ( // Render multiple RecipeComponents
                <RecipeComponent key={recipe.id} recipe={recipe} /> // Pass recipe to component
            ))}
            </div>
        </div>
    );
};

export default RecipePage;