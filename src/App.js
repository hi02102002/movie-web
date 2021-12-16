import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Homepage from './pages/Homepage/Homepage';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Movies from './pages/Movies/Movies';
import Tvshow from './pages/Tvshow/Tvshow';
import WishList from './pages/WishList/WishList';
import Detail from './pages/Detail/Detail';
import MoviePlay from './pages/MoviePlay/MoviePlay';
import SearchPage from './pages/SearchPage/SearchPage';
import Page404 from './pages/404/Page404';

const routesArr = [
  {
    path: '/home',
    component: <Homepage />,
    exact: true,
  },
  {
    path: '/movies',
    component: <Movies />,
    exact: true,
  },
  {
    path: '/tvshow',
    component: <Tvshow />,
    exact: true,
  },
  {
    path: '/wish-list',
    component: <WishList />,
    exact: true,
  },
  {
    path: '/movie/:id',
    component: <Detail />,
    exact: true,
  },
  {
    path: '/tv/:id',
    component: <Detail />,
    exact: true,
  },
  {
    path: '/tv/:id/play',
    component: <MoviePlay />,
    exact: true,
  },
  {
    path: '/movie/:id/play',
    component: <MoviePlay />,
    exact: true,
  },
  {
    path: '/search',
    component: <SearchPage />,
    exact: true,
  },
  {
    path: '*',
    component: <Page404 />,
    exact: false,
  },
];

function App() {
  return (
    <div className="app">
      <Header />
      <Switch>
        {routesArr.map(item => {
          return (
            <Route
              key={item.path}
              exact={item.exact ? item.exact : false}
              path={item.path}
            >
              {item.component}
            </Route>
          );
        })}
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
