import React, { useEffect, useState } from 'react';
import { MagicMotion } from 'react-magic-motion';
import { useNavigate } from 'react-router-dom';


function RecipeListItem({ title, handleDelete }: { title: string; handleDelete: (title: string) => void }) {
    const navigate = useNavigate(); // <-- Use the useHistory hook

    const navigateToRecipe = () => {
        navigate(`/results?recipe=${encodeURIComponent(localStorage.getItem(title) || '')}`);
    };
    
    
    return (
        <li>
            <div onClick={navigateToRecipe} style={{ cursor: 'pointer' }}> {/* <-- Add the onClick event here */}
                {title}
            </div>
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


//clicking a instruction step on this page highlights the contents in a green box as well as highlighting the measurements within the ingredients section!