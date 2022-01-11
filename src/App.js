import { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';

import Navigation from './components/Navigation';

import './App.css';

const HomeView = lazy(() =>
  import('./components/views/HomeView.js' /* webpackChunkName: "home-view"*/),
);
const MoviesView = lazy(() =>
  import('./components/views/MoviesView.js' /* webpackChunkName: "movies-view"*/),
);
const NotFoundView = lazy(() =>
  import('./components/views/NotFoundView.js' /* webpackChunkName: "not-found-view"*/),
);
const MovieDetailsView = lazy(() =>
  import('./components/views/MovieDetailsView.js' /* webpackChunkName: "movie-details-view"*/),
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
            <NotFoundView />
          </Route>
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
