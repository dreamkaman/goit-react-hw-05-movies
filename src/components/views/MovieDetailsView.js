import { useParams, useRouteMatch, NavLink, Link, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import moviesAPI from '../../services/api';

function MovieDetailsView() {
  const { url } = useRouteMatch();
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  console.log(movieId);

  useEffect(() => {
    moviesAPI.getDetails(movieId).then(responce => {
      console.log(responce.data);
      setMovie(responce.data);
    });
  }, [movieId]);

  return (
    <>
      <Link to="/">Go Back</Link>

      {movie && (
        <div>
          <div>
            <img
              src={`https://www.themoviedb.org/t/p/original${movie.poster_path}`}
              alt={'poster'}
              width={'300px'}
            />
            <div>
              <h1>{movie.title}</h1>
              <p>{`User Score: ${movie.vote_average}`}</p>
              <h2>Overview</h2>
              <p>{movie.overview}</p>
              <h3>Genres</h3>
              <p>{movie.genres.map(genre => genre.name).join(', ')}</p>
            </div>
          </div>
          <div>
            <p>Additional information</p>
            <ul>
              <li>
                <NavLink to={`${url}/cast`}>Cast</NavLink>
              </li>
              <li>
                <NavLink to={`${url}/reviews`}>Reviews</NavLink>
              </li>
            </ul>
          </div>
        </div>
      )}
      <Route path={`${url}/cast`}>
        <Cast />
      </Route>
    </>
  );
}

export default MovieDetailsView;
