import { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import moviesAPI from '../../services/api';
import Form from '../../components/Form';
import List from '../../components/List';

const MoviesView = () => {
  const [movies, setMovies] = useState(null);
  const history = useHistory();
  const location = useLocation();

  const query = new URLSearchParams(location.search).get('query');

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
        alert(`Something went wronge! The Error apears: "${err.message}" `);
      });
  }

  return (
    <>
      <Form onSubmit={handleSubmit} />
      <>{!!movies && <List arr={movies} />}</>
    </>
  );
};

export default MoviesView;
