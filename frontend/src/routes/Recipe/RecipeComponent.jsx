import React, { useState } from 'react';
import "../../styles/Recipe.css"
import axios from 'axios';

const baseURL = import.meta.env.VITE_BASE_URL;

const RecipeComponent = ({ recipe, token }) => {
    const instructions = recipe.instructions.split("\n"); // Convert instructions to an array
    const [isDeleted, setIsDeleted] = useState(false); // state to manage component visibility

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`${baseURL}/recipes/${recipe.id}`, {
                headers: {Authorization: `Bearer ${token}`}
            });
            /* console.log(response); */
            if (response.status === 200) {
                setIsDeleted(true);
            }
        } catch (err) {
            // Handle network errors and other unexpected issues
            console.log("Error deleting recipe:", err);
        }
    }
    
    // TODO: Add delete button
    return (
        <div>
            {!isDeleted && (
                <div className="recipe">
                <h2>{recipe.title}</h2>
                <h4>Time: {recipe.total_time}</h4>
                {/* <p>{instructions}</p> */}
                <div>
                    {instructions.map((step, index) => ( // Convert instructions to an array to display
                        <p key={index}>{step}</p>
                    ))}
                </div>
                <button onClick={handleDelete} type="button" className="btn btn-danger">Delete</button>
            </div>
            )}
        </div>
    );
};

export default RecipeComponent;