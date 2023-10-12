import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import SearchBar from './components/SearchBar';
import ShareButton from './components/ShareButton';
import ShareTargetComponent from './components/ShareTargetComponent';

function App() {

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
      <div className="App">
        <header className="App-header">
          <SearchBar />
          <ShareButton />
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