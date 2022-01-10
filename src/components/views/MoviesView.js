import { useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';

import Form from '../Form';
import moviesAPI from '../../services/api';

import List from '../List';
import { useEffect } from 'react/cjs/react.development';

const MoviesView = () => {
  const [movies, setMovies] = useState(null);
  const history = useHistory();
  const location = useLocation();

  const query = new URLSearchParams(location.search).get('query');

  // console.log('query=', query);

  // console.log('history');
  // console.log(history);

  // console.log('location');
  // console.log(location);

  useEffect(() => {
    if (query) {
      handleSubmit(query);
    }
  }, []);

  function handleSubmit(query) {
    moviesAPI
      .getMovieByName(query)
      .then(responce => {
        setMovies(responce.data.results);
        history.push({ ...location, search: `query=${query}` });
      })
      .catch(err => {
        alert(`Something went wronge! The Error apear: "${err.message}" `);
      });
  }

  return (
    <>
      <Form onSubmit={handleSubmit} />
      <>
        {!!movies && (
          <List
            elements={movies.map(movie => (
              <li key={movie.id}>
                <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
              </li>
            ))}
          />
        )}
      </>
    </>
  );
};

export default MoviesView;
