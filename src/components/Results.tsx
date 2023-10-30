// Results.tsx
import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import './Results.css';


function Results() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const encodedRecipe = queryParams.get('recipe') || '';

    // Decode the URL-encoded recipe
    const recipe = decodeURIComponent(encodedRecipe);


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

    // Styling for the container
    const containerStyle: React.CSSProperties = {
        width: '100%',
        maxWidth: '100vw', // Ensure the container doesn't exceed the viewport width
        margin: '0 auto',
        padding: '1rem',
        boxSizing: 'border-box', // Include padding and border in the element's total width and height
        overflowX: 'hidden' // Hide horizontal overflow
    };

    const preStyle: React.CSSProperties = {
        whiteSpace: 'pre-wrap', // Allows the text to wrap
        wordWrap: 'break-word' // Breaks the line at arbitrary points if necessary
    };

    return (
        <div style={containerStyle}>
            <h1>Extracted Recipe</h1>
            <ReactMarkdown remarkPlugins={[gfm]} children={recipe}></ReactMarkdown>
            <Link to="/">Go back to home</Link>  
        </div>
    );
}

export default Results;