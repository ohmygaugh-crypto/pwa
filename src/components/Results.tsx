// Results.tsx
import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import './Results.css';


function Results() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const recipe = queryParams.get('recipe') || '';

    // Use the useEffect hook to store the recipe in local storage when the component mounts
    useEffect(() => {
        if (recipe !== '') {
            // Extract the title from the recipe content
            const titleMatch = recipe.match(/Title: (.*?)(?= 👨🏻‍🍳|\n|$)/s);
            const recipeTitle = titleMatch ? titleMatch[1] : `Recipe ${Date.now()}`;
    
            // Check if the recipe already exists in local storage
            const existingRecipe = Object.values(localStorage).find(value => value === recipe);
    
            if (!existingRecipe) {
                // Store the recipe in local storage
                localStorage.setItem(recipeTitle, recipe);
            }
        }
    }, [recipe]);

    // Styling for the container
    const containerStyle: React.CSSProperties = {
        width: '100%',
        maxWidth: '100vw', // Ensure the container doesn't exceed the viewport width
        margin: '0 auto',
        padding: '1rem',
        boxSizing: 'border-box', // Include padding and border in the element's total width and height
        overflowX: 'hidden' // Hide horizontal overflow
    };

    

    return (
        <div className='results-container' style={containerStyle}>
            <h1>Extracted Recipe</h1>
            <ReactMarkdown remarkPlugins={[gfm]} children={recipe}></ReactMarkdown>
            <Link to="/">Go back to home</Link>  
        </div>
    );
}

export default Results;