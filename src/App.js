import { Switch, Route } from 'react-router-dom';

import Navigation from './components/Navigation';
import HomeView from './components/views/HomeView';
import MoviesView from './components/views/MoviesView';
import NotFoundView from './components/views/NotFoundPage';

import './App.css';

function App() {
  return (
    <div>
      <Navigation />
      <Switch>
        <Route path="/" exact>
          <HomeView />
        </Route>
        <Route path="/movies">
          <MoviesView />
        </Route>
        <Route>
          <NotFoundView />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
