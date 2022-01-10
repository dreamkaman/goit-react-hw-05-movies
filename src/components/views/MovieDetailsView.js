import { useParams, useRouteMatch, NavLink, Route, useHistory } from 'react-router-dom';
import { useState, useEffect, lazy, Suspense } from 'react';
import moviesAPI from '../../services/api';
// import Cast from '../Cast';
// import Reviews from '../Reviews';
import image from '../../images/no-image-new.png';

const Cast = lazy(() => import('../Cast/Cast.jsx' /* webpackChunkName: "cast-component"*/));
const Reviews = lazy(() =>
  import('../Reviews/Reviews.jsx' /* webpackChunkName: "reviews-component"*/),
);

function MovieDetailsView() {
  const { url } = useRouteMatch();
  const history = useHistory();

  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  // console.log(movieId);

  useEffect(() => {
    moviesAPI
      .getDetails(movieId)
      .then(responce => {
        // console.log(responce.data);
        setMovie(responce.data);
      })
      .catch(err => {
        alert(`Something went wronge! The Error apear: "${err.message}" `);
      });
  }, [movieId]);

  return (
    <>
      <button type="button" onClick={() => history.goBack()}>
        Go back
      </button>

      {movie && (
        <div>
          <div>
            {movie.poster_path ? (
              <img
                src={`https://www.themoviedb.org/t/p/original${movie.poster_path}`}
                alt={'poster'}
                width={'300px'}
              />
            ) : (
              <img src={image} alt={'poster'} width={'300px'} />
            )}
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
      <Suspense fallback={<p>...loading. Please, wait!</p>}>
        <Route path={`${url}/cast`}>
          <Cast movieId={movie?.id} />
        </Route>
        <Route path={`${url}/reviews`}>
          <Reviews movieId={movie?.id} />
        </Route>
      </Suspense>
    </>
  );
}

export default MovieDetailsView;
