import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import NewsTicker from './components/NewsTicker';
import ShareTargetComponent from './components/ShareTargetComponent';
import CookingMode from './components/CookingMode';
import Results from './components/Results';
import RecipeList from './components/RecipeList';  // Import RecipeList
import TestComponent from './components/TestComponent';
import TestThreeScene from './3d/TestThreeScene';
import { Container } from '@chakra-ui/react';


function App() {
  const [file, setFile] = useState<File | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [sharedURL, setSharedURL] = useState('');

  const handleBrowseBookmarks = () => {
    window.open('chrome://instead of bookmarks have this point to the url where they can download the browser extension');
  };


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
  } else if (sharedURL) {
    handleSharedURL(sharedURL);
  }
};

const handleSharedURL = async (url: string) => {
  // Perform necessary actions to send the shared URL to your backend for processing
  const response = await fetch('https://flaskserverpy-948e2781e8db.herokuapp.com/process-image', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `url=${encodeURIComponent(url)}`,
  });
  const data = await response.json();

  // Redirect to the results page with the extracted recipe, but the URL sanitized of emojis that cause errors
  window.location.href = `/results?recipe=${encodeURIComponent(data.recipe)}`;
};


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

  useEffect(() => {
    navigator.serviceWorker.addEventListener('message', (event) => {
      if (event.data && event.data.type === 'SHARE_DATA') {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars 
        const { title, text, url } = event.data.payload;
        // Perform actions based on the shared data
        // Update the UI or navigate to the specified URL
        // ... do I want to have it but into an omni file format converter which costs credits each time?
        handleSharedURL(url); // Call the handleSharedURL function with the shared URL
      }
    });
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

              <div style={{ display: 'flex', alignItems: 'center' }}>
              <button onClick={handleBrowseBookmarks}>
                Browse Bookmarks 📚
               </button>
              </div>

              <RecipeList />  
              <TestComponent />


              <Container maxW="container.md" pt={14}>
                <TestThreeScene />
              </Container>

              <div>
                <a href="https://www.buymeacoffee.com/ohmygaugh">
                  <img 
                    src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=☕&slug=ohmygaugh&button_colour=f0f0f0&font_colour=000000&font_family=Poppins&outline_colour=000000&coffee_colour=FFDD00" 
                    alt="Buy me a coffee button" 
                  />
                </a>
              </div>
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