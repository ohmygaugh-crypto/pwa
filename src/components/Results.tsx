// Results.tsx
import React from 'react';
import { useLocation } from 'react-router-dom';

function Results() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const recipe = queryParams.get('recipe') || '';

    return (
        <div>
            <h1>Extracted Recipe</h1>
            <pre>{decodeURIComponent(recipe)}</pre>
        </div>
    );
}

export default Results;