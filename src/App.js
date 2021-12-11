import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Homepage from './pages/Homepage/Homepage';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Movies from './pages/Movies/Movies';
import Tvshow from './pages/Tvshow/Tvshow';
import WishList from './pages/WishList/WishList';
function App() {
  return (
    <div className="app">
      <Header />
      <Switch>
        <Route exact path="/">
          <Redirect to="/home" /> : <Homepage />
        </Route>
        <Route exact path="/home">
          <Homepage />
        </Route>
        <Route exact path="/movies">
          <Movies />
        </Route>
        <Route exact path="/tvshow">
          <Tvshow />
        </Route>
        <Route exact path="/wish-list">
          <WishList />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
