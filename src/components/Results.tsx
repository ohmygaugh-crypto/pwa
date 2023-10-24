// Results.tsx
import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';

function Results() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const recipe = queryParams.get('recipe') || '';

    // Use the useEffect hook to store the recipe in local storage when the component mounts
    useEffect(() => {
        if (recipe !== '') {
            // Check if the recipe already exists in local storage
            const existingRecipe = Object.values(localStorage).find(value => value === recipe);

            if (!existingRecipe) {
                // If the recipe doesn't exist, generate a unique title for the recipe
                const recipeTitle = `Recipe ${Date.now()}`;

                // Store the recipe in local storage
                localStorage.setItem(recipeTitle, recipe);
            }
        }
    }, [recipe]);

    return (
        <div>
            <h1>Extracted Recipe</h1>
            <pre>{decodeURIComponent(recipe)}</pre>
            <Link to="/">Go back to home</Link>  {/* Add this line */}
        </div>
    );
}

export default Results;