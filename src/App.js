import { lazy, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Navigation from './components/Navigation';

import './App.css';

const HomeView = lazy(() =>
  import('./views/HomeView/HomeView.js' /* webpackChunkName: "home-view"*/),
);
const MoviesView = lazy(() =>
  import('./views/MoviesView/MoviesView.js' /* webpackChunkName: "movies-view"*/),
);
const NotFoundView = lazy(() =>
  import('./views/NotFoundView/NotFoundView.js' /* webpackChunkName: "not-found-view"*/),
);
const MovieDetailsView = lazy(() =>
  import(
    './views/MovieDetailsView/MovieDetailsView.js' /* webpackChunkName: "movie-details-view"*/
  ),
);

function App() {
  return (
    <div>
      <Navigation />
      <Suspense fallback={<p>...loading. Please, wait!</p>}>
        <Switch>
          <Route path="/" exact>
            <HomeView />
          </Route>
          <Route exact path="/movies">
            <MoviesView />
          </Route>
          <Route path="/movies/:movieId">
            <MovieDetailsView />
          </Route>
          <Route>
            {/* <NotFoundView /> */}
            <Redirect to="/" />
          </Route>
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
