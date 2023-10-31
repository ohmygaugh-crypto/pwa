import React, { useEffect, useState } from 'react';

interface NewsItem {
  id: number;
  title: string;
}

const NewsTicker: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);

  // Simulate fetching news data
  useEffect(() => {
    const newsData: NewsItem[] = [
      { id: 1, title: 'Upload Recipe' },
      { id: 2, title: 'Screenshot' },
      { id: 3, title: '👇Just Below'}
      // Add more news items as needed
    ];
    setNews(newsData);
  }, []);

  return (
    <div style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}>
      {news.map((item) => (
        <div
          key={item.id}
          style={{
            display: 'inline-block',
            marginRight: '50px',
            animation: 'scroll 10s linear infinite',
          }}
        >
          {item.title}
        </div>
      ))}
    </div>
  );
};

export default NewsTicker;