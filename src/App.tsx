import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import SearchBar from './components/SearchBar';
import ShareButton from './components/ShareButton';
import ShareTargetComponent from './components/ShareTargetComponent'; // Importing the ShareTargetComponent

function App() {

  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallButton, setShowInstallButton] = useState(false);

  useEffect(() => {
    function handleInstallPrompt(e: any) {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallButton(true); // Show the install button when the event is fired
    }

    window.addEventListener('beforeinstallprompt', handleInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleInstallPrompt);
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        setDeferredPrompt(null);
        setShowInstallButton(false); // Hide the button after the prompt is resolved
      });
    }
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <SearchBar />
          <ShareButton />
          {showInstallButton && <button onClick={handleInstallClick}>Install App</button>}
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React. love foodhobo
          </a>
        </header>

        {/* Share target route */}
        <Routes>
        <Route path="/share-target" element={<ShareTargetComponent />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;



//render={() => <ShareTargetComponent />} at the end of line 31?