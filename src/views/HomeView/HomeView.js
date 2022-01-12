import { useState, useEffect } from 'react';
import List from '../../components/List';
import moviesAPI from '../../services/api';

const HomeView = () => {
  const [trend, setTrend] = useState(null);

  useEffect(() => {
    moviesAPI
      .getPopular()
      .then(responce => {
        setTrend(responce.data.results);
      })
      .catch(err => {
        alert(`Something went wronge! The Error apears: "${err.message}"`);
      });
  }, []);

  return (
    <div>
      <h2>Trending today</h2>
      {trend && <List arr={trend} />}
    </div>
  );
};

export default HomeView;
