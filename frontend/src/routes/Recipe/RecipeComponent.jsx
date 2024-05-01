import React from 'react';
import "../../styles/Recipe.css"

const RecipeComponent = ({ recipe }) => {
    const instructions = recipe.instructions.split("\n"); // Convert instructions to an array
    
    // TODO: Add delete button
    return (
        <div className="recipe">
            <h2>{recipe.title}</h2>
            <h4>Time: {recipe.total_time}</h4>
            {/* <p>{instructions}</p> */}
            <div>
                {instructions.map((step, index) => ( // Convert instructions to an array to display
                    <p key={index}>{step}</p>
                ))}
            </div>
        </div>
    );
};

export default RecipeComponent;