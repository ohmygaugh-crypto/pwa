import React from 'react';

const ShareButton: React.FC = () => {
  
  const handleShare = async () => {
    const shareData = {
      title: 'My PWA',
      text: 'Check out my PWA!',
      url: window.location.href,
    };

    if (navigator.share && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
        console.log('Content shared successfully');
      } catch (error) {
        console.error('There was an error sharing:', error);
      }
    } else {
      console.error('Data cannot be shared or Web Share API not supported');
    }
  };

  return (
    <button onClick={handleShare}>Share/Airdrop</button>
  );
};

export default ShareButton;
