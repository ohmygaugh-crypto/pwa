import React, { useEffect, useState } from 'react';
import { MagicMotion } from 'react-magic-motion';

function RecipeListItem({ title, handleDelete }: { title: string; handleDelete: (title: string) => void }) {
    return (
        <li>
            {title}
            <button onClick={() => handleDelete(title)}>Delete</button>
        </li>
    );
}

function RecipeList() {
    const [recipeTitles, setRecipeTitles] = useState<string[]>([]);

    useEffect(() => {
        const keys = Object.keys(localStorage);
        const titles = keys.filter(key => key !== 'loglevel:webpack-dev-server');
        setRecipeTitles(titles);
    }, []);
    
    const handleDelete = (titleToDelete: string) => {
        localStorage.removeItem(titleToDelete);
        const keys = Object.keys(localStorage);
        const titles = keys.filter(key => key !== 'loglevel:webpack-dev-server');
        setRecipeTitles(prevTitles => prevTitles.filter(title => title !== titleToDelete));
    };

    return (
        <MagicMotion>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", marginTop: "1rem" }}>
                <ul style={{ display: "flex", flexDirection: "column", gap: "0.75rem", overflow: "hidden" }}>
                    {recipeTitles.map(title => (
                        <RecipeListItem key={title} title={title} handleDelete={handleDelete} />
                    ))}
                </ul>
            </div>
        </MagicMotion>
    );
}

export default RecipeList;
