import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import List from '../List';
// import getPopular from '../../services/api';
import moviesAPI from '../../services/api';

// const elements = null;

const HomeView = () => {
  const [trend, setTrend] = useState(null);

  // console.dir(Link);

  useEffect(() => {
    moviesAPI
      .getPopular()
      .then(responce => {
        setTrend(responce.data.results);
      })
      .catch(err => {
        alert(`Something went wronge! The Error apear: "${err.message}" `);
      });
  }, []);

  useEffect(() => {
    if (trend) {
      console.log(trend);
    }
  }, [trend]);

  return (
    <div>
      <h2>Trending today</h2>
      {trend && (
        <List
          elements={trend.map(item => (
            <li key={item.id}>
              <Link to={`/movies/${item.id}`}>{item.title}</Link>
            </li>
          ))}
        />
      )}
    </div>
  );
};

export default HomeView;
