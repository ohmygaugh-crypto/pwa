import React, { useEffect, useState } from 'react';

const AcceptURLsharefromBrowser: React.FC = () => {
  const [sharedUrls, setSharedUrls] = useState<string[]>([]);

  useEffect(() => {
    const handleShare = async () => {
      try {
       // Check if there's any shared data available
        if (navigator.canShare && navigator.canShare({ url: window.location.href })) {
        await navigator.share({ url: window.location.href });
        setSharedUrls(prevUrls => [...prevUrls, window.location.href]); // Add the shared URL to the list
      }
      } catch (error) {
        console.error('Error sharing:', error);
      }
    };

    if (typeof navigator.share === 'function') {
      // The share API is supported
      handleShare();
    } else {
      console.error('Web Share API not supported');
    }
  }, []);

  return (
    <div>
      <div>Share Receiver</div>
      <div>
        <h2>Shared URLs:</h2>
        <ul>
          {sharedUrls.map((url, index) => (
            <li key={index}>{url}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AcceptURLsharefromBrowser;