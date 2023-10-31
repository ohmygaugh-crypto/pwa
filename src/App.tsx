import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import NewsTicker from './components/NewsTicker';
import ShareTargetComponent from './components/ShareTargetComponent';
import CookingMode from './components/CookingMode';
import Results from './components/Results';
import RecipeList from './components/RecipeList';  // Import RecipeList
import TestComponent from './components/TestComponent';


function App() {
  const [file, setFile] = useState<File | null>(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (file) {
      setIsButtonDisabled(true); // Disable the button

      const formData = new FormData();
      formData.append('file', file);

    // Send the file to your backend for processing
    const response = await fetch('https://flaskserverpy-948e2781e8db.herokuapp.com/process-image', {
        method: 'POST',
        body: formData
    });
    const data = await response.json();

    // Redirect to the results page with the extracted recipe, but the url sanitized of emojis that cause errors
    window.location.href = `/results?recipe=${encodeURIComponent(data.recipe)}`;

    setIsButtonDisabled(false); // Enable button again
  };
}

  useEffect(() => {
    function handleInstallPrompt(e: any) {
      // Simply log that the event was captured, no need to prevent default or show a button.
      console.log('beforeinstallprompt event captured.');
    }

    window.addEventListener('beforeinstallprompt', handleInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleInstallPrompt);
    };
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div className="App">
            <header className="App-header">
              <NewsTicker />
               
              
              

              {/* File Upload */}
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <input type="file" onChange={handleFileChange} />
                <button onClick={handleSubmit} disabled={isButtonDisabled}>
                  Convert Upload🔄⏳📩
                </button>
              </div>

              <RecipeList />  
              <TestComponent />

              <img src={logo} className="App-logo" alt="logo" />
              <p>
                ❤️‍🔥Love, 
                foodhobo🍲
              </p>
              <a
                className="App-link"
                href="https://foodhobo.io/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Food Hobo Website
              </a>

              {/* Button to navigate to Cooking Mode */}
              <button onClick={() => window.location.href = "/cooking-mode"}>
                Go to a random screen
              </button>
            </header>
          </div>
        } />
        <Route path="/results" element={<Results />} />
        <Route path="/share-target" element={<ShareTargetComponent />} />
        <Route path="/cooking-mode" element={<CookingMode />} /> {/* New route for Cooking Mode */}
      </Routes>
    </Router>
  );
}

export default App;