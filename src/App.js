import React, { Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Page404 from './pages/404/Page404';
import Auth from './pages/Auth/Auth';
import { useAuth } from './context/authContext';
import Loader from './components/Loader/Loader';

const Homepage = React.lazy(() => import('./pages/Homepage/Homepage'));
const Movies = React.lazy(() => import('./pages/Movies/Movies'));
const TvShow = React.lazy(() => import('./pages/Tvshow/Tvshow'));
const Detail = React.lazy(() => import('./pages/Detail/Detail'));
const MoviePlay = React.lazy(() => import('./pages/MoviePlay/MoviePlay'));
const SearchPage = React.lazy(() => import('./pages/SearchPage/SearchPage'));

function App() {
  const { currentUser } = useAuth();

  return (
    <div className="app">
      {currentUser ? <Header /> : null}
      <Switch>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Route
          exact
          path="/home"
          render={() =>
            currentUser ? (
              <Suspense fallback={<Loader />}>
                <Homepage />
              </Suspense>
            ) : (
              <Redirect to="/login" />
            )
          }
        />
        <Route
          exact
          path="/movies"
          render={() =>
            currentUser ? (
              <Suspense fallback={<Loader />}>
                <Movies />
              </Suspense>
            ) : (
              <Redirect to="/login" />
            )
          }
        />
        <Route
          exact
          path="/tvshow"
          render={() =>
            currentUser ? (
              <Suspense fallback={<Loader />}>
                <TvShow />
              </Suspense>
            ) : (
              <Redirect to="/login" />
            )
          }
        />
        <Route
          exact
          path="/movie/:id"
          render={() =>
            currentUser ? (
              <Suspense fallback={<Loader />}>
                <Detail />
              </Suspense>
            ) : (
              <Redirect to="/login" />
            )
          }
        />
        <Route
          exact
          path="/tv/:id"
          render={() =>
            currentUser ? (
              <Suspense fallback={<Loader />}>
                <Detail />
              </Suspense>
            ) : (
              <Redirect to="/login" />
            )
          }
        />
        <Route
          exact
          path="/movie/:id/play"
          render={() =>
            currentUser ? (
              <Suspense fallback={<Loader />}>
                <MoviePlay />
              </Suspense>
            ) : (
              <Redirect to="/login" />
            )
          }
        />
        <Route
          exact
          path="/tv/:id/play"
          render={() =>
            currentUser ? (
              <Suspense fallback={<Loader />}>
                <MoviePlay />
              </Suspense>
            ) : (
              <Redirect to="/login" />
            )
          }
        />
        <Route
          exact
          path="/search"
          render={() =>
            currentUser ? (
              <Suspense fallback={<Loader />}>
                <SearchPage />
              </Suspense>
            ) : (
              <Redirect to="/login" />
            )
          }
        />
        <Route
          path="/404"
          render={() => (currentUser ? <Page404 /> : <Redirect to="/login" />)}
        ></Route>
        <Route
          path="/loader"
          render={() =>
            currentUser ? <Loader hi /> : <Redirect to="/login" />
          }
        ></Route>
        <Route
          exact
          path="/login"
          render={() => (currentUser ? <Redirect to="/loader" /> : <Auth />)}
        ></Route>

        <Route path="*">
          <Redirect to="/404" />
        </Route>
      </Switch>
      {currentUser ? <Footer /> : null}
    </div>
  );
}

export default App;
