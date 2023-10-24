import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function RecipeList() {
    const [recipeTitles, setRecipeTitles] = useState<string[]>([]);

    useEffect(() => {
        const keys = Object.keys(localStorage);
        const titles = keys.filter(key => key !== 'loglevel:webpack-dev-server');
        setRecipeTitles(titles);
    }, []);
    
    const handleDelete = (title: string) => {
        // Remove the recipe from local storage
        localStorage.removeItem(title);

        // Update the list of recipe titles
        const keys = Object.keys(localStorage);
        const titles = keys.filter(key => key !== 'loglevel:webpack-dev-server');
        setRecipeTitles(titles);
    };

    return (
        <div>
            <h1>Stored Recipes</h1>
            {recipeTitles.map(title => (
                <div key={title}>
                    <Link to={`/results?recipe=${encodeURIComponent(localStorage.getItem(title) || '')}`}>
                        {title}
                    </Link>
                    <button onClick={() => handleDelete(title)}>Delete</button>  {/* Add this line */}
                </div>
            ))}
        </div>
    );
}

export default RecipeList;