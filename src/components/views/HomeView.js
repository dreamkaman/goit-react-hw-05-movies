import { useState, useEffect } from 'react';
import List from '../List';
import getTrend from '../../services/api';

const HomeView = () => {
  const [trend, setTrend] = useState(null);
  // useEffect();
  console.log(getTrend);

  return (
    <>
      <h2>Trending today</h2>
      <List />
    </>
  );
};

export default HomeView;
