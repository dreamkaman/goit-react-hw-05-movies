import { useState } from 'react';
import { Link } from 'react-router-dom';
import moviesAPI from '../../services/api';

import List from '../List';
const MoviesView = () => {
  const [state, setState] = useState({ query: '', movies: null });
  const { query, movies } = state;
  // useEffect(() => {
  //   // if (query) { setQuery() }
  // }, [query]);

  const handleOnChange = e => {
    setState(prevstate => ({ ...prevstate, query: e.target.value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    // console.log('Submit button pushed!');
    moviesAPI.getMovieByName(query).then(responce => {
      console.log(responce.data.results);
      setState(prevstate => ({ ...prevstate, movies: responce.data.results }));
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input value={query} onChange={handleOnChange} />
        <button type="Submit">Search</button>
      </form>
      <>
        {!!movies && (
          <List
            elements={movies.map(movie => (
              <li key={movie.id}>
                <Link to={`/?query=${movie.title}`}>{movie.title}</Link>
              </li>
            ))}
          />
        )}
      </>
    </>
  );
};

export default MoviesView;
