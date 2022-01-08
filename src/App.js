import { Switch, Route } from 'react-router-dom';

import Navigation from './components/Navigation';
import HomeView from './components/views/HomeView';
import MoviesView from './components/views/MoviesView';
import NotFoundView from './components/views/NotFoundView';
import MovieDetailsView from './components/views/MovieDetailsView';

import './App.css';

function App() {
  return (
    <div>
      <Navigation />
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
    </div>
  );
}

export default App;
