import React from 'react';
import { getAllNews } from '../../features/api/getAllNews';

const NewsFeed = () => {
  const [isLoading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(true);
  const [news, setNews] = React.useState(true);

  const loadNews = async () => {
    try {
      const fetchedNews = await getAllNews();
      setNews(fetchedNews);
      console.log(news, isLoading, error);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    loadNews();
  }, []);
  return (
    <>
      <h1>Работает</h1>
    </>
  );
};

export default NewsFeed;
