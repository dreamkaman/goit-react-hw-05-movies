import { useState, useEffect } from 'react';
import List from '../List';
import getPopular from '../../services/api';

const HomeView = () => {
  const [trend, setTrend] = useState(null);
  // useEffect();
  // getTrend.then(responce => console.log(responce));
  getPopular().then(responce => console.log(responce));
  return (
    <>
      <h2>Trending today</h2>
      <List />
    </>
  );
};

export default HomeView;
