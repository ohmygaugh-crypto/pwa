import { useLocation } from 'react-router-dom';

export const extractSharedData = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  return {
    title: queryParams.get('title'),
    text: queryParams.get('text'),
    url: queryParams.get('url')
  };
};
