import React from 'react';
import Home from './components/home';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Detail from './components/detail';

function App() {

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/launch/:id">
          <Detail />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
