import {
  useParams,
  useRouteMatch,
  NavLink,
  Route,
  useHistory,
  useLocation,
} from 'react-router-dom';
import { useState, useEffect, lazy, Suspense } from 'react';
import moviesAPI from '../../services/api';

import image from '../../images/no-image-new.png';
import styles from './MovieDetailsView.module.css';

const Cast = lazy(() => import('../Cast/Cast.jsx' /* webpackChunkName: "cast-component"*/));
const Reviews = lazy(() =>
  import('../Reviews/Reviews.jsx' /* webpackChunkName: "reviews-component"*/),
);

function MovieDetailsView() {
  const { url } = useRouteMatch();
  const history = useHistory();
  const location = useLocation();

  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    moviesAPI
      .getDetails(movieId)
      .then(responce => {
        setMovie(responce.data);
      })
      .catch(err => {
        alert(`Something went wronge! The Error apears: "${err.message}" `);
      });
  }, [movieId]);

  const onGoBack = () => {
    history.push(location?.state?.from ?? '/');
  };

  return (
    <>
      <button className={styles.btnGoBack} type="button" onClick={onGoBack}>
        Go back
      </button>

      {movie && (
        <div className={styles.movieCard}>
          <div className={styles.movieInfoWrapper}>
            {movie.poster_path ? (
              <img
                className={styles.poster}
                src={`https://www.themoviedb.org/t/p/original${movie.poster_path}`}
                alt={'poster'}
                width={'300px'}
              />
            ) : (
              <img className={styles.poster} src={image} alt={'poster'} width={'300px'} />
            )}
            <div className={styles.movieTextInfo}>
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
                <NavLink
                  className={styles.navLink}
                  activeClassName={styles.activeNavLink}
                  to={`${url}/cast`}
                >
                  Cast
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={styles.navLink}
                  activeClassName={styles.activeNavLink}
                  to={`${url}/reviews`}
                >
                  Reviews
                </NavLink>
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
