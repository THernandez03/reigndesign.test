import { useState, useEffect } from 'react';

export const useFetch = url => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(
    async () => {
      try {
        setLoading(true);

        const request = await fetch(url);
        const data = await request.json();

        setData(data);
        setLoading(false);
      } catch (err) {
        setError({ error: err.message });
      }
    },
    [url],
  );

  return { data, loading, error };
};

export const useNews = () => {
  const [news, setNews] = useState([]);
  const { data, loading, error } = useFetch(
    'https://hn.algolia.com/api/v1/search_by_date?query=nodejs',
  );

  if (data?.hits?.length) {
    setNews(data.hits);
  }

  return { news, loading, error };
};
