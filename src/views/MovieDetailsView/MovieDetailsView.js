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

const Cast = lazy(() =>
  import('../../components/Cast/Cast.jsx' /* webpackChunkName: "cast-component"*/),
);
const Reviews = lazy(() =>
  import('../../components/Reviews/Reviews.jsx' /* webpackChunkName: "reviews-component"*/),
);

function MovieDetailsView() {
  const { url } = useRouteMatch();
  const history = useHistory();
  const location = useLocation();

  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  console.log('Root history = ', history);

  useEffect(() => {
    moviesAPI
      .getDetails(movieId)
      .then(responce => {
        setMovie(responce.data);
      })
      .catch(err => {
        alert(`Something went wronge! The Error apears: "${err.message}" `);
      });
  }, []);

  const onGoBack = () => {
    history.push(location?.state?.from ?? '/');
    console.log('onGoBack history = ', history);
  };

  console.log('url', url);

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
              />
            ) : (
              <img className={styles.poster} src={image} alt={'poster'} />
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
                  to={{ pathname: `${url}/cast`, state: { from: location?.state?.from } }}
                >
                  Cast
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={styles.navLink}
                  activeClassName={styles.activeNavLink}
                  to={{ pathname: `${url}/reviews`, state: { from: location?.state?.from } }}
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
