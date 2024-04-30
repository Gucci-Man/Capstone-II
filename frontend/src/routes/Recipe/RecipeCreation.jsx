import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import RecipeComponent from './RecipeComponent'; // To display recipe

const baseURL = import.meta.env.VITE_BASE_URL;

const RecipeCreation = ({ token }) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const [recipeData, setRecipeData] = useState(null); // Store the created recipe

    const initialState = {
        ingredient_1: "",
        ingredient_2: "",
        ingredient_3: "",
        ingredient_4: "",
        ingredient_5: "",
    }

    const [formData, setFormData] = useState(initialState);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
    
        try {
         
          // Make the Axios request
          const response = await axios.post(`${baseURL}/recipes`, formData, {
            headers: { Authorization: `Bearer ${token}` }
          });
    
          // Handle successful creation
          console.log('Recipe created:', response.data);
          setRecipeData(response.data)
          console.log("recipeData is", recipeData);
          /* navigate('/recipes'); */ 
    
        } catch (err) {
          setError('Failed to create recipe. Please try again.');
          console.error(err);
        } finally {
          setIsLoading(false); 
          setFormData(initialState);
        }
    };
    
    // TODO: Use RecipeComponent to display instead of form
    return (
        <div>
            {isLoading && <div className="loading-screen">Loading...</div>}

            {!isLoading && recipeData && (
                // Display the created recipe
                <div>
                    <h2>{recipeData.recipe.title}</h2>
                    <h2>Time: {recipeData.recipe.total_time}</h2>
                    <p>{recipeData.recipe.instructions}</p>
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <label htmlFor="ingredient_1">Ingredient #1</label>
                <input 
                    id="ingredient_1"
                    type="text"
                    name="ingredient_1"
                    value={formData.ingredient_1}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="ingredient_2">Ingredient #2</label>
                <input 
                    id="ingredient_2"
                    type="text"
                    name="ingredient_2"
                    value={formData.ingredient_2}
                    onChange={handleChange}
                />
                <label htmlFor="ingredient_3">Ingredient #3</label>
                <input 
                    id="ingredient_3"
                    type="text"
                    name="ingredient_3"
                    value={formData.ingredient_3}
                    onChange={handleChange}
                />
                <label htmlFor="ingredient_4">Ingredient #4</label>
                <input 
                    id="ingredient_4"
                    type="text"
                    name="ingredient_4"
                    value={formData.ingredient_4}
                    onChange={handleChange}
                />
                <label htmlFor="ingredient_5">Ingredient #5</label>
                <input 
                    id="ingredient_5"
                    type="text"
                    name="ingredient_5"
                    value={formData.ingredient_5}
                    onChange={handleChange}
                />
                <button type="submit" className="btn btn-primary">Create Recipe</button>
            </form>
        </div>
    );
}

export default RecipeCreation;