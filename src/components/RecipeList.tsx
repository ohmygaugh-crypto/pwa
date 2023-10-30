import React, { useEffect, useState } from 'react';
import { MagicMotion } from 'react-magic-motion';
import { useNavigate, NavigateFunction } from 'react-router-dom';

interface RecipeListItemProps {
  title: string;
  handleDelete: (title: string) => void;
  navigate: NavigateFunction;
}

function RecipeListItem({ title, handleDelete, navigate }: RecipeListItemProps) {
  const navigateToRecipe = () => {
    navigate(`/results?recipe=${encodeURIComponent(localStorage.getItem(title) || '')}`);
  };

  return (
    <li>
      <div onClick={navigateToRecipe} style={{ cursor: 'pointer' }}>
        {title}
      </div>
      <button onClick={() => handleDelete(title)}>Delete</button>
    </li>
  );
}

function RecipeList() {
  const [recipeTitles, setRecipeTitles] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const keys = Object.keys(localStorage);
    const titles = keys.filter((key) => key !== 'loglevel:webpack-dev-server');
    setRecipeTitles(titles);
  }, []);

  const handleDelete = (titleToDelete: string) => {
    localStorage.removeItem(titleToDelete);
    setRecipeTitles((prevTitles) => prevTitles.filter((title) => title !== titleToDelete));
  };

  return (
    <MagicMotion>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '1rem' }}>
        <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', overflow: 'hidden' }}>
          {recipeTitles.map((title) => (
            <RecipeListItem key={title} title={title} handleDelete={handleDelete} navigate={navigate} />
          ))}
        </ul>
      </div>
    </MagicMotion>
  );
}

export default RecipeList;